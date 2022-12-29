import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository, UpdateResult } from 'typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { FieldCountWrapper } from './dto/vaccine-stage-count.dto';

import { CloudinaryService } from './../cloudinary/cloudinary.service';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Creates a new vaccine.
   *
   * @param createVaccineDto - The data for creating the vaccine.
   * @param file - The uploaded image file
   * @returns The created vaccine.
   */
  async create(
    createVaccineDto: CreateVaccineDto,
    file: Express.Multer.File,
  ): Promise<Vaccine> {
    let imageUrl = '';

    if (file) {
      const res = await this.cloudinaryService.uploadImage(file);
      imageUrl = res.url;
    }

    return this.vaccineRepository.save({
      ...createVaccineDto,
      imageUrl,
    });
  }

  /**
   * Gets a list of all vaccines.
   *
   * @returns A list of vaccines.
   */
  findAll(): Promise<Vaccine[]> {
    // The order of keys is important here.
    return this.vaccineRepository.find({
      order: {
        isMandatory: 'DESC',
        name: 'ASC',
      },
    });
  }

  /**
   * Gets a vaccine by its ID.
   *
   * @param id - The ID of the vaccine.
   * @returns The vaccine with the given ID, or `undefined` if no such vaccine exists.
   */
  async findById(id: number): Promise<Vaccine | undefined> {
    const vaccine = await this.vaccineRepository.findOneBy({
      id,
      deletedAt: undefined,
    });

    if (vaccine) {
      return vaccine;
    }

    throw new NotFoundException("The vaccine doesn't exist");
  }

  /**
   * Updates a vaccine.
   *
   * @param id - The ID of the vaccine to update.
   * @param updateVaccineDto - The data for updating the vaccine.
   * @returns The updated vaccine.
   */
  async update(id: number, updateVaccineDto: UpdateVaccineDto) {
    // TODO: Add feature to update new image. But How can we ensure that image hasn't already been uploaded.
    await this.findById(id);

    return this.vaccineRepository.save({
      id,
      ...updateVaccineDto,
    });
  }

  /**
   * Deletes a vaccine.
   *
   * @param id - The ID of the vaccine to delete.
   */
  remove(id: number): Promise<UpdateResult> {
    return this.vaccineRepository.softDelete(id);
  }

  /**
   *Service to get vaccine stages count.
   */
  async getVaccineStagesCount(): Promise<FieldCountWrapper[]> {
    const query = this.vaccineRepository
      .createQueryBuilder('vaccines')
      .select(`"stage"`, 'name')
      .addSelect(`COUNT("stage")::integer`, 'count')
      .groupBy('stage');
    const stagesCount = await query.getRawMany();

    return stagesCount;
  }

  /**
   * We're selecting the allergies from the vaccine table, unnesting them, and then counting the number
   * of times each allergy appears
   *
   * @returns An array of objects with the allergy and the count of that allergy.
   */
  async getAllergiesCount() {
    const response = await this.vaccineRepository
      .query(`SELECT UPPER(allergy) as name, COUNT(*)::integer
              FROM (
                 SELECT unnest(allergies) as allergy
                  FROM core.vaccines
               ) t
            GROUP BY UPPER(allergy)`);

    return response;
  }
}

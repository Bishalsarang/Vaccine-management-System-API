import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository, UpdateResult } from 'typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { VaccineStageCount } from './dto/vaccine-stage-count.dto';

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
    file: any,
  ): Promise<Vaccine> {
    const res = await this.cloudinaryService.uploadImage(file);

    return this.vaccineRepository.save({
      ...createVaccineDto,
      imageUrl: res.url,
    });
  }

  /**
   * Gets a list of all vaccines.
   *
   * @returns A list of vaccines.
   */
  findAll(): Promise<Vaccine[]> {
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

    return this.vaccineRepository.save({ id, ...updateVaccineDto });
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
  async getVaccineStagesCount(): Promise<VaccineStageCount[]> {
    const query = this.vaccineRepository
      .createQueryBuilder('vaccines')
      .select(`"stage"`, 'name')
      .addSelect(`COUNT("stage")::integer`, 'count')
      .groupBy('stage');
    const res = await query.getRawMany();

    return res;
  }
}

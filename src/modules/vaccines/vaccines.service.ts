import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository, UpdateResult } from 'typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { FieldCountWrapper } from './dto/vaccine-stage-count.dto';

import { CloudinaryService } from './../cloudinary/cloudinary.service';

import { calculateHash } from '../../utils/file';

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
    const imageUrlAndHash = await this.uploadFileAndGetImageUrl(file);

    return this.vaccineRepository.save({
      ...createVaccineDto,
      ...imageUrlAndHash,
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
  async update(
    id: number,
    updateVaccineDto: UpdateVaccineDto,
    file: Express.Multer.File,
  ) {
    await this.findById(id);

    let imageUrlAndHash = {};
    if (file) {
      imageUrlAndHash = await this.uploadFileAndGetImageUrl(file);
    }

    return this.vaccineRepository.save({
      id,
      ...updateVaccineDto,
      ...imageUrlAndHash,
    });
  }

  /**
   * Uploads a file to a cloud service and returns the URL of the uploaded file.
   *
   * @param {Express.Multer.File} file - The file to upload.
   * @return {Promise<string>} A promise that resolves to the URL of the uploaded file.
   */
  private async uploadFileAndGetImageUrl(file: Express.Multer.File): Promise<{
    imageUrl: Vaccine['imageUrl'];
    imageHash: Vaccine['imageHash'];
  }> {
    let imageUrl;
    let imageHash;

    if (!file) {
      return {
        imageUrl,
        imageHash,
      };
    }

    // Get hash of the current file.
    const fileHash = calculateHash(file);

    // Check if this hash already exist in the table.
    const vaccine = await this.vaccineRepository.findOneBy({
      imageHash: fileHash,
    });

    if (vaccine) {
      return {
        imageUrl: vaccine.imageUrl,
        imageHash: vaccine.imageHash,
      };
    }

    // Otherwise upload to cloudinary
    const res = await this.cloudinaryService.uploadImage(file);

    return { imageUrl: res.url, imageHash: fileHash };
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
      .query(`SELECT LOWER(allergy) as name, COUNT(*)::integer
              FROM (
                 SELECT unnest(allergies) as allergy
                  FROM core.vaccines
               ) t
            GROUP BY LOWER(allergy)`);

    return response;
  }
}

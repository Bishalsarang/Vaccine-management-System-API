import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private readonly vaccineRepository: Repository<Vaccine>,
  ) {}

  /**
   * Creates a new vaccine.
   *
   * @param createVaccineDto - The data for creating the vaccine.
   * @returns The created vaccine.
   */
  async create(createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    return this.vaccineRepository.save(createVaccineDto);
  }

  /**
   * Gets a list of all vaccines.
   *
   * @returns A list of vaccines.
   */
  async findAll(): Promise<Vaccine[]> {
    return this.vaccineRepository.find();
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
      deletedAt: null,
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
    await this.findById(id);

    return this.vaccineRepository.save({ id, ...updateVaccineDto });
  }

  /**
   * Deletes a vaccine.
   *
   * @param id - The ID of the vaccine to delete.
   */
  async remove(id: number): Promise<void> {
    await this.vaccineRepository.softDelete(id);
  }
}

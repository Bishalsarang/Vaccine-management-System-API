import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { Logger } from 'nestjs-pino';

import { VaccineService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

/**
 * Controller for managing vaccines.
 */
@Controller('vaccines')
export class VaccineController {
  constructor(
    private readonly vaccineService: VaccineService,
    private readonly logger: Logger,
  ) {}

  /**
   * Creates a new vaccine.
   *
   * @param createVaccineDto - The data for creating the vaccine.
   * @returns The created vaccine.
   */
  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  /**
   * Gets a list of all vaccines.
   *
   * @returns A list of vaccines.
   */
  @Get()
  findAll() {
    return this.vaccineService.findAll();
  }

  /**
   * Gets a vaccine by its ID.
   *
   * @param id - The ID of the vaccine.
   * @returns The vaccine with the given ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineService.findById(+id);
  }

  /**
   * Updates a vaccine.
   *
   * @param id - The ID of the vaccine to update.
   * @param updateVaccineDto - The data for updating the vaccine.
   * @returns The updated vaccine.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaccineDto: UpdateVaccineDto) {
    return this.vaccineService.update(+id, updateVaccineDto);
  }

  /**
   * Deletes a vaccine.
   *
   * @param id - The ID of the vaccine to delete.
   * @returns The deleted vaccine.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(+id);
  }
}

import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Logger } from 'nestjs-pino';

import { VaccineService } from './vaccine.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

import { Vaccine } from './entities/vaccine.entity';

/**
 * Controller for managing vaccines.
 */
@ApiTags('Vaccines')
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
  @ApiBody({ type: CreateVaccineDto })
  @ApiCreatedResponse({ type: Vaccine })
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  /**
   * Gets a list of all vaccines.
   *
   * @returns A list of vaccines.
   */
  @Get()
  @ApiResponse({ status: 200, type: [Vaccine] })
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
  @ApiParam({ name: 'id', type: Number })
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
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateVaccineDto })
  @ApiResponse({ status: 200, type: Vaccine })
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
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Vaccine })
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(+id);
  }
}

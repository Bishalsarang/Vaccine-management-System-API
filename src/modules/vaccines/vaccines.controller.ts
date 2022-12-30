import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { VaccineService } from './vaccines.service';
import { Vaccine } from './entities/vaccine.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

import { AuthGuard } from '../..//guard/auth/auth.guard';
import { FieldCountWrapper } from './dto/vaccine-stage-count.dto';

/**
 * Controller for managing vaccines.
 */
@ApiTags('Vaccines')
@Controller('vaccines')
@UseGuards(AuthGuard)
@ApiBearerAuth('Bearer')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  /**
   * Creates a new vaccine.
   *
   * @param createVaccineDto - The data for creating the vaccine.
   * @returns The created vaccine.
   */
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateVaccineDto })
  @ApiCreatedResponse({ type: Vaccine })
  create(
    @Body() createVaccineDto: CreateVaccineDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.vaccineService.create(createVaccineDto, image);
  }

  /**
   * Updates a vaccine.
   *
   * @param id - The ID of the vaccine to update.
   * @param updateVaccineDto - The data for updating the vaccine.
   * @returns The updated vaccine.
   */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateVaccineDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: Vaccine })
  update(
    @Param('id') id: string,
    @Body() updateVaccineDto: UpdateVaccineDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.vaccineService.update(+id, updateVaccineDto, image);
  }

  /**
   * Gets a list of all vaccines.
   *
   * @returns A list of vaccines.
   */

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Vaccine] })
  findAll() {
    return this.vaccineService.findAll();
  }

  /**
   * Controller method that fetches the all the distinct vacine stages and their count.
   */
  @Get('stages')
  @ApiResponse({ status: HttpStatus.OK, type: [FieldCountWrapper] })
  getStagesCount(): Promise<FieldCountWrapper[]> {
    return this.vaccineService.getVaccineStagesCount();
  }

  /**
   * Controller method that fetches the all the distinct allergies and their count.
   */
  @Get('allergies')
  @ApiResponse({ status: HttpStatus.OK, type: [FieldCountWrapper] })
  getAllergiesCount(): Promise<FieldCountWrapper[]> {
    return this.vaccineService.getAllergiesCount();
  }

  /**
   * Gets a vaccine by its ID.
   *
   * @param id - The ID of the vaccine.
   * @returns The vaccine with the given ID.
   */
  @Get(':id')
  @ApiNotFoundResponse({
    description: "The vaccine doesn't exist",
  })
  @ApiResponse({ status: HttpStatus.OK, type: [Vaccine] })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.vaccineService.findById(+id);
  }

  /**
   * Deletes a vaccine.
   *
   * @param id - The ID of the vaccine to delete.
   * @returns The deleted vaccine.
   */
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: HttpStatus.OK, type: Vaccine })
  remove(@Param('id') id: string) {
    return this.vaccineService.remove(+id);
  }
}

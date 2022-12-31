import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  Min,
  IsIn,
  IsString,
  IsNumber,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

import { VACCINE_STAGES } from '../../../constant/base.constant';

export class CreateVaccineDto {
  @ApiProperty({
    example: 'Flu Vaccine',
    type: 'string',
    maxLength: 255,
    description: 'The name of the vaccine.',
  })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Chaudhary Pharmetic',
    type: 'string',
    description: 'The name of the company. For example, Chaudhary Pharmetics',
  })
  @IsOptional()
  @IsString()
  companyName: string;

  @ApiPropertyOptional({
    example: 'A vaccine to protect against the flu',
    type: 'string',
    description: 'Description about the vaccine.',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 1,
    type: 'number',
    description: 'The number of doses for the vaccine.',
  })
  @IsNumber()
  @Min(1)
  // If we use multiform data with interceptor @UseInterceptors(FileInterceptor())
  // values are converted to string. So we use Type form class-validator
  @Type(() => Number)
  numberOfDoses: number;

  @ApiPropertyOptional({
    default: false,
    type: 'boolean',
    description: 'The property whether the field is mandatory.',
  })
  @Type(() => Boolean)
  @IsBoolean()
  isMandatory?: boolean;

  @ApiProperty({
    default: VACCINE_STAGES.research,
    type: 'string',
    enum: Object.values(VACCINE_STAGES),
    description: 'The property for the clinical stage.',
  })
  @IsString()
  @IsIn(Object.values(VACCINE_STAGES))
  stage: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The image file for the vaccine.',
  })
  image: string;

  @ApiProperty({
    example: ['Nausea', 'Fever', 'Rashes'],
    type: 'array',
    description:
      'The allergies or sideffects that can be seen with the vaccine.',
  })
  allergies: string[];
}

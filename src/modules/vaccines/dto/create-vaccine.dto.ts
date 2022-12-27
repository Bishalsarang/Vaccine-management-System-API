import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsString,
  IsNumber,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
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
  numberOfDoses: number;

  @ApiPropertyOptional({
    default: false,
    type: 'boolean',
    description: 'The property whether the field is mandatory.',
  })
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
}

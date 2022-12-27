import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

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
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNumber,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
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
    example: 'contact@fluvaccinecompany.com',
    type: 'string',
    format: 'email',
    description: 'The email of the company that produces the vaccine.',
  })
  @IsEmail()
  companyEmail: string;

  @ApiProperty({
    example: '123-456-7890',
    type: 'string',
    description:
      'The contact information of the company that produces the vaccine.',
  })
  @IsString()
  companyContact: string;

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
  numberOfDoses?: number;

  @ApiPropertyOptional({
    default: false,
    type: 'boolean',
    description: 'The property whether the field is mandatory.',
  })
  @IsBoolean()
  isMandatory?: boolean;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateVaccineDto {
  @ApiProperty({
    type: 'string',
    maxLength: 255,
    description: 'The name of the vaccine.',
  })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
    description: 'The email of the company that produces the vaccine.',
  })
  @IsEmail()
  companyEmail: string;

  @ApiProperty({
    type: 'string',
    description:
      'The contact information of the company that produces the vaccine.',
  })
  @IsString()
  companyContact: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Description about the vaccine.',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: 'number',
    description: 'The number of doses for the vaccine.',
  })
  @IsString()
  numberOfDoses?: number;

  @ApiPropertyOptional({
    default: false,
    type: 'boolean',
    description: 'The property whether the field is mandatory.',
  })
  @IsString()
  isMandatory?: boolean;
}

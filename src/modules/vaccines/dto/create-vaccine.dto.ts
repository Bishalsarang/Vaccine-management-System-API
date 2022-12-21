import {
  IsEmail,
  IsString,
  IsNumber,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateVaccineDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEmail()
  companyEmail: string;

  @IsString()
  companyContact: string;

  @IsString()
  description?: string;

  @IsNumber()
  numberOfDoses?: number;

  @IsBoolean()
  isMandatory?: boolean;
}

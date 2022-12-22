import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'johnny',
    type: 'string',
    maxLength: 255,
    description: 'The name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  userName: string;

  @ApiProperty({
    example: 'John',
    type: 'string',
    maxLength: 255,
    description: 'The first name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    type: 'string',
    maxLength: 255,
    description: 'The last name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    type: 'string',
    format: 'email',
    description: 'The email of the user.',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password123',
    type: 'string',
    description: 'The password of the user.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

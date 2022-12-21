import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'johnny',
    type: 'string',
    maxLength: 255,
    description: 'The name of the user.',
  })
  @IsNotEmpty()
  @MaxLength(255)
  userName: string;

  @ApiProperty({
    example: 'password123',
    type: 'string',
    description: 'The password of the user.',
  })
  @IsNotEmpty()
  password: string;
}

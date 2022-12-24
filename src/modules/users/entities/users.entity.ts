import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

import { AuditEntity } from '../../../common/entities/audit.entity';

import { generatePasswordHash } from '../../../utils/auth.utils';

@Entity({ name: 'users' })
export class User extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'johnny',
    type: 'string',
    maxLength: 255,
    description: 'The name of the user.',
  })
  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @ApiProperty({
    example: 'John',
    type: 'string',
    maxLength: 255,
    description: 'The first name of the user.',
  })
  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    type: 'string',
    maxLength: 255,
    description: 'The last name of the user.',
  })
  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  lastname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    type: 'string',
    format: 'email',
    description: 'The email of the user.',
  })
  @Column()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    type: 'string',
    description: 'The password of the user.',
  })
  @Column()
  @IsNotEmpty()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await generatePasswordHash(this.password);
  }
}

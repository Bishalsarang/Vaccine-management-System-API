import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {
  IsEmail,
  IsNumber,
  IsBoolean,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { AuditEntity } from '../../../common/entities/audit.entity';

@Entity({ name: 'vaccines' })
export class Vaccine extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Column()
  description: string;

  @Column()
  numberOfDoses: number;

  @Column({ default: false })
  @IsBoolean()
  isMandatory: boolean;

  @Column()
  @IsEmail()
  companyEmail: string;

  @Column()
  @IsNumber()
  companyContact: string;
}

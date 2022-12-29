import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {
  Min,
  IsIn,
  IsUrl,
  IsBoolean,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { AuditEntity } from '../../../common/entities/audit.entity';

import { VACCINE_STAGES } from '../../../constant/base.constant';

@Entity({ name: 'vaccines' })
export class Vaccine extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Column()
  description?: string;

  @Column()
  @Min(1)
  numberOfDoses: number;

  @Column()
  @IsNotEmpty()
  @IsIn(Object.values(VACCINE_STAGES))
  stage: string;

  @Column({ default: false })
  @IsBoolean()
  isMandatory?: boolean;

  @Column({ nullable: true })
  @MaxLength(30)
  companyName: string;

  @Column({ nullable: true })
  @IsUrl()
  imageUrl?: string;

  @Column('text', { array: true, default: [] })
  allergies: string[];
}

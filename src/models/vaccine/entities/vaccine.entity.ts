import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { AuditEntity } from '../../../common/entity/audit.entity';

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
  isMandatory: boolean;

  @Column()
  @IsEmail()
  companyEmail: string;

  @Column()
  companyContact: string;
}

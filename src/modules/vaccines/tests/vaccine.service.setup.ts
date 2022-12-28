import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CloudinaryService } from '../../../modules/cloudinary/cloudinary.service';

import { Repository } from 'typeorm';

import { Vaccine } from '../entities/vaccine.entity';
import { VaccineService } from '../vaccines.service';
import { ConfigService } from '@nestjs/config';

export async function setup() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ConfigService,
      VaccineService,
      CloudinaryService,
      {
        provide: getRepositoryToken(Vaccine),
        useClass: Repository,
      },
    ],
  }).compile();

  return {
    vaccineService: module.get<VaccineService>(VaccineService),
    vaccineRepository: module.get<Repository<Vaccine>>(
      getRepositoryToken(Vaccine),
    ),
  };
}

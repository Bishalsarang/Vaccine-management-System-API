import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Vaccine } from '../entities/vaccine.entity';
import { VaccineService } from '../vaccines.service';

export async function setup() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      VaccineService,
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

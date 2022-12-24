import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { VaccineService } from './vaccines.service';
import { VaccineController } from './vaccines.controller';
import { Vaccine } from './entities/vaccine.entity';

describe('VaccinesController', () => {
  let vaccineController: VaccineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccineController],
      providers: [
        VaccineService,
        JwtService,
        {
          provide: getRepositoryToken(Vaccine),
          useClass: Repository,
        },
      ],
    }).compile();

    vaccineController = module.get<VaccineController>(VaccineController);
  });

  it('should be defined', () => {
    expect(vaccineController).toBeDefined();
  });
});

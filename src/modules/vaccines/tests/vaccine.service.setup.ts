import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CloudinaryService } from '../../../modules/cloudinary/cloudinary.service';

import { Vaccine } from '../entities/vaccine.entity';
import { VaccineService } from '../vaccines.service';

export async function setup() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      {
        provide: getRepositoryToken(Vaccine),
        useClass: Repository,
      },

      {
        provide: CloudinaryService,
        useValue: {
          configService: jest.fn(),
          uploadImage: jest.fn(),
        },
      },
      VaccineService,
    ],
  }).compile();

  return {
    cloudinaryService: module.get<CloudinaryService>(CloudinaryService),
    vaccineService: module.get<VaccineService>(VaccineService),
    vaccineRepository: module.get<Repository<Vaccine>>(
      getRepositoryToken(Vaccine),
    ),
  };
}

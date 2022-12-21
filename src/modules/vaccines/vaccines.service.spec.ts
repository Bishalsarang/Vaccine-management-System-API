import { Test, TestingModule } from '@nestjs/testing';
import { VaccineService } from './vaccines.service';

describe('VaccinesService', () => {
  let service: VaccineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccineService],
    }).compile();

    service = module.get<VaccineService>(VaccineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

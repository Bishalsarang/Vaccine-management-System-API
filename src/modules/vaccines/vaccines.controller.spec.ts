import { Test, TestingModule } from '@nestjs/testing';

import { VaccineService } from './vaccines.service';
import { VaccineController } from './vaccines.controller';

describe('VaccinesController', () => {
  let controller: VaccineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccineController],
      providers: [VaccineService],
    }).compile();

    controller = module.get<VaccineController>(VaccineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

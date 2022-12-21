import { NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Vaccine } from '.././entities/vaccine.entity';

import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';

describe('VaccineService (findById)', () => {
  let vaccineService: VaccineService;
  let vaccineRepository: Repository<Vaccine>;

  beforeEach(async () => {
    const setupValues = await setup();
    vaccineService = setupValues.vaccineService;
    vaccineRepository = setupValues.vaccineRepository;
  });

  describe('findById', () => {
    it('should return a vaccine if it exists', async () => {
      const vaccine: Vaccine = {
        id: 1,
        numberOfDoses: 1,
        isMandatory: false,
        name: 'Flu Vaccine',
        companyContact: '123-456-7890',
        companyEmail: 'contact@fluvaccinecompany.com',
        description: 'A vaccine to protect against the flu',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const getSpy = jest
        .spyOn(vaccineRepository, 'findOneBy')
        .mockResolvedValue(vaccine);
      const result = await vaccineService.findById(1);
      expect(result).toEqual(vaccine);
      expect(getSpy).toHaveBeenCalledWith({
        id: 1,
        deletedAt: null,
      });
    });

    it('should throw a NotFoundException if the vaccine does not exist', async () => {
      const getSpy = jest
        .spyOn(vaccineRepository, 'findOneBy')
        .mockResolvedValue(undefined);
      try {
        await vaccineService.findById(1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("The vaccine doesn't exist");
      }

      expect(getSpy).toHaveBeenCalledWith({
        id: 1,
        deletedAt: null,
      });
    });
  });
});

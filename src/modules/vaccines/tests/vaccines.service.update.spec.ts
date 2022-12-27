import { NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Vaccine } from '.././entities/vaccine.entity';

import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';
import { VACCINE_STAGES } from '../../../constant/base.constant';

describe('VaccineService (findById)', () => {
  let vaccineService: VaccineService;
  let vaccineRepository: Repository<Vaccine>;

  beforeEach(async () => {
    const setupValues = await setup();
    vaccineService = setupValues.vaccineService;
    vaccineRepository = setupValues.vaccineRepository;
  });

  describe('update', () => {
    it('should update a vaccine and return the updated vaccine', async () => {
      const updateVaccineDto = {
        name: 'Measles Vaccine',
        description: 'A vaccine to protect against the measles',
        companyEmail: 'contact@measlesvaccinecompany.com',
      };

      const vaccine: Vaccine = {
        id: 1,
        deletedAt: null,
        numberOfDoses: 1,
        isMandatory: false,
        createdAt: new Date(),
        stage: VACCINE_STAGES.research,
        companyName: 'SF Pharma',
        updatedAt: new Date(),
        name: 'Measles Vaccine',
        description: 'A vaccine to protect against the measles',
      };

      // Mock the findOneBy method in vaccineRepository
      const getSpy = jest
        .spyOn(vaccineRepository, 'findOneBy')
        .mockResolvedValue(vaccine);

      // Mock the save method in vaccineRepository
      const saveSpy = jest
        .spyOn(vaccineRepository, 'save')
        .mockResolvedValue(vaccine);

      const result = await vaccineService.update(1, updateVaccineDto);
      expect(result).toEqual(vaccine);
      expect(getSpy).toHaveBeenCalledWith({
        id: 1,
        deletedAt: undefined,
      });
      expect(saveSpy).toHaveBeenCalledWith({
        id: 1,
        ...updateVaccineDto,
      });
    });

    it('should throw a NotFoundException if the vaccine does not exist', async () => {
      const updateVaccineDto = { name: 'Updated Vaccine' };
      const findOneBySpy = jest
        .spyOn(vaccineRepository, 'findOneBy')
        .mockResolvedValue(null);

      try {
        await vaccineService.update(1, updateVaccineDto);
      } catch (e: any) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("The vaccine doesn't exist");
      }

      expect(findOneBySpy).toHaveBeenCalledWith({
        id: 1,
        deletedAt: undefined,
      });
    });
  });
});

import { Repository } from 'typeorm';

import { Vaccine } from '.././entities/vaccine.entity';

import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';

describe('VaccineService (findAll)', () => {
  let vaccineService: VaccineService;
  let vaccineRepository: Repository<Vaccine>;

  beforeEach(async () => {
    const setupValues = await setup();
    vaccineService = setupValues.vaccineService;
    vaccineRepository = setupValues.vaccineRepository;
  });

  describe('findAll', () => {
    it('should return an array of vaccines', async () => {
      const dateFields = {
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const vaccines: Vaccine[] = [
        {
          id: 1,
          numberOfDoses: 1,
          isMandatory: false,
          name: 'Flu Vaccine',
          companyContact: '123-456-7890',
          companyEmail: 'contact@fluvaccinecompany.com',
          description: 'A vaccine to protect against the flu',
          ...dateFields,
        },
        {
          id: 2,
          name: 'Measles Vaccine',
          companyEmail: 'contact@measlesvaccinecompany.com',
          companyContact: '123-456-7890',
          description: 'A vaccine to protect against measles',
          numberOfDoses: 2,
          isMandatory: true,
          ...dateFields,
        },
        {
          id: 3,
          name: 'Tetanus Vaccine',
          companyEmail: 'contact@tetanusvaccinecompany.com',
          companyContact: '123-456-7890',
          description: 'A vaccine to protect against tetanus',
          numberOfDoses: 3,
          isMandatory: false,
          ...dateFields,
          deletedAt: Date.now(),
        },
      ];

      const getSpy = jest
        .spyOn(vaccineRepository, 'find')
        .mockResolvedValue(vaccines);

      const result = await vaccineService.findAll();
      expect(getSpy).toHaveBeenCalled();
      expect(result).toEqual(vaccines);
    });
  });
});

import { Repository } from 'typeorm';

import { Vaccine } from '.././entities/vaccine.entity';

import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';
import { VACCINE_STAGES } from '../../../constant/base.constant';

describe('VaccineService (findAll)', () => {
  let vaccineService: VaccineService;
  let vaccineRepository: Repository<Vaccine>;

  beforeEach(async () => {
    const setupValues = await setup();
    vaccineService = setupValues.vaccineService;
    vaccineRepository = setupValues.vaccineRepository;
  });

  describe('findAll', () => {
    it('should return an array of vaccines ordered by mandatory vaccines at the top in alphabetical order', async () => {
      const dateFields = {
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const vaccines: Vaccine[] = [
        {
          id: 2,
          name: 'Measles Vaccine',
          description: 'A vaccine to protect against measles',
          numberOfDoses: 2,
          isMandatory: true,
          stage: VACCINE_STAGES.clinical,
          companyName: 'SF Pharma',
          ...dateFields,
        },
        {
          id: 1,
          numberOfDoses: 1,
          isMandatory: false,
          name: 'Flu Vaccine',
          stage: VACCINE_STAGES.manufacturing,
          companyName: 'SF Pharma',
          description: 'A vaccine to protect against the flu',
          ...dateFields,
        },
        {
          id: 3,
          stage: VACCINE_STAGES.regulatory,
          companyName: 'SF Pharma',
          name: 'Tetanus Vaccine',
          description: 'A vaccine to protect against tetanus',
          numberOfDoses: 3,
          isMandatory: false,
          ...dateFields,
          deletedAt: new Date(),
        },
      ];

      const getSpy = jest
        .spyOn(vaccineRepository, 'find')
        .mockResolvedValue(vaccines);

      const result = await vaccineService.findAll();
      expect(getSpy).toHaveBeenCalledWith({
        order: {
          name: 'ASC',
          isMandatory: 'DESC',
        },
      });

      expect(result).toEqual(vaccines);
    });
  });
});

import { Repository } from 'typeorm';

import { Vaccine } from '.././entities/vaccine.entity';
import { CreateVaccineDto } from '.././dto/create-vaccine.dto';

import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';

describe('VaccineService (create)', () => {
  let vaccineService: VaccineService;
  let vaccineRepository: Repository<Vaccine>;

  beforeEach(async () => {
    const setupValues = await setup();
    vaccineService = setupValues.vaccineService;
    vaccineRepository = setupValues.vaccineRepository;
  });

  describe('create', () => {
    it('should create a new vaccine', async () => {
      const createVaccineDto: CreateVaccineDto = {
        numberOfDoses: 1,
        isMandatory: false,
        name: 'Flu Vaccine',
        companyContact: '123-456-7890',
        companyEmail: 'contact@fluvaccinecompany.com',
        description: 'A vaccine to protect against the flu',
      };

      const currentDate = new Date();

      const output: Vaccine = {
        ...createVaccineDto,
        id: 1,
        deletedAt: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      const saveSpy = jest
        .spyOn(vaccineRepository, 'save')
        .mockResolvedValue(output);

      const result = await vaccineService.create(createVaccineDto);

      expect(saveSpy).toHaveBeenCalledWith(createVaccineDto);
      expect(result).toEqual(output);
    });
  });
});

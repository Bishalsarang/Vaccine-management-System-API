import { Repository, UpdateResult } from 'typeorm';

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

  describe('remove', () => {
    it('should soft delete a vaccine and return the update result', async () => {
      const deleteResult: UpdateResult = {
        raw: [],
        generatedMaps: [],
        affected: 1,
      };

      jest
        .spyOn(vaccineRepository, 'softDelete')
        .mockResolvedValue(deleteResult);

      const result = await vaccineService.remove(1);
      expect(result).toEqual(deleteResult);
      expect(vaccineRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});

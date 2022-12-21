import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';

describe('VaccineService', () => {
  let vaccineService: VaccineService;

  beforeEach(async () => {
    const setupValues = await setup();
    vaccineService = setupValues.vaccineService;
  });

  it('should be defined', () => {
    expect(vaccineService).toBeDefined();
  });
});

import { Repository } from 'typeorm';

import { Vaccine } from '.././entities/vaccine.entity';
import { CreateVaccineDto } from '.././dto/create-vaccine.dto';

import { setup } from './vaccine.service.setup';
import { VaccineService } from '.././vaccines.service';
import { VACCINE_STAGES } from '../../../constant/base.constant';

const imageUrl = 'https://cloudinary.com/image.jpg';

/* Mock the cloudinary library. */
jest.mock('cloudinaryService', () => ({
  uploadImage: jest.fn().mockResolvedValue({
    // Got the error: Cannot access 'imageUrl' before initialization in test file
    // So currently duplicating
    secure_url: 'https://cloudinary.com/image.jpg',
  }),
}));

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
        companyName: 'SF Pharmetics',
        image: '',
        stage: VACCINE_STAGES.research,
        allergies: ['Eye pain'],
        description: 'A vaccine to protect against the flu',
      };
      const file = {
        path: '/path/to/image.jpg',
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

      // TODO: Update the test with proper example.
      const result = await vaccineService.create(createVaccineDto, file);

      expect(saveSpy).toHaveBeenCalledWith({ ...createVaccineDto, imageUrl });
      expect(result).toEqual(output);
    });
  });
});

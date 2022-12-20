import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}

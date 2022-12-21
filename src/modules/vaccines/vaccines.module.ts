import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { VaccineService } from './vaccines.service';
import { VaccineController } from './vaccines.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccinesModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vaccine } from './entities/vaccine.entity';
import { VaccineService } from './vaccines.service';
import { VaccineController } from './vaccines.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaccine]),
    JwtModule.register({ secret: process.env.SECRET_KEY || 'SECRET' }),
  ],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccinesModule {}

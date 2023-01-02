import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';

import { vaccinesData } from './data/vaccines.data';

import { Vaccine } from './../modules/vaccines/entities/vaccine.entity';

export default class VaccineSeeder implements Seeder {
  public async run(_: any, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Vaccine)
      .values(vaccinesData)
      .execute();
  }
}

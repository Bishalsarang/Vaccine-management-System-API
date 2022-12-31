import { Connection } from 'typeorm';
import { User } from '../modules/users/entities/users.entity';
import { Seeder } from 'typeorm-seeding';
import { generatePasswordHash } from '../utils/auth.utils';

export default class DatabaseSeeder implements Seeder {
  public async run(_: any, connection: Connection): Promise<void> {
    const UserData = {
      lastname: 'Doe',
      username: 'John',
      firstname: 'John',
      password: 'password123',
      email: 'john.doe@example.com',
    };

    const password = await generatePasswordHash(UserData.password);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          ...UserData,
          password,
        },
      ])
      .execute();
  }
}

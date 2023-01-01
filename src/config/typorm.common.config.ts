import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();

const configService = new ConfigService();

interface DataSourceWithSeederOptions extends PostgresConnectionOptions {
  seeds: string[];
}

const dataSourceConfig: DataSourceWithSeederOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  schema: configService.get('DB_SCHEMA'),
  logging: true,
  migrationsTableName: 'changelog',
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/modules/**/*.entity.js'],
  seeds: ['dist/seeds/**/*.seed.{ts,.js}'],
};

export default dataSourceConfig;

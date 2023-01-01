import dataSourceConfig from './config/typorm.common.config';

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './modules/users/users.module';
import { VaccinesModule } from './modules/vaccines/vaccines.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { CentralExceptionFilter } from './filter/exception.filter';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'coverage/lcov-report'),
      exclude: ['/api*', 'swagger-ui'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({ ...dataSourceConfig }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level:
          configService.get('NODE_ENV') !== 'production' ? 'debug' : 'info',
        transport:
          configService.get('NODE_ENV') !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    MulterModule.register({
      storage: memoryStorage(), // use memory storage for having the buffer
    }),
    VaccinesModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CentralExceptionFilter,
    },
    AppService,
    CloudinaryService,
  ],
})
export class AppModule {}

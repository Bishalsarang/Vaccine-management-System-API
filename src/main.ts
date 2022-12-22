import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import * as cors from 'cors';

import { AppModule } from './app.module';
import { SWAGGER } from './constant/lang.constant';
import { SWAGGER_URL, URL_PREFIX } from './constant/base.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // configure cors
  app.use(cors());

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix(URL_PREFIX);

  // Configure Swagger
  configureSwagger(app);

  // Enable the validation pipe
  // we don't want extra property other than in dtos.
  // want to cast if possible
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000);
}

/**
 * Configures the Swagger documentation and testing tool for the specified NestJS application.
 *
 * @param {INestApplication} app - The NestJS application to configure Swagger for.
 */
function configureSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER.title)
    .setDescription(SWAGGER.description)
    .setVersion(SWAGGER.version)
    .addTag(SWAGGER.title, SWAGGER.description)
    .addBearerAuth(
      {
        type: 'http',
        schema: 'Bearer',
        bearerFormat: 'Token',
      } as SecuritySchemeObject,
      'Bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as cors from 'cors';

import { AppModule } from './app.module';
import { SWAGGER } from './constant/lang.constant';
import { SWAGGER_URL, URL_PREFIX } from './constant/base.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configure cors
  app.use(cors());

  // Configure Swagger
  configureSwagger(app);

  // Enable the validation pipe
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(URL_PREFIX);

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
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_URL, app, document);
}

bootstrap();

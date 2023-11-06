import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidateException } from './customExeptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isDev } from './constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (fields) => {
        throw new ValidateException(fields);
      },
    }),
  );
  app.setGlobalPrefix('api');

  if (isDev) {
    app.enableCors({
      origin: [
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:9000',
      ],
      credentials: true,
    });

    const options = new DocumentBuilder()
      .setTitle('Yul-yort API')
      .setDescription('The yul-yort API description')
      .setVersion('1.0')
      .addTag('yul-yort')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(9000, '0.0.0.0');

  if (isDev) {
    console.log(`Swagger is running on: ${await app.getUrl()}/swagger`);
  }
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

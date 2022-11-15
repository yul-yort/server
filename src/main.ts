import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidateException } from './customExeptions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (fields) => {
        throw new ValidateException(fields);
      },
    }),
  );
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Yul-yort API')
    .setDescription('The yul-yort API description')
    .setVersion('1.0')
    .addTag('yul-yort')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(9000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

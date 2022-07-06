import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  console.log('TEST')
  //TODO: временно !!!
  app.enableCors();
  await app.listen(9000);
}
bootstrap();

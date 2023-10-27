import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth';

@Module({
  imports: [NestConfigModule.forRoot()],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Применяем middleware ко всем маршрутам
  }
}

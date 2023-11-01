import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth/auth';

@Module({
  imports: [NestConfigModule.forRoot()],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/localities', method: RequestMethod.GET },
        { path: '/api/agencies', method: RequestMethod.GET },
        { path: '/api/orders', method: RequestMethod.GET },
      )
      .forRoutes('*'); // Применить к остальным маршрутам
  }
}

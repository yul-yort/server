import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocalityModule } from './locality/locality.module';
import { OrderModule } from './order/order.module';
import { AgencyModule } from './agencies/agency.module';
import { AdminsModule } from './admins/admins.module';
import { isDev } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'yul-yort-test',
      autoLoadEntities: true,
      // Setting synchronize: true shouldn't be used in
      // production - otherwise you can lose production data.
      synchronize: isDev,
    }),
    UsersModule,
    LocalityModule,
    AuthModule,
    OrderModule,
    AgencyModule,
    AdminsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LocalityModule } from './locality/locality.module';
import { OrderModule } from './order/order.module';
import { AgencyModule } from './agencies/agency.module';
import { AdminsModule } from './admins/admins.module';
import { TokenModule } from './token/token.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from './db/typeorm.module';
import './auth/firebase';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UsersModule,
    LocalityModule,
    OrderModule,
    AgencyModule,
    AdminsModule,
    TokenModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}

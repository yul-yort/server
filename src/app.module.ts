import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocalityModule } from './locality/locality.module';
import { OrderModule } from './order/order.module';
import { AgencyModule } from './agencies/agency.module';
import { AdminsModule } from './admins/admins.module';
import { TokenModule } from './token/token.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from './db/typeorm.module';

console.log('process.env', process.env);

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    UsersModule,
    LocalityModule,
    AuthModule,
    OrderModule,
    AgencyModule,
    AdminsModule,
    TokenModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}

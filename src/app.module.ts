import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { LocalityModule } from './locality/locality.module';
import { AgencyModule } from './agency/agency.module';

@Module({
  imports: [
	ConfigModule.forRoot(),
	TypegooseModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: getMongoConfig,
	}),
	AuthModule,
	LocalityModule,
	AgencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

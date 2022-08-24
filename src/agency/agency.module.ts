import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { AgencyModel } from './agency.model';

@Module({
  controllers: [AgencyController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AgencyModel,
        schemaOptions: {
          collection: 'Agency',
        },
      },
    ]),
    ConfigModule,
  ],
  providers: [AgencyService],
})
export class AgencyModule {}

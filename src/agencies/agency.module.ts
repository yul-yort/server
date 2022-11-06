import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [AgencyController],
  imports: [TypeOrmModule.forFeature([Agency]), OrderModule],
  providers: [AgencyService],
})
export class AgencyModule {}

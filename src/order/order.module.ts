import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order])],
  exports: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderModel,
        schemaOptions: {
          collection: 'Order'
        }
      }
    ])
  ],
  providers: [OrderService]
})
export class OrderModule {}
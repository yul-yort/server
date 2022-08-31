import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { OrderModel } from './order.model';
import { COLLECTIONS } from '../configs/mongo.config';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: OrderModel,
        schemaOptions: {
          collection: COLLECTIONS.ORDER,
        },
      },
    ]),
    ConfigModule,
  ],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LocalityController } from './locality.controller';
import { LocalityModel } from './locality.model';
import { LocalityService } from './locality.service';
import { COLLECTIONS } from '../configs/mongo.config';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [LocalityController],
  imports: [
    OrderModule,
    TypegooseModule.forFeature([
      {
        typegooseClass: LocalityModel,
        schemaOptions: {
          collection: COLLECTIONS.LOCALITY,
        },
      },
    ]),
  ],
  providers: [LocalityService],
})
export class LocalityModule {}

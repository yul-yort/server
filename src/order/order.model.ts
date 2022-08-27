import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../configs/mongo.config';

export class OrderRoute {
  @prop({ required: true })
  destination: { type: Types.ObjectId; ref: COLLECTIONS.LOCALITY };
  @prop({ required: true })
  origin: { type: Types.ObjectId; ref: COLLECTIONS.LOCALITY };
}

export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {
  @prop({ required: true })
  agency: { type: Types.ObjectId; ref: COLLECTIONS.AGENCY };
  @prop({ required: true })
  route: OrderRoute;
  @prop()
  price?: number;
}

import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { AgencyModel } from 'src/agency/agency.model';
import { LocalityModel } from 'src/locality/locality.model';

export class OrderRoute {
  @prop({ ref: LocalityModel })
  destination: Ref<LocalityModel>;
  @prop({ ref: LocalityModel })
  origin: Ref<LocalityModel>;
}

export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {
  @prop({ ref: AgencyModel })
  agency: Ref<AgencyModel>;
  @prop({ required: true,  _id: false  })
  route: OrderRoute;
  @prop()
  price?: number;
}

import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AgencyModel extends Base {}

export class AgencyModel extends TimeStamps {
  @prop({ required: true })
  agencyName: string;
  @prop({ type: () => [String] })
  phones?: string[];
  @prop()
  description?: string;
}

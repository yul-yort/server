import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

// TODO: непонятно
export interface LocalityModel extends Base {}
export class LocalityModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  district?: string;

  @prop()
  region?: string;

  @prop()
  description?: string;

  @prop({type: () => [String]})
  coordinates?: string[];
}

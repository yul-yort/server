import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {
  agency: string;

  route: string;

  price: number;

  currencyISO: string;
}

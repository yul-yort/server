import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { OrderModel } from './order.model';
import { OrderCreateDto, OrderUpdateDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel)
    private readonly orderModel: ModelType<OrderModel>,
  ) {}

  async getList(): Promise<DocumentType<OrderModel>[]> {
    const orders = await this.orderModel.find().exec();

    // const result = orders.map((order) => ({
    //   ...order,
    //   agency: this.agencyService.getAgency(order.agencyId),
    // }));

    return orders;
  }

  async getListByAgencyId(
    agencyId: string,
  ): Promise<DocumentType<OrderModel>[]> {
    //TODO Как найти маршруты по одному агенству?
    return this.orderModel.findOne({ agencyId });
  }

  async createOrder(
    dto: OrderCreateDto,
  ): Promise<DocumentType<OrderModel> | null> {
    return this.orderModel.create(dto);
  }

  async deleteOrder(id: string): Promise<DocumentType<OrderModel>> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async updateOrder({
    id,
    ...dto
  }: OrderUpdateDto): Promise<DocumentType<OrderModel>> {
    return this.orderModel
      .findByIdAndUpdate(id, dto, {
        returnDocument: 'after',
      })
      .exec();
  }
}

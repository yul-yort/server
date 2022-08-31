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

  async getList(agencyId: string): Promise<DocumentType<OrderModel>[]> {
    const orders = await this.orderModel
      .find({ agency: agencyId })
      .populate('agency')
      .populate({
        path: 'route',
        populate: {
          path: 'origin',
        },
      })
      .populate({
        path: 'route',
        populate: {
          path: 'destination',
        },
      })
      .exec();

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
    const doc = await this.orderModel.create(dto);

    return (await doc.populate('agency')).populate({
      path: 'route',
      populate: {
        path: 'origin',
      },
    }).then((item) => item.populate({
      path: 'route',
      populate: {
        path: 'destination',
      },
    }))
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

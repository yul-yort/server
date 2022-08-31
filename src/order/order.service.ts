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

  async getListByAgencyId(
    agencyId: string,
  ): Promise<DocumentType<OrderModel>[]> {
    return await this.orderModel
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
  }

  async getList(): Promise<DocumentType<OrderModel>[]> {
    return await this.orderModel
      .find()
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
  }

  async createOrder(
    dto: OrderCreateDto,
  ): Promise<DocumentType<OrderModel> | null> {
    const doc = await this.orderModel.create(dto);

    return (await doc.populate('agency'))
      .populate({
        path: 'route',
        populate: {
          path: 'origin',
        },
      })
      .then((item) =>
        item.populate({
          path: 'route',
          populate: {
            path: 'destination',
          },
        }),
      );
  }

  async deleteOrder(id: string): Promise<DocumentType<OrderModel>> {
    const doc = await this.orderModel.findByIdAndDelete(id);

    return (await doc.populate('agency'))
      .populate({
        path: 'route',
        populate: {
          path: 'origin',
        },
      })
      .then((item) =>
        item.populate({
          path: 'route',
          populate: {
            path: 'destination',
          },
        }),
      );
  }

  async updateOrder({
    id,
    ...dto
  }: OrderUpdateDto): Promise<DocumentType<OrderModel>> {
    const doc = this.orderModel.findByIdAndUpdate(id, dto, {
      returnDocument: 'after',
    });

    return (await doc.populate('agency'))
      .populate({
        path: 'route',
        populate: {
          path: 'origin',
        },
      })
      .then((item) =>
        item.populate({
          path: 'route',
          populate: {
            path: 'destination',
          },
        }),
      );
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { LocalityCreateDto } from './dto/create-dto';
import { LocalityUpdateDto } from './dto/update-dto';
import { LocalityModel } from './locality.model';
import { OrderService } from '../order/order.service';

@Injectable()
export class LocalityService {
  constructor(
    @InjectModel(LocalityModel)
    private readonly localityModel: ModelType<LocalityModel>,
    private readonly orderService: OrderService,
  ) {}

  async create(
    dto: LocalityCreateDto,
  ): Promise<DocumentType<LocalityModel> | null> {
    return this.localityModel.create(dto);
  }

  async getList(): Promise<DocumentType<LocalityModel>[]> {
    return this.localityModel.find().exec();
  }

  async delete(id: string): Promise<DocumentType<LocalityModel> | null> {
    const orders = await this.orderService.getListByLocalityId(id);
    if (orders.length) {
      throw new BadRequestException(
        'Удаляемый насленный пункт используется в поездках',
      );
    }
    return this.localityModel.findByIdAndDelete(id).exec();
  }

  async editLocality({
    id,
    ...dto
  }: LocalityUpdateDto): Promise<DocumentType<LocalityModel> | null> {
    return this.localityModel
      .findByIdAndUpdate(id, dto, {
        returnDocument: 'after',
      })
      .exec();
  }
}

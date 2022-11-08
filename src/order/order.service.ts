import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './order.entity';
import { OrderCreateDto, OrderUpdateDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { validate } from 'class-validator';
import { ValidateException } from '../customExeptions';

const ORDER_NOT_FOUND = 'Поездка не найдена';
const ORDER_NOT_CREATED = 'Ошибка при создании поездки';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getListByAgencyId(agencyId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        agencyId: agencyId,
      },
      relations: { origin: true, destination: true, agency: true },
    });
  }

  async getList(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: { origin: true, destination: true, agency: true },
    });
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: { origin: true, destination: true, agency: true },
    });
  }

  async create(dto: OrderCreateDto): Promise<Order | null> {
    const order = new Order();
    order.price = dto.price;
    order.agencyId = dto.agency;
    order.origin = dto.originId;
    order.destination = dto.destinationId;

    const fields = await validate(order);

    if (fields.length) {
      throw new ValidateException(fields);
    }

    try {
      const createdOrder = await this.orderRepository.save(order);
      return await this.findOne(createdOrder.id);
    } catch (error) {
      if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(ORDER_NOT_CREATED, error?.sqlMessage);
      } else {
        throw new InternalServerErrorException(error?.message);
      }
    }
  }

  async delete(id: number): Promise<void> {
    const { affected } = await this.orderRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }
  }

  async deleteByAgencyId(agencyId: number): Promise<void> {
    try {
      await this.orderRepository.delete({ agencyId });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async update({ id, ...dto }: OrderUpdateDto): Promise<Order> {
    const { affected }: UpdateResult = await this.orderRepository.update(
      { id },
      dto,
    );

    if (affected === 0) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }

    return await this.findOne(id);
  }
}

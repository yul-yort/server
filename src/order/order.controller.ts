import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { OrderModel } from './order.model';
import { OrderUpdateDto, OrderCreateDto } from './dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  async getList(
    @Query('agencyId') agencyId: string,
  ): Promise<DocumentType<OrderModel>[]> {
    if (agencyId) {
      return this.orderService.getListByAgencyId(agencyId);
    }

    return this.orderService.getList();
  }

  @Post('create')
  async createOrder(
    @Body() body: OrderCreateDto,
  ): Promise<DocumentType<OrderModel>> {
    return this.orderService.createOrder(body);
  }

  @Post('update')
  @HttpCode(200)
  async updateAgency(
    @Body() body: OrderUpdateDto,
  ): Promise<DocumentType<OrderModel>> {
    const serviceDto: OrderUpdateDto = {
      id: body.id,
      price: body.price,
    };

    return this.orderService.updateOrder(serviceDto);
  }

  @Delete('delete')
  async deleteAgency(
    @Query('id') id: string,
  ): Promise<DocumentType<OrderModel>> {
    return this.orderService.deleteOrder(id);
  }
}

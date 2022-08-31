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
  async getList(): Promise<DocumentType<OrderModel>[]> {
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
    return this.orderService.updateOrder(body);
  }

  @Delete('delete')
  async deleteAgency(
    @Query('id') id: string,
  ): Promise<DocumentType<OrderModel>> {
    return this.orderService.deleteOrder(id);
  }
}

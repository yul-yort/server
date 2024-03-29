import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderUpdateDto, OrderCreateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { OrderGetDto } from './dto/get.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Orders list
   * @param dto - поля запроса
   */
  @Get()
  async getList(@Query() dto?: OrderGetDto): Promise<Order[]> {
    return this.orderService.getList(dto);
  }

  /**
   * Create order
   * @param body - поля для создания
   */
  @Post()
  async create(@Body() body: OrderCreateDto): Promise<Order> {
    return this.orderService.create(body);
  }

  /**
   * Update order
   * @param body
   */
  @Patch()
  async update(@Body() body: OrderUpdateDto): Promise<Order> {
    return this.orderService.update(body);
  }

  /**
   * Delete order
   * @param id
   */
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.orderService.delete(id);
  }
}

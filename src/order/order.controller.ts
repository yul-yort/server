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
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Orders list
   * @param agencyId - optional agency id
   */
  @Get()
  @ApiQuery({
    name: 'agencyId',
    description: 'Optional agency id',
    required: false,
  })
  async getList(@Query('agencyId') agencyId?: number): Promise<Order[]> {
    if (agencyId) {
      return this.orderService.getListByAgencyId(agencyId);
    }

    return this.orderService.getList();
  }

  /**
   * Create order
   * @param body
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

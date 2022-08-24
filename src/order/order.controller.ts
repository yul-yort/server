import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderCreateDto } from './dto/create-dto';

@Controller('order')
export class OrderController {

  @Get('list')
  async getList() {
   return []
  }

  @Post('create')
  async createOrder(@Body() dto: OrderCreateDto) {
    console.log(dto)
    return []
  }

}

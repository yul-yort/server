import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocalityModel } from './locality.model';

@Controller('locality')
export class LocalityController {
  @Post('create') 
  async create(@Body() dto: Omit<LocalityModel, '_id'>) {

  }

  @Get()
  async get(@Param('id') id:string) {

  }

  @Delete(':id')
  async delete(@Param('id') id:string) {

  }

  @Patch(':id')
  async patch(@Param('id') id:string, @Body() dto: LocalityModel) {

  }
}

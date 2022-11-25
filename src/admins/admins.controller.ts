import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminCreateDto } from './dto/create.dto';
import { Admin } from './admin.entity';
import { AdminsService } from './admins.service';

const endpoint = 'admins';

@ApiTags(endpoint)
@Controller(endpoint)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  /**
   * Create admin
   * @param createAdminDto параметры для создания пользователя
   */
  @Post()
  async create(@Body() createAdminDto: AdminCreateDto): Promise<Admin> {
    return await this.adminsService.create(createAdminDto);
  }

  /**
   * Get admins list
   */
  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  /**
   * Get admin
   * @param id admin id
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    return this.adminsService.findOne(id);
  }

  /**
   * Delete admin
   * @param id admin id
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.adminsService.remove(id);
  }
}

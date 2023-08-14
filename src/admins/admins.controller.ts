import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminCreateDto } from './dto/create.dto';
import { Admin } from './admin.entity';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service';
import { AdminUpdateDto } from './dto/update.dto';

const endpoint = 'admins';

@ApiTags(endpoint)
@Controller(endpoint)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  /**
   * Create admin
   * @param createAdminDto параметры для создания пользователя
   */
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAdminDto: AdminCreateDto): Promise<Admin> {
    return await this.adminsService.create(createAdminDto);
  }

  /**
   * Get admins list
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  /**
   * Get current admin profile
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request): Promise<Admin> {
    const adminId = request.user.admin.id;

    return this.adminsService.findOne(adminId);
  }

  /**
   * Get admin
   * @param id admin id
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    return this.adminsService.findOne(id);
  }

  /**
   * Delete admin
   * @param id admin id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.adminsService.remove(id);
  }

  /**
   * Update admin
   * @param dto - Admin update dto
   */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() dto: AdminUpdateDto): Promise<Admin> {
    return await this.adminsService.update(dto);
  }
}

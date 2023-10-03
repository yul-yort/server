import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './dto/create.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service';

const prefix = 'users';

@ApiTags(prefix)
@Controller(prefix)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create user
   * @param createUserDto параметры для создания пользователя
   */
  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: UserCreateDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Get users list
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Get user
   * @param id user id
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Delete user
   * @param id user id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}

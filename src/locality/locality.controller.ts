import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LocalityCreateDto } from './dto/create.dto';
import { LocalityUpdateDto } from './dto/update.dto';
import { Locality } from './locality.entity';
import { LocalityService } from './locality.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service';

@ApiTags('localities')
@Controller('localities')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  /**
   * Delete locality
   * @param id - id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.localityService.delete(id);
  }

  /**
   * Get locality
   */
  @Get()
  async getList(): Promise<Locality[]> {
    return await this.localityService.getList();
  }

  /**
   * Create locality
   * @param dto - create params body
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: LocalityCreateDto): Promise<Locality> {
    return this.localityService.create(dto);
  }

  /**
   * Update locality
   * @param dto
   */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async edit(@Body() dto: LocalityUpdateDto): Promise<Locality> {
    return this.localityService.update(dto);
  }
}

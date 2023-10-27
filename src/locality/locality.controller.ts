import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LocalityCreateDto } from './dto/create.dto';
import { LocalityUpdateDto } from './dto/update.dto';
import { Locality } from './locality.entity';
import { LocalityService } from './locality.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('localities')
@Controller('localities')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  /**
   * Delete locality
   * @param id - id
   */
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
  @Post()
  async create(@Body() dto: LocalityCreateDto): Promise<Locality> {
    return this.localityService.create(dto);
  }

  /**
   * Update locality
   * @param dto
   */
  @Patch()
  async edit(@Body() dto: LocalityUpdateDto): Promise<Locality> {
    return this.localityService.update(dto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Agency } from './agency.entity';
import { AgencyService } from './agency.service';
import { AgencyCreateDto, AgencyUpdateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.service';

/**
 * Agency controller
 */
@ApiTags('agencies')
@Controller('agencies')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  /**
   * Get agencies list
   */
  @Get()
  async getList(): Promise<Agency[]> {
    return this.agencyService.getList();
  }

  /**
   * Get agencies item
   */
  @Get(':id')
  async getAgency(@Param('id', ParseIntPipe) id: number): Promise<Agency> {
    return this.agencyService.findOne(id);
  }

  /**
   * Create agency
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: AgencyCreateDto): Promise<Agency> {
    return this.agencyService.create(body);
  }

  /**
   * Update agency
   */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateAgency(@Body() body: AgencyUpdateDto): Promise<Agency> {
    return this.agencyService.update(body);
  }

  /**
   * Delete agencies
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAgency(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.agencyService.delete(id);
  }
}

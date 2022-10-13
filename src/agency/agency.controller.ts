import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpCode,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose/lib/types';

import { AgencyModel } from './agency.model';
import { AgencyService } from './agency.service';
import { AgencyCreateDto, AgencyUpdateDto } from './dto';

//TODO exceptions
@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get('list')
  async getList(): Promise<DocumentType<AgencyModel>[]> {
    return this.agencyService.getList();
  }

  @Get()
  async getAgency(@Query() query): Promise<DocumentType<AgencyModel>> {
    return this.agencyService.getAgency(query.id);
  }

  @Post('create')
  async createAgency(
    @Body() body: AgencyCreateDto,
  ): Promise<DocumentType<AgencyModel>> {
    return this.agencyService.createAgency(body);
  }

  @Post('update')
  @HttpCode(200)
  async updateAgency(
    @Body() body: AgencyUpdateDto,
  ): Promise<DocumentType<AgencyModel>> {
    return this.agencyService.updateAgency(body);
  }

  @Delete('delete')
  async deleteAgency(
    @Query('id') id: string,
  ): Promise<DocumentType<AgencyModel>> {
    try {
      return this.agencyService.deleteAgency(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

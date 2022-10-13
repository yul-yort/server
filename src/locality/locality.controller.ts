import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { LocalityCreateDto } from './dto/create-dto';
import { LocalityUpdateDto } from './dto/update-dto';
import { Locality_NOT_FOUND } from './locality.constants';
import { LocalityModel } from './locality.model';
import { LocalityService } from './locality.service';

@Controller('locality')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  //@UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Query('id') id: string): Promise<DocumentType<LocalityModel>> {
    const deleteDoc = await this.localityService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(Locality_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deleteDoc;
  }

  //@UseGuards(JwtAuthGuard)
  @Get('list')
  async getList(): Promise<DocumentType<LocalityModel>[]> {
    return await this.localityService.getList();
  }

  //@UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(201)
  async createLocality(
    @Body() dto: LocalityCreateDto,
  ): Promise<DocumentType<LocalityModel>> {
    return this.localityService.create(dto);
  }

  @Post('edit')
  @HttpCode(200)
  async editLocality(
    @Body() dto: LocalityUpdateDto,
  ): Promise<DocumentType<LocalityModel>> {
    return this.localityService.editLocality(dto);
  }
}

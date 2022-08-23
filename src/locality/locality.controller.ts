import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import {
  LocalityCreateDto,
} from './dto/create-dto';
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
    const localities = await this.localityService.getList();
    return localities;
  }

  //@UseGuards(JwtAuthGuard)
  @Post('create')
  async createLocality(@Body() dto: LocalityCreateDto): Promise<DocumentType<LocalityModel>> {
    return this.localityService.create(dto);
  }

  @Post('edit')
  async editLocality(@Body() dto: LocalityUpdateDto): Promise<DocumentType<LocalityModel>> {
    return this.localityService.editLocality(dto);
  }
}

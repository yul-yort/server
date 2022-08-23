import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decarator';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { Locality_NOT_FOUND } from './locality.constants';
import { LocalityModel } from './locality.model';
import { LocalityService } from './locality.service';

@Controller('locality')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {
    console.log(ConfigService);
  }

  @Get()
  async get(@Param('id') id: string) {}

  @Delete('delete')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log('test', id)
    // const deleteDoc = await this.localityService.delete(id);
    // if (!deleteDoc) {
    //   throw new HttpException(Locality_NOT_FOUND, HttpStatus.NOT_FOUND);
    // }
    return []
  }

  // @UseGuards(JwtAuthGuard)
  @Get('list')
  async getList(@UserEmail() email: string) {
    const localities = await this.localityService.getList();

    return localities;
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async createLocality(@Body() dto: CreateLocalityDto) {
    //TODO: пустой массив 
    return this.localityService.create(dto);
  }
}

import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LocalityCreateDto } from './dto/create.dto';
import { LocalityUpdateDto } from './dto/update.dto';
import { Locality } from './locality.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { validate } from 'class-validator';
import { ValidateException } from '../customExeptions';
import { Locality_FORBIDDEN, Locality_NOT_FOUND } from './locality.constants';

@Injectable()
export class LocalityService {
  constructor(
    @InjectRepository(Locality)
    private readonly localityRepository: Repository<Locality>,
  ) {}

  async create(dto: LocalityCreateDto): Promise<Locality | null> {
    const locality = new Locality();
    locality.name = dto.name;
    locality.coordinates = dto.coordinates;
    locality.description = dto.description;
    locality.region = dto.region;
    locality.district = dto.district;

    const fields = await validate(locality);

    if (fields.length) {
      throw new ValidateException(fields);
    }

    return await this.localityRepository.save(locality);
  }

  async findOne(id: number): Promise<Locality> {
    return this.localityRepository.findOneBy({ id });
  }

  async getList(search): Promise<Locality[]> {
    return this.localityRepository.find({
      where: search ? { name: Like(`%${search}%`) } : {},
      take: 20, // добавляем лимит на 20 элементов
    });
  }

  async delete(id: number): Promise<void> {
    try {
      const { affected } = await this.localityRepository.delete(id);

      if (affected === 0) {
        throw new NotFoundException(Locality_NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error?.code === 'ER_ROW_IS_REFERENCED_2') {
        throw new ForbiddenException(Locality_FORBIDDEN);
      } else {
        throw new InternalServerErrorException(error?.message);
      }
    }
  }

  async update({ id, ...dto }: LocalityUpdateDto): Promise<Locality> {
    const { affected }: UpdateResult = await this.localityRepository.update(
      { id },
      dto,
    );

    if (affected === 0) {
      throw new NotFoundException(Locality_NOT_FOUND);
    }

    return await this.findOne(id);
  }
}

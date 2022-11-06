import { Injectable, NotFoundException } from '@nestjs/common';
import { Agency } from './agency.entity';
import { AgencyCreateDto, AgencyUpdateDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { validate } from 'class-validator';
import { ValidateException } from '../customExeptions';
import { OrderService } from '../order/order.service';

/**
 * Agency service
 */
@Injectable()
export class AgencyService {
  /**
   * Constructor
   */
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
    private readonly orderService: OrderService,
  ) {}

  /**
   * Get agencies list method
   */
  async getList(): Promise<Agency[]> {
    return this.agencyRepository.find();
  }

  /**
   * Get agency by id
   * @param id agency id
   */
  async findOne(id: number): Promise<Agency> {
    const agency = await this.agencyRepository.findOne({ where: { id } });

    if (!agency) {
      throw new NotFoundException(`Agency with id ${id} is not found`);
    }

    return agency;
  }

  /**
   * Create agency.
   * @param dto create agency dto
   */
  async create(dto: AgencyCreateDto): Promise<Agency> {
    const agency = new Agency();
    agency.name = dto.name;
    agency.description = dto.description;
    agency.phones = dto.phones;

    const fields = await validate(agency);

    if (fields.length) {
      throw new ValidateException(fields);
    }

    return await this.agencyRepository.save(agency);
  }

  /**
   * Delete agency by id
   * @param id agency id
   */
  async delete(id: number): Promise<void> {
    await this.orderService.deleteByAgencyId(id);
    const { affected } = await this.agencyRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Agency with id ${id} is not found`);
    }
  }

  /**
   * Update agency
   * @param dto updating dto
   */
  async update(dto: AgencyUpdateDto): Promise<Agency> {
    const { id, ...updating } = dto;

    const { affected }: UpdateResult = await this.agencyRepository.update(
      { id },
      updating,
    );

    if (affected === 0) {
      throw new NotFoundException(`Agency with id ${id} is not found`);
    }

    return await this.findOne(id);
  }
}

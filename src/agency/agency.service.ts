import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { AgencyModel } from './agency.model';
import { AgencyCreateDto, AgencyUpdateDto } from './dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel(AgencyModel)
    private readonly agencyModel: ModelType<AgencyModel>,
  ) {}

  async getList(): Promise<DocumentType<AgencyModel>[]> {
    return this.agencyModel.find();
  }

  async getAgency(id: string): Promise<DocumentType<AgencyModel>> {
    return await this.agencyModel.findById(id).exec();
  }

  async createAgency(dto: AgencyCreateDto): Promise<DocumentType<AgencyModel>> {
    return this.agencyModel.create(dto);
  }

  async deleteAgency(id: string): Promise<DocumentType<AgencyModel>> {
    return this.agencyModel.findByIdAndDelete(id).exec();
  }

  async updateAgency({
    id,
    ...dto
  }: AgencyUpdateDto): Promise<DocumentType<AgencyModel>> {
    return this.agencyModel
      .findByIdAndUpdate(id, dto, {
        returnDocument: 'after',
      })
      .exec();
  }
}

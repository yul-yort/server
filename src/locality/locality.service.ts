import {  Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { LocalityModel } from './locality.model';

@Injectable()
export class LocalityService {
  // TODO: что за @Inject
  constructor(@InjectModel(LocalityModel) private readonly localityModel: ModelType<LocalityModel>){}

  async create(dto: CreateLocalityDto): Promise<DocumentType<LocalityModel>> {
   return this.localityModel.create(dto)
  }

 async delete(id: string): Promise<DocumentType<LocalityModel> | null> {
  return this.localityModel.findByIdAndDelete(id).exec()
 }
}

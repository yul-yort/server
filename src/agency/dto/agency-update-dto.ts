import { IsString } from 'class-validator';
import { AgencyCreateDto } from './agency-create.dto';

export class AgencyUpdateDto extends AgencyCreateDto {
  @IsString()
  id: string;
}

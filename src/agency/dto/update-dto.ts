import { IsString } from 'class-validator';
import { AgencyCreateDto } from './create-dto';

export class AgencyUpdateDto extends AgencyCreateDto {
  @IsString()
  id: string;
}

import { IsInt } from 'class-validator';
import { AgencyCreateDto } from './create.dto';

export class AgencyUpdateDto extends AgencyCreateDto {
  @IsInt()
  id: number;
}

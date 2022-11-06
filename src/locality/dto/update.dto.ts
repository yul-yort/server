import { IsNumber, IsOptional, IsString } from 'class-validator';
import { LocalityCreateDto } from './create.dto';

export class LocalityUpdateDto extends LocalityCreateDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;
}

import { IsNumber, IsOptional } from 'class-validator';

export class OrderCreateDto {
  @IsNumber()
  agency: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  originId: number;

  @IsNumber()
  destinationId: number;
}

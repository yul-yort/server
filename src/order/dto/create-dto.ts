import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class OrderCreateDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  agencyId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  originId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  destinationId: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  price?: number;
}

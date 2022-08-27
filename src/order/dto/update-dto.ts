import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class OrderUpdateDto {
  @IsString()
  id: string;

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

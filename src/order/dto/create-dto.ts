import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class OrderCreateDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  agency: Types.ObjectId;

  route: {
    origin: Types.ObjectId;
    destination: Types.ObjectId;
  }

  price?: number;
}

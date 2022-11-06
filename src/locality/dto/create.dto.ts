import { IsArray, IsOptional, IsString } from 'class-validator';

/** Широта */
export type TLocalityLatitude = string;
/** Долгота */
export type TLocalityLongitude = string;

export class LocalityCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coordinates?: [TLocalityLatitude, TLocalityLongitude];
}

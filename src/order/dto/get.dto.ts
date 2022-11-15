import { IsOptional, IsString } from 'class-validator';

/**
 * Поля, по которым можно фильтровать запрашиваемый список.
 */
export class OrderGetDto {
  /**
   * ID агентства
   */
  @IsOptional()
  @IsString()
  agencyId?: string;

  /**
   * ID нас. пункта "откуда"
   */
  @IsOptional()
  @IsString()
  originId?: string;

  /**
   * ID нас. пункта "куда"
   */
  @IsOptional()
  @IsString()
  destinationId?: string;
}

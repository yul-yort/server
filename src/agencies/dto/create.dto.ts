import { IsString, IsOptional, IsArray } from 'class-validator';

export class AgencyCreateDto {
  /**
   * Agency name.
   */
  @IsString()
  name: string;

  /**
   * Agency phones.
   */
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  phones?: string[];

  /**
   * Agency phones.
   */
  @IsOptional()
  @IsString()
  description?: string;
}

import { IsString, IsOptional } from 'class-validator';

export class AgencyCreateDto {
  @IsString()
  agencyName: string;

  @IsOptional()
  @IsString({ each: true })
  phones?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}

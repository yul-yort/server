import { BaseEntity } from '../base.entity';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('locality')
export class Locality extends BaseEntity {
  @IsString()
  @Length(1)
  @Column()
  name: string;

  @IsString()
  @Length(1)
  @IsOptional()
  @Column({ default: '' })
  district?: string;

  @IsString()
  @Length(1)
  @IsOptional()
  @Column({ default: '' })
  region?: string;

  @IsString()
  @Length(1)
  @IsOptional()
  @Column({ default: '' })
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Column('simple-array', { default: null })
  coordinates?: string[] | null;
}

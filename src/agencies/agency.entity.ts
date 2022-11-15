import { BaseEntity } from '../base.entity';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('agency')
export class Agency extends BaseEntity {
  /**
   * Agency name.
   */
  @IsString()
  @Column()
  name: string;

  /**
   * Agency phones.
   */
  @ApiProperty({ nullable: true })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @Column('simple-array', { default: null, nullable: true })
  phones?: string[];

  /**
   * Agency description
   */
  @IsOptional()
  @IsString()
  @Column({ default: '' })
  description?: string;
}

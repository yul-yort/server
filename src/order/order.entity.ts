import { BaseEntity } from '../base.entity';
import { IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Locality } from '../locality/locality.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Agency } from '../agencies/agency.entity';

@Entity('order')
export class Order extends BaseEntity {
  /**
   * Agency
   */
  @ApiProperty({ type: () => Agency, nullable: true })
  @ManyToOne(() => Agency, (agency) => agency)
  @JoinColumn({ name: 'agencyId' })
  agency: number;

  @ApiProperty({ writeOnly: true })
  @Column({ name: 'agencyId', select: false })
  agencyId: number;

  /**
   * Price
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty({ nullable: true })
  @Column({ default: null })
  price?: number;

  /**
   * Origin
   */
  @ApiProperty({ type: () => Locality, nullable: true })
  @ManyToOne(() => Locality, (locality) => locality)
  @JoinColumn({ name: 'originId' })
  origin: number;

  @ApiProperty({ writeOnly: true })
  @Column({ name: 'originId', select: false })
  originId: number;

  /**
   * Destination
   */
  @ApiProperty({ type: () => Locality, nullable: true })
  @ManyToOne(() => Locality, (locality) => locality)
  @JoinColumn({ name: 'destinationId' })
  destination: number;

  @ApiProperty({ writeOnly: true })
  @Column({ name: 'destinationId', select: false })
  destinationId: number;
}

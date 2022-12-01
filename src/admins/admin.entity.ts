import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admins')
export class Admin extends BaseEntity {
  /**
   * Name of admin
   */
  @IsString()
  @Column()
  firstName: string;

  /**
   * Lastname of admin
   */
  @IsString()
  @Column()
  lastName: string;

  /**
   * Email of admin
   */
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ writeOnly: true })
  @IsString()
  @Length(1)
  @Column({ select: false })
  passwordHash: string;
}

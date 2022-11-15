import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User extends BaseEntity {
  /**
   * Name of user
   */
  @IsString()
  @Column()
  firstName: string;

  /**
   * Lastname of user
   */
  @IsString()
  @Column()
  lastName: string;

  /**
   * Email of user
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

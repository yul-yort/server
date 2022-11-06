import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  /**
   * id
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Created date
   * @example 2022-11-04T01:49:57.039Z
   */
  @CreateDateColumn({ update: false })
  createdAt: Date;

  /**
   * Updated date
   * @example 2022-11-04T01:49:57.039Z
   */
  @UpdateDateColumn()
  updatedAt: Date;
}

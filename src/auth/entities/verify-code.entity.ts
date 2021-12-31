import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './../../common/entity/base-entity.entity';

@Entity()
export class VerifyCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({unique: true})
  email: string;

  /* Date Columns */
}

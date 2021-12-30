import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class VerifyCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({unique: true})
  email: string;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '사용자의 id'})
  id: number;

  @Column({
    unique: true,
    nullable: true,
  })
  @ApiProperty({description: '사용자의 이메일'})
  email: string;

  @Column()
  @ApiProperty({description: '사용자의 비밀번호'})
  password: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @ApiProperty({description: '사용자의 구글 ID'})
  googleAccount: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @ApiProperty({description: '사용자의 카카오 ID'})
  kakaoAccount: string;

  @Column({type: 'text', nullable: true})
  refreshToken: string;

  /* Relations */

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

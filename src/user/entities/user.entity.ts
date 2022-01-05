import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {Media} from './../../media/entities/media.entity';
import {BaseEntity} from './../../common/entity/base-entity.entity';
import * as bcrypt from 'bcrypt';
import {BadRequestException} from '@nestjs/common';
import {Err} from 'src/common/error';

@Entity()
export class User extends BaseEntity {
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

  @OneToMany(() => Media, media => media.user)
  mediaList: Media[];

  /* Date Columns */

  @DeleteDateColumn()
  deletedAt: Date | null;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }
}

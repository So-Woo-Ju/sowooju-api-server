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
  @ApiProperty({description: '사용자의 이메일', example: 'sowoojuenterprise@gmail.com'})
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @ApiProperty({description: '사용자의 구글 ID', example: '1234'})
  googleAccount: string;

  @Column({
    unique: true,
    nullable: true,
  })
  @ApiProperty({description: '사용자의 카카오 ID', example: '1234'})
  kakaoAccount: string;

  @Column({type: 'text', nullable: true})
  @ApiProperty({description: '사용자의 리프레시 토큰', example: '123456789'})
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

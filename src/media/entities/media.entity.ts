import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {VideoType, VideoLanguage} from '../../constants';
import {User} from './../../user/entities/user.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '영상의 id'})
  id: number;

  @Column()
  @ApiProperty({description: '영상의 제목'})
  videoName: string;

  @Column()
  @ApiProperty({description: '영상의 타입'})
  videoType: VideoType;

  @Column()
  @ApiProperty({description: '자막의 언어'})
  videoLanguage: VideoLanguage;

  @Column({nullable: true})
  @ApiProperty({description: '영상의 URL'})
  videoUrl: string;

  @Column({nullable: true})
  @ApiProperty({description: '자막의 URL'})
  captionUrl: string;

  /* Relations */

  @ManyToOne(() => User, user => user.mediaList, {onDelete: 'CASCADE'})
  user: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

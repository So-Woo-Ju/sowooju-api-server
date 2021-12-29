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
import {VideoType, VideoLanguage} from '../../constants';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '영상의 id'})
  id: number;

  @Column({nullable: true})
  @ApiProperty({description: '영상의 제목'})
  videoName: string;

  @Column({nullable: true})
  @ApiProperty({description: '영상의 타입'})
  videoType: VideoType;

  @Column({nullable: true})
  @ApiProperty({description: '자막의 언어'})
  videoLanguage: VideoLanguage;

  @Column({nullable: true})
  @ApiProperty({description: '영상의 URL'})
  videoUrl: string;

  @Column({nullable: true})
  @ApiProperty({description: '자막의 URL'})
  captionUrl: string;

  /* Relations */

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}

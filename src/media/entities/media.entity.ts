import {Column, DeleteDateColumn, Entity, ManyToOne} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from './../../user/entities/user.entity';
import {BaseEntity} from './../../common/entity/base-entity.entity';

export enum VideoType {
  LOCAL = 'LOCAL', // 로컬에서 업로드
  YOUTUBE = 'YOUTUBE', // 유튜브에서 업로드
}

export enum VideoLanguage {
  KOR = 'KOR', // 한국어 자막
  ENG = 'ENG', // 영어 자막
}

@Entity()
export class Media extends BaseEntity {
  @Column()
  @ApiProperty({description: '영상의 제목', example: '비디오'})
  videoName: string;

  @Column({type: 'enum', enum: VideoType})
  @ApiProperty({description: '영상의 타입', example: 'LOCAL'})
  videoType: VideoType;

  @Column({type: 'enum', enum: VideoLanguage})
  @ApiProperty({description: '자막의 언어', example: 'KOR'})
  videoLanguage: VideoLanguage;

  @Column({nullable: true})
  @ApiProperty({
    description: '영상의 URL',
    example: 'https://bucket-name.s3-accelerate.amazonaws.com...',
  })
  videoUrl: string;

  @Column({nullable: true})
  @ApiProperty({
    description: '자막의 URL',
    example: 'https://bucket-name.s3-accelerate.amazonaws.com...',
  })
  captionUrl: string;

  @Column({nullable: true})
  @ApiProperty({
    description: '텍스트 파일의 URL',
    example: 'https://bucket-name.s3-accelerate.amazonaws.com...',
  })
  textUrl: string;

  @Column({nullable: true})
  @ApiProperty({
    description: '썸네일 파일의 URL',
    example: 'https://bucket-name.s3-accelerate.amazonaws.com...',
  })
  thumbnailUrl: string;

  /* Relations */

  @ManyToOne(() => User, user => user.mediaList, {onDelete: 'CASCADE'})
  user: User;

  /* Date Columns */
  @DeleteDateColumn()
  deletedAt: Date | null;
}

import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {VideoLanguage, VideoType} from '../entities/media.entity';

export class getMediaResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({example: '비디오'})
  videoName: string;

  @ApiProperty({example: 'LOCAL'})
  videoType: VideoType;

  @ApiProperty({example: 'KOR'})
  videoLanguage: VideoLanguage;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  videoUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  captionUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  textUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  thumbnailUrl: string;
}

export class getMyMediasResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({type: [getMediaResponseDto]})
  data: [getMediaResponseDto];
}

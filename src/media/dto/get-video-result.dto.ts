import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {VideoLanguage, VideoType} from '../entities/media.entity';

export class GetVideoResultDto {
  @ApiProperty({example: '비디오'})
  videoName: string;

  @ApiProperty({example: 'LOCAL'})
  videoType: VideoType;

  @ApiProperty({example: 'KOR'})
  videoLanguage: VideoLanguage;

  @ApiProperty({example: 'Saved File Name'})
  fileName: string;
}

export class GetVideoResultResponseDto {
  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  videoUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  captionUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  textUrl: string;
}

export class GetVideoResultResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: GetVideoResultResponseDto;
}

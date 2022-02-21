import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class GetVideoPresignedUrlResponseDto {
  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  videoS3Url: Promise<string>;
}

export class GetVideoPresignedUrlResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: GetVideoPresignedUrlResponseDto;
}

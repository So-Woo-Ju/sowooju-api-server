import {ApiProperty} from '@nestjs/swagger';

export class SaveS3UrlResponseDto {
  @ApiProperty({example: '1'})
  userId: number;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  videoUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  captionUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  textUrl: string;

  @ApiProperty({example: 'https://bucket-name.s3-accelerate.amazonaws.com...'})
  thumbnailUrl: string;
}

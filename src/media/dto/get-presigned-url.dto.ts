import {ApiProperty} from '@nestjs/swagger';

export class GetPresignedUrlDto {
  @ApiProperty({example: '123456789'})
  contentType: string;
}

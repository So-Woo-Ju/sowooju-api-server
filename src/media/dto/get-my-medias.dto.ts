import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {Media} from '../entities/media.entity';

export class getMyMediasResponseDto {
  @ApiProperty({type: [Media]})
  medias: Media[];
}

export class getMyMediasResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: getMyMediasResponseDto;
}

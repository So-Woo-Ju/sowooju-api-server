import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class CreateAccessTokenResponseDto {
  @ApiProperty({example: '123456789'})
  accessToken: string;
}

export class CreateAccessTokenResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: CreateAccessTokenResponseDto;
}

import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class KakaoLoginDto {
  @ApiProperty({example: '123456789'})
  kakaoToken: string;
}

export class KakaoLoginResponseDto {
  @ApiProperty({example: '123456789'})
  accessToken: string;

  @ApiProperty({example: '123456789'})
  refreshToken: string;

  @ApiProperty({example: '2022-02-05T13:04:26.000Z'})
  tokenExp: Date;
}

export class KakaoLoginResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: KakaoLoginResponseDto;
}

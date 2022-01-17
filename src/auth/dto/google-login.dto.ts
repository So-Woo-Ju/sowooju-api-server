import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class GoogleLoginDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com'})
  googleAccount: string;

}

export class GoogleLoginResponseDto {
  @ApiProperty({example: '123456789'})
  accessToken: string;

  @ApiProperty({example: '123456789'})
  refreshToken: string;

  @ApiProperty({example: '2022-02-05T13:04:26.000Z'})
  tokenExp: Date;
}

export class GoogleLoginResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: GoogleLoginResponseDto;
}

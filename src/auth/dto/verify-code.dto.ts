import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEmail} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class VerifyCodeDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com@gmail.com'})
  email: string;

  @ApiProperty({example: '1a2b3c'})
  code: string;
}

export class VerifyCodeResponseDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com@gmail.com'})
  email: string;

  @ApiPropertyOptional()
  isCodeExpired: boolean;

  @ApiPropertyOptional()
  isVerify: boolean;
}

export class VerifyCodeResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: boolean;

  @ApiProperty()
  data: VerifyCodeResponseDto;
}

import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEmail} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class VerifyCodeDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com'})
  email: string;

  @ApiProperty({example: '1a2b3c'})
  code: string;
}

export class VerifyCodeResponseDto {
  @ApiProperty()
  isVerify: boolean;
}

export class VerifyCodeResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: VerifyCodeResponseDto;
}

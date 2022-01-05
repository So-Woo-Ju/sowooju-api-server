import {ApiProperty} from '@nestjs/swagger';
import {IsEmail} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class SendEmailDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com'})
  email: string;
}

export class SendEmailResponseDto {
  @ApiProperty()
  isSend: boolean;
}

export class sendEmailResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: SendEmailResponseDto;
}

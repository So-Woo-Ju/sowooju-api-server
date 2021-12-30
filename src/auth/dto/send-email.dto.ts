import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEmail} from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com'})
  email: string;
}

export class SendEmailResponseDto {
  @ApiProperty()
  isSend: boolean;

  @ApiPropertyOptional()
  isUserExist: boolean;
}

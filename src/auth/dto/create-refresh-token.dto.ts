import {ApiProperty} from '@nestjs/swagger';

export class CreateRefershTokenResponseDto {
  @ApiProperty({example: '123456789'})
  refreshToken: string;

  @ApiProperty({example: '123456789'})
  tokenExp: Date;
}

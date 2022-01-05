import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com'})
  email: string;

  @IsString()
  @ApiProperty({example: '1a2b3c'})
  password: string;
}

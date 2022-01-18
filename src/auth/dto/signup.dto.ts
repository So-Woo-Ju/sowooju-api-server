import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';
import {User} from 'src/user/entities/user.entity';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({example: 'sowoojuenterprise@gmail.com'})
  email: string;

  @IsString()
  @ApiProperty({example: '1a2b3c'})
  password: string;
}

export class SignUpResponseBodyDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: User;
}

import {IsDate, IsEmail, IsInt, IsNumber, IsString} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  googleAccount: string;

  @IsString()
  kakaoAccount: string;

  @IsString()
  refreshToken: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

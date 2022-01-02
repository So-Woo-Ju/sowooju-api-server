import { IsDate, IsEmail, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  id: string;

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
  createdDate: Date;

  @IsDate()
  updateDate: Date;
}

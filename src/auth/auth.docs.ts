import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiBody} from '@nestjs/swagger';
import {AuthController} from './auth.controller';
import {SignUpResponseBodyDto} from './dto/signup.dto';
import {sendEmailResponseBodyDto} from './dto/send-email.dto';
import {VerifyCodeResponseBodyDto} from './dto/verify-code.dto';
import {SwaggerMethodDoc} from 'src/common/types';
import {LoginResponseBodyDto, LoginDto} from './dto/login.dto';

export const docs: SwaggerMethodDoc<AuthController> = {
  sendEmail(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '등록된 이메일로 인증코드 여섯자리를 전송합니다.',
      }),
      ApiCreatedResponse({
        type: sendEmailResponseBodyDto,
      }),
    );
  },
  verifyCode(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '유저가 입력한 인증코드가 전송한 코드와 일치하는지 확인합니다.',
      }),
      ApiCreatedResponse({
        type: VerifyCodeResponseBodyDto,
      }),
    );
  },
  signup(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원가입을 진행합니다.',
      }),
      ApiCreatedResponse({
        type: SignUpResponseBodyDto,
      }),
    );
  },
  login(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '로그인을 진행합니다',
      }),
      ApiBody({type: LoginDto}),
      ApiCreatedResponse({
        type: LoginResponseBodyDto,
      }),
    );
  },
};

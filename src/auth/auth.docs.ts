import {applyDecorators} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {AuthController} from './auth.controller';
import {sendEamilResponseBodyDto} from './dto/send-email.dto';
import {VerifyCodeResponseBodyDto} from './dto/verify-code.dto';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const docs: SwaggerMethodDoc<AuthController> = {
  sendEmail(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '등록된 이메일로 인증코드 여섯자리를 전송합니다.',
      }),
      ApiCreatedResponse({
        type: sendEamilResponseBodyDto,
        description:
          '성공적으로 전송했다면 isSend: true, 이미 등록된 이메일이라면 isUserExist: true를 반환',
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
        description:
          '코드가 일치한다면 isVerify: true, 불일치한다면 isVerify: false, 만료된 코드라면 isCodeExpired: true를 반환',
      }),
    );
  },
};

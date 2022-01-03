import {applyDecorators} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {AuthController} from './auth.controller';
import {sendEmailResponseBodyDto} from './dto/send-email.dto';
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
};

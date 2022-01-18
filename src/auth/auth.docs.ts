import {applyDecorators} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {AuthController} from './auth.controller';
import {SignUpResponseBodyDto} from './dto/signup.dto';
import {sendEmailResponseBodyDto} from './dto/send-email.dto';
import {VerifyCodeResponseBodyDto} from './dto/verify-code.dto';
import {SwaggerMethodDoc} from 'src/common/types';
import {LoginResponseBodyDto, LoginDto} from './dto/login.dto';
import {CreateAccessTokenResponseBodyDto} from './dto/create-access-token.dto';
import {KakaoLoginDto, KakaoLoginResponseBodyDto} from './dto/kakao-login.dto';
import {GoogleLoginDto, GoogleLoginResponseBodyDto} from './dto/google-login.dto';

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
      ApiResponse({status: 400, description: '이미 존재하는 사용자입니다.'}),
      ApiResponse({status: 500, description: '메일 전송 중 에러가 발생하였습니다.'}),
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
      ApiResponse({
        status: 500,
        description: '1. 유효하지 않은 정보입니다.\t\n 2. 유효기간이 만료된 코드입니다.',
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
      ApiResponse({status: 400, description: '이미 존재하는 사용자입니다.'}),
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
      ApiResponse({status: 400, description: '존재하지 않는 사용자입니다.'}),
    );
  },
  createAccessToken(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '액세스 토큰을 재발급합니다.',
      }),
      ApiCreatedResponse({
        type: CreateAccessTokenResponseBodyDto,
      }),
      ApiResponse({
        status: 401,
        description:
          '1. 리프레시 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
      ApiResponse({status: 500, description: '예기치 못한 못한 서버에러가 발생했습니다.'}),
    );
  },
  reissueRefreshToken(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '리프레시 토큰을 갱신합니다. 요청 시 사용된 리프레시 토큰의 만료 시간이 2주 미만으로 남았을 때만 갱신되어 전달됩니다',
      }),
      ApiCreatedResponse({
        type: LoginResponseBodyDto,
      }),
      ApiResponse({
        status: 401,
        description:
          '1. 리프레시 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
      ApiResponse({status: 403, description: '해당 요청의 권한이 없습니다'}),
      ApiResponse({status: 405, description: '토큰 만료 2주 전부터 갱신이 가능합니다.'}),
      ApiResponse({status: 500, description: '예기치 못한 못한 서버에러가 발생했습니다.'}),
    );
  },
  signInWithGoogle(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '구글 로그인을 진행합니다.',
      }),
    );
  },
  signInWithGoogleRedirect(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '구글 로그인 성공시 리다이렉트됩니다.',
      }),
      ApiCreatedResponse({
        type: GoogleLoginResponseBodyDto,
      }),
      ApiOkResponse({status: 400, description: '존재하지 않는 사용자입니다.'}),
    );
  },
  signInWithKakao(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 로그인을 진행합니다.',
      }),
    );
  },
  signInWithKakaoRedirect(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '카카오 로그인 성공시 리다이렉트됩니다.',
      }),
      ApiCreatedResponse({
        type: KakaoLoginResponseBodyDto,
      }),
      ApiOkResponse({status: 400, description: '존재하지 않는 사용자입니다.'}),
    );
  },
};

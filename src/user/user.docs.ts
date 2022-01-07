import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiBearerAuth, ApiResponse} from '@nestjs/swagger';
import {UserController} from './user.controller';
import {SwaggerMethodDoc} from 'src/common/types';
import {GetProfileResponseBodyDto} from './dto/get-profile.dto';

export const docs: SwaggerMethodDoc<UserController> = {
  getProfile(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자 정보를 조회합니다.',
      }),
      ApiCreatedResponse({
        type: GetProfileResponseBodyDto,
      }),
      ApiResponse({
        status: 401,
        description:
          '1. 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
    );
  },
};

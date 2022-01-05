import {applyDecorators} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
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
    );
  },
};

import {applyDecorators} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {ReturnUserDto} from './dto/return-user.dto';
import {UserController} from './user.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const docs: SwaggerMethodDoc<UserController> = {
  getProfile(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '사용자 정보를 조회합니다.',
      }),
      ApiCreatedResponse({
        type: ReturnUserDto,
      }),
    );
  },
};

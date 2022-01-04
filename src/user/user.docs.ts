import {applyDecorators} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Users} from 'src/common/decorators/user.decorator';
import {CreateUserDto} from './dto/create-user.dto';
import {UserController} from './user.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const docs: SwaggerMethodDoc<UserController> = {
  create(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원가입 시 사용자를 등록합니다.',
      }),
      ApiCreatedResponse({
        type: CreateUserDto,
      }),
    );
  },
  getProfile(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '이메일로 사용자를 조회합니다.',
      }),
      ApiCreatedResponse({
        type: Users,
      }),
    );
  },
};

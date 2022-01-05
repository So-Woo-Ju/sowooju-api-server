import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {UserService} from './user.service';
import {ApiTags} from '@nestjs/swagger';
import {docs} from 'src/user/user.docs';
import {JwtUser} from 'src/common/types';
import {AuthUser} from 'src/common/decorators/user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @docs.getProfile('사용자 정보 조회')
  async getProfile(@AuthUser() user: JwtUser) {
    return await this.userService.findUserById(user.id);
  }
}

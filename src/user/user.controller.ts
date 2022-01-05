import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {CreateUserDto} from '../auth/dto/create-user.dto';
import {AuthUser} from 'src/common/decorators/user.decorator';
import {User} from './entities/user.entity';
import {UserService} from './user.service';
import {ApiTags} from '@nestjs/swagger';
import {docs} from 'src/user/user.docs';
import {ReturnUserDto} from './dto/return-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @docs.getProfile('사용자 조회')
  async getProfile(@Body() returnUserDto: ReturnUserDto) {
    return await this.userService.findUser(returnUserDto);
  }
}

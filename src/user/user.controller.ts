import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {CreateUserDto} from './dto/create-user.dto';
import {Users} from 'src/common/decorators/user.decorator';
import {User} from './entities/user.entity';
import {UserService} from './user.service';
import {ApiTags} from '@nestjs/swagger';
import {docs} from 'src/user/user.docs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @docs.create('사용자 등록')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @docs.getProfile('사용자 조회')
  async getProfile(@Users() user) {
    return user;
  }
}

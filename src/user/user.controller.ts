import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post()
  async create(@Body() CreateUserDto: CreateUserDto): Promise<User>{
    return await this.userService.create(CreateUserDto);
  }
}

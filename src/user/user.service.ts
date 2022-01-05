import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from '../auth/dto/create-user.dto';
import {Err} from 'src/common/error';
import {ReturnUserDto} from './dto/return-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(user: any): Promise<ReturnUserDto> {
    return await this.userRepository.findOne(user.id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({email}, {select: ['password', 'email', 'id']});
  }
}

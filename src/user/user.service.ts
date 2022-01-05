import {Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({id});
    delete user.password;
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({email}, {select: ['password', 'email', 'id']});
  }
}

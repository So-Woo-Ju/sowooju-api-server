import {Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({email}, {select: ['password', 'email', 'id']});
  }
}

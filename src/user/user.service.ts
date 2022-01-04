import {Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    console.log('유저 전체 불러오기');
    return this.userRepository.find();
  }

  async create(userData: CreateUserDto): Promise<User> {
    const {id, email, password, googleAccount, kakaoAccount, refreshToken, createdAt, updatedAt} = userData;

    const user = new User();
    user.id = id;
    user.email = email;
    user.password = password;
    user.googleAccount = googleAccount;
    user.kakaoAccount = kakaoAccount;
    user.refreshToken = refreshToken;
    user.createdAt = createdAt;
    user.updatedAt = updatedAt;

    await this.userRepository.save(user);
    user.password = undefined;
    console.log(user);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({email}, {select: ['password', 'email', 'id']});
  }
}

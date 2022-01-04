import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {Err} from 'src/common/error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {email, password} = createUserDto;

    const existingEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingEmail) {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }
    const user = new User();
    user.email = email;
    user.password = password;
    await this.userRepository.save(user);
    user.password = undefined;
    console.log(user);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({email}, {select: ['password', 'email', 'id']});
  }
}

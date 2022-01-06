import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {VerifyCode} from './entities/verify-code.entity';
import {MailSender} from './mail-sender';
import {SendEmailDto, SendEmailResponseDto} from './dto/send-email.dto';
import {UserService} from './../user/user.service';
import {VerifyCodeDto, VerifyCodeResponseDto} from './dto/verify-code.dto';
import {Err} from '../common/error';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {SignUpDto} from './dto/signup.dto';
import {User} from 'src/user/entities/user.entity';
import {LoginResponseDto} from './dto/login.dto';
import {JwtPayload, LocalUser} from 'src/common/types';
import {ConfigService} from '@nestjs/config';
import {CreateRefershTokenResponseDto} from './dto/create-refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerifyCode)
    private readonly verifyCodeRepository: Repository<VerifyCode>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailSender: MailSender,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail({email}: SendEmailDto): Promise<SendEmailResponseDto> {
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }

    const verifyCode = await this.verifyCodeRepository.findOne({email});

    const generatedCode = Math.floor(Math.random() * 1000000 - 1)
      .toString()
      .padStart(6, '0');

    if (verifyCode) {
      await this.verifyCodeRepository.update(verifyCode.id, {code: generatedCode});
    } else {
      await this.verifyCodeRepository.save({
        code: generatedCode,
        email,
      });
    }

    try {
      await this.mailSender.send({
        to: email,
        subject: 'SoWooJu 메일 인증',
        text: `아래의 코드를 입력해 인증을 완료해 주세요. ${generatedCode} 이 번호는 10분간 유효합니다.`,
      });
    } catch (e) {
      throw new InternalServerErrorException(Err.SERVER.NOT_SEND_MAIL_ERROR);
    }
    return {isSend: true};
  }

  async verifyCode({email, code}: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    const verifyCode = await this.verifyCodeRepository.findOne({email, code});

    if (!verifyCode) {
      throw new BadRequestException(Err.VERIFY_CODE.INVALID_CODE);
    }

    const expirationTime = differenceInMinutes(new Date(), verifyCode.createdAt);

    if (expirationTime > 10) {
      await this.verifyCodeRepository.remove(verifyCode);
      throw new BadRequestException(Err.VERIFY_CODE.CODE_EXPIRED);
    }

    this.verifyCodeRepository.remove(verifyCode);
    return {isVerify: true};
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const existingUser = await this.userService.findUserByEmail(email);
    if (!existingUser) throw new BadRequestException(Err.USER.NOT_FOUND);

    const password = await bcrypt.compare(pass, existingUser.password);
    if (password) {
      const {password, ...result} = existingUser;
      return result;
    }
    return null;
  }

  async signup(signUpDto: SignUpDto): Promise<User> {
    const {email, password} = signUpDto;

    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }

    const user = new User();
    user.email = email;
    user.password = password;

    const savedUser = await this.userRepository.save(user);
    await this.createRefreshToken(savedUser.id);

    delete user.password;

    return user;
  }

  async login(id: number): Promise<LoginResponseDto> {
    const accessToken = await this.createAccessToken(id);
    const {refreshToken, tokenExp} = await this.createRefreshToken(id);
    return {accessToken, refreshToken, tokenExp};
  }

  async createAccessToken(id: number): Promise<string> {
    const payload: JwtPayload = {sub: id};
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth').accessTokenExp,
    });
    return accessToken;
  }

  async createRefreshToken(id: number): Promise<CreateRefershTokenResponseDto> {
    const payload: JwtPayload = {sub: id};
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth').refreshTokenExp,
    });

    const tokenVerify = await this.tokenValidate(refreshToken);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);
    await this.userRepository.update(id, {refreshToken});

    return {refreshToken, tokenExp};
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token);
  }

  async reissueRefreshToken(id: number): Promise<LoginResponseDto> {
    const existingUser = await this.userService.findUserById(id);
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }

    const token = existingUser.refreshToken;
    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);
    const weekRemaining = differenceInWeeks(tokenExp, new Date());

    if (weekRemaining < 2) {
      throw new BadRequestException(Err.TOKEN.REFRESH_TOKEN_NOT_REISSUED);
    }
    return await this.login(id);
  }
}

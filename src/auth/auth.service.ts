import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {VerifyCode} from './entities/verify-code.entity';
import {MailSender} from './mail-sender';
import {SendEmailDto, SendEmailResponseDto} from './dto/send-email.dto';
import {UserService} from './../user/user.service';
import {VerifyCodeDto, VerifyCodeResponseDto} from './dto/verify-code.dto';
import {Err} from '../common/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(VerifyCode)
    private readonly verifyCodeRepository: Repository<VerifyCode>,
    private readonly mailSender: MailSender,
    private readonly userService: UserService,
  ) {}

  async sendEmail({email}: SendEmailDto): Promise<SendEmailResponseDto> {
    const user = await this.userService.findOneByEmail(email);
    if (user) return {isUserExist: true, isSend: false};

    const verifyCode = await this.verifyCodeRepository.findOne({email});

    if (verifyCode) {
      await this.verifyCodeRepository.remove(verifyCode);
    }

    const generateCode = () => {
      return Math.floor(Math.random() * 1000000 - 1)
        .toString()
        .padStart(6, '0');
    };

    const newVerifyCode = this.verifyCodeRepository.create({
      code: generateCode(),
      email,
    });

    await this.verifyCodeRepository.save(newVerifyCode);

    try {
      await this.mailSender.send({
        to: email,
        subject: 'SoWooJu 메일 인증',
        text: `아래의 코드를 입력해 인증을 완료해 주세요. ${newVerifyCode.code} 이 번호는 10분간 유효합니다.`,
      });
    } catch (e) {
      this.verifyCodeRepository.remove(newVerifyCode);
      throw new InternalServerErrorException(Err.SERVER.NOT_SEND_MAIL_ERROR);
    }
    return {isSend: true, isUserExist: user !== undefined};
  }

  async verifyCode({email, code}: VerifyCodeDto): Promise<VerifyCodeResponseDto> {
    const verifyCode = await this.verifyCodeRepository.findOne({email, code});

    if (!verifyCode) return {email, isVerify: false, isCodeExpired: false};

    if (verifyCode.createdAt.getTime() + 600000 < new Date().getTime()) {
      await this.verifyCodeRepository.remove(verifyCode);
      return {email, isCodeExpired: true, isVerify: false};
    }

    this.verifyCodeRepository.remove(verifyCode);
    return {email, isVerify: true, isCodeExpired: false};
  }
}

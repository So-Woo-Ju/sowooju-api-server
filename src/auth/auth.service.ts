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
    if (user) {
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
}

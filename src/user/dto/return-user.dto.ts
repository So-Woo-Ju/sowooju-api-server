import {ApiProperty, OmitType} from '@nestjs/swagger';
import {IsDate, IsEmail, IsNumber, IsString} from 'class-validator';
import {Media} from 'src/media/entities/media.entity';
import {User} from '../entities/user.entity';

export class ReturnUserDto extends OmitType(User, ['password'] as const) {}

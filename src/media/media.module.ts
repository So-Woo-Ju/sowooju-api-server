import {Module} from '@nestjs/common';
import {MediaService} from './media.service';
import {MediaController} from './media.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './../user/user.module';

@Module({
  imports: [UserModule, ConfigModule, TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}

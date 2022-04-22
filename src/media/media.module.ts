import {Module} from '@nestjs/common';
import {MediaService} from './media.service';
import {MediaController} from './media.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './../user/user.module';
import {MediaSubscriber} from './media.subscriber';

@Module({
  imports: [UserModule, ConfigModule, TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService, MediaSubscriber],
})
export class MediaModule {}

import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Media} from './entities/media.entity';
import {createClient} from 'redis';
import {UserService} from './../user/user.service';
import {PUB_SUB_CHANNEL} from 'src/constants';

@Injectable()
export class MediaSubscriber implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly userService: UserService,
  ) {}

  onApplicationBootstrap() {
    // Bootstrap 단계에서 채널 subscribe on 설정
    this.subscribeMediaUrlMessage();
  }

  async subscribeMediaUrlMessage(): Promise<void> {
    const subscriber = createClient(this.configService.get('redis'));
    subscriber.subscribe(PUB_SUB_CHANNEL);
    subscriber.on('message', async (channel, message) => {
      const data = JSON.parse(message);
      const user = await this.userService.findUserById(data.userId);

      await this.mediaRepository.save({
        videoUrl: data.videoUrl,
        captionUrl: data.captionUrl,
        textUrl: data.textUrl,
        thumbnailUrl: data.thumbnailUrl,
        user,
      });
    });
  }
}

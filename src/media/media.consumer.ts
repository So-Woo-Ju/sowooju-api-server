import {Process, Processor} from '@nestjs/bull';
import {Logger} from '@nestjs/common';
import {Job} from 'bull';
import {InjectRepository} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';

@Processor('messageQueue')
export class MediaConsumer {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger(MediaConsumer.name);

  @Process('task')
  async getMessageQueue(job: Job) {
    this.logger.log(`${job.data}를 받았습니다.`);
    const data = job.data;
    const user = await this.userService.findUserById(data.userId);

    await this.mediaRepository.save({
      videoUrl: data.videoUrl,
      captionUrl: data.captionUrl,
      textUrl: data.textUrl,
      thumbnailUrl: data.thumbnailUrl,
      user,
    });
  }
}

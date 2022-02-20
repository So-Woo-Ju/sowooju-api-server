import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';
import {Err} from './../common/error';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async getPresignedUrl(contentType: string, bucketName: string, fileName: string) {
    const s3 = this.configService.get('s3');

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 3600,
      ContentType: contentType,
      ACL: 'public-read',
    };

    try {
      const s3Url = await s3.getSignedUrlPromise('putObject', params);
      return s3Url;
    } catch (error) {
      throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }

  async getVideoPresignedUrl(userId: number) {
    const existingUser = await this.userService.findUserById(userId);
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }

    const videoS3BucketName = this.configService.get('s3-bucket').videoS3BucketName;
    const contentType = 'mp4';
    const fileName = `video-${userId}.${contentType}`;
    const videoS3Url = await this.getPresignedUrl('mp4', videoS3BucketName, fileName);
    return videoS3Url;
  }

  async getCaptioPresignedUrl(userId: number) {
    const captionS3BucketName = this.configService.get('s3-bucket').captionS3BucketName;
    const contentType = '적절한 값으로 변경해야합니다.';
    const fileName = `caption-${userId}.${contentType}`;
    const captionS3Url = await this.getPresignedUrl(contentType, captionS3BucketName, fileName);

    return captionS3Url;
  }

  async getTextPresignedUrl(userId: number) {
    const textS3BucketName = this.configService.get('s3-bucket').textS3BucketName;
    const contentType = '적절한 값으로 변경해야합니다.';
    const fileName = `text-${userId}.${contentType}`;
    const textS3Url = await this.getPresignedUrl(contentType, textS3BucketName, fileName);
    return textS3Url;
  }

  async getThumbnailPresignedUrl(userId: number) {
    const thumbnailS3BucketName = this.configService.get('s3-bucket').thumbnailS3BucketName;
    const contentType = '적절한 값으로 변경해야합니다.';
    const fileName = `thumbnail-${userId}.${contentType}`;
    const thumbnailS3Url = await this.getPresignedUrl(contentType, thumbnailS3BucketName, fileName);
    return thumbnailS3Url;
  }

  findAll() {
    return `This action returns all media`;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}

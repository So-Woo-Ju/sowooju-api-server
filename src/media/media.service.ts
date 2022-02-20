import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';
import {Err} from './../common/error';
import format from 'date-fns/format';
import {VIDEO_CONTENT_TYPE, S3_ACL, S3_PRESIGNED_URL_EXPIRES} from './../constants';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async getPresignedUrl(
    contentType: string,
    bucketName: string,
    fileName: string,
  ): Promise<string> {
    const s3 = this.configService.get('s3');

    const params = {
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType,
      Expires: S3_PRESIGNED_URL_EXPIRES,
      ACL: S3_ACL,
    };

    try {
      return await s3.getSignedUrlPromise('putObject', params);
    } catch (error) {
      throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }

  async getVideoPresignedUrl(userId: number) {
    const existingUser = await this.userService.findUserById(userId);
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }

    const videoS3BucketName = await this.configService.get('s3-bucket').videoS3BucketName;
    const contentType = VIDEO_CONTENT_TYPE;
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${contentType}`;

    return {videoS3Url: this.getPresignedUrl(contentType, videoS3BucketName, fileName)};
  }

  async getCaptioPresignedUrl(userId: number) {
    const captionS3BucketName = this.configService.get('s3-bucket').captionS3BucketName;
    const contentType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${contentType}`;

    return {captionS3Url: this.getPresignedUrl(contentType, captionS3BucketName, fileName)};
  }

  async getTextPresignedUrl(userId: number) {
    const textS3BucketName = this.configService.get('s3-bucket').textS3BucketName;
    const contentType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${contentType}`;

    return {textS3Url: this.getPresignedUrl(contentType, textS3BucketName, fileName)};
  }

  async getThumbnailPresignedUrl(userId: number) {
    const thumbnailS3BucketName = this.configService.get('s3-bucket').thumbnailS3BucketName;
    const contentType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${contentType}`;

    return {
      thumbnailS3Url: this.getPresignedUrl(contentType, thumbnailS3BucketName, fileName),
    };
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

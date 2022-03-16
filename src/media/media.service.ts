import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {InjectRepository} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';
import {Err} from './../common/error';
import format from 'date-fns/format';
import {S3_ACL, S3_PRESIGNED_URL_EXPIRES, VIDEO_FILE_TYPE} from './../constants';
import {GetVideoPresignedUrlResponseDto} from './dto/get-video-presigned-url.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async getPresignedUrl(fileType: string, bucketName: string, fileName: string): Promise<string> {
    const s3 = this.configService.get('s3');

    const params = {
      Bucket: bucketName,
      Key: fileName,
      ContentType: fileType,
      Expires: S3_PRESIGNED_URL_EXPIRES,
      ACL: S3_ACL,
    };

    try {
      return await s3.getSignedUrlPromise('putObject', params);
    } catch (error) {
      throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }

  async getVideoPresignedUrl(userId: number): Promise<GetVideoPresignedUrlResponseDto> {
    const existingUser = await this.userService.findUserById(userId);
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }

    const videoS3BucketName = await this.configService.get('s3-bucket').videoS3BucketName;
    const fileType = VIDEO_FILE_TYPE;
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${fileType}`;

    return {videoS3Url: await this.getPresignedUrl(fileType, videoS3BucketName, fileName)};
  }

  async getCaptioPresignedUrl(userId: number) {
    const captionS3BucketName = this.configService.get('s3-bucket').captionS3BucketName;
    const fileType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${fileType}`;

    return {captionS3Url: this.getPresignedUrl(fileType, captionS3BucketName, fileName)};
  }

  async getTextPresignedUrl(userId: number) {
    const textS3BucketName = this.configService.get('s3-bucket').textS3BucketName;
    const fileType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${fileType}`;

    return {textS3Url: this.getPresignedUrl(fileType, textS3BucketName, fileName)};
  }

  async getThumbnailPresignedUrl(userId: number) {
    const thumbnailS3BucketName = this.configService.get('s3-bucket').thumbnailS3BucketName;
    const fileType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${fileType}`;

    return {
      thumbnailS3Url: this.getPresignedUrl(fileType, thumbnailS3BucketName, fileName),
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

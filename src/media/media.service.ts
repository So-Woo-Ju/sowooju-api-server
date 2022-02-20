import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {GetPresignedUrlDto} from './dto/get-presigned-url.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Media} from './entities/media.entity';
import {Repository} from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async getPresignedUrl(userId: number, contentType: string, bucketName: string) {
    const s3 = this.configService.get('s3');

    const filetype = contentType.split('/')[1];
    const fileName = `${userId}.${filetype}`;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 3600,
      ContentType: contentType,
      ACL: 'public-read',
    };
    const s3Url = await s3.getSignedUrlPromise('putObject', params);

    return s3Url;
  }

  async getVideoPresignedUrl(userId: number, getPresignedUrlDto: GetPresignedUrlDto) {
    /*
    TODO content type이 video type과 맞지 않는 경우 에러 핸들링
    */

    const videoS3BucketName = this.configService.get('s3-bucket').videoS3BucketName;
    const videoS3Url = await this.getPresignedUrl(
      userId,
      getPresignedUrlDto.contentType,
      videoS3BucketName,
    );
    return videoS3Url;
  }

  async getCaptioPresignedUrl(userId: number, getPresignedUrlDto: GetPresignedUrlDto) {
    /*
    TODO content type이 caption type과 맞지 않는 경우 에러 핸들링
    */

    const captionS3BucketName = this.configService.get('s3-bucket').captionS3BucketName;
    const captionS3Url = await this.getPresignedUrl(
      userId,
      getPresignedUrlDto.contentType,
      captionS3BucketName,
    );
    return captionS3Url;
  }

  async getTextPresignedUrl(userId: number, getPresignedUrlDto: GetPresignedUrlDto) {
    /*
    TODO content type이 text type과 맞지 않는 경우 에러 핸들링
    */

    const textS3BucketName = this.configService.get('s3-bucket').textS3BucketName;
    const textS3Url = await this.getPresignedUrl(
      userId,
      getPresignedUrlDto.contentType,
      textS3BucketName,
    );
    return textS3Url;
  }

  async getThumbnailPresignedUrl(userId: number, getPresignedUrlDto: GetPresignedUrlDto) {
    /*
    TODO content type이 thumbnail type과 맞지 않는 경우 에러 핸들링
    */

    const thumbnailS3BucketName = this.configService.get('s3-bucket').thumbnailS3BucketName;
    const thumbnailS3Url = await this.getPresignedUrl(
      userId,
      getPresignedUrlDto.contentType,
      thumbnailS3BucketName,
    );
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

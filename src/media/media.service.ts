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
import {getMyMediasResponseDto} from './dto/get-my-medias.dto';
import {SaveS3UrlResponseDto} from './dto/save-s3-url.dto';

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

  async getThumbnailPresignedUrl(userId: number) {
    const thumbnailS3BucketName = this.configService.get('s3-bucket').thumbnailS3BucketName;
    const fileType = '적절한 값으로 변경해야합니다.';
    const date = format(new Date(), 'yyyyMMddmmss');
    const fileName = `${userId}-${date}.${fileType}`;

    return {
      thumbnailS3Url: this.getPresignedUrl(fileType, thumbnailS3BucketName, fileName),
    };
  }

  async getMyMedias(userId: number): Promise<getMyMediasResponseDto> {
    const existingUser = await this.userService.findUserById(userId);
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }

    return {medias: await this.mediaRepository.find({user: existingUser})};
  }

  async saveMediaS3Url(saveS3UrlResponseDto: SaveS3UrlResponseDto): Promise<string> {
    const existingUser = await this.userService.findUserById(saveS3UrlResponseDto.userId);
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    try {
      await this.mediaRepository.save({
        videoUrl: saveS3UrlResponseDto.videoUrl,
        captionUrl: saveS3UrlResponseDto.captionUrl,
        textUrl: saveS3UrlResponseDto.textUrl,
        thumbnailUrl: saveS3UrlResponseDto.thumbnailUrl,
        existingUser,
      });
      return 'url 저장이 완료되었습니다.';
    } catch (error) {
      throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }
}

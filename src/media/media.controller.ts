import {Controller, Get, UseGuards, Post, Req, Body} from '@nestjs/common';
import {MediaService} from './media.service';
import {JwtAuthGuard} from 'src/common/guard/jwt-auth.guard';
import {AuthUser} from 'src/common/decorators/user.decorator';
import {JwtUser} from 'src/common/types';
import {docs} from './media.docs';
import {ApiExcludeEndpoint, ApiTags} from '@nestjs/swagger';
import {LambdaGuard} from './../common/guard/lambda.guard';
import {GetVideoResultDto} from './dto/get-video-result.dto';
import {SaveS3UrlResponseDto} from './dto/save-s3-url.dto';

@Controller('media')
@ApiTags('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('result')
  @docs.getVideoResult('사용자 업로드 비디오 결과 반환')
  getVideoResult(@AuthUser() user: JwtUser, @Body() getVideoResultDto: GetVideoResultDto) {
    return this.mediaService.getVideoResult(user.id, getVideoResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('video/presigned-url')
  @docs.getVideoPresignedUrl('Presigned URL 발급')
  getVideoPresignedUrl(@AuthUser() user: JwtUser) {
    return this.mediaService.getVideoPresignedUrl(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @docs.getMyMedias('사용자 미디어 정보 조회')
  getMyMedias(@AuthUser() user: JwtUser) {
    return this.mediaService.getMyMedias(user.id);
  }

  @Post('s3-url')
  @ApiExcludeEndpoint(true)
  saveMediaS3Url(@Body() saveS3UrlResponseDto: SaveS3UrlResponseDto) {
    return this.mediaService.saveMediaS3Url(saveS3UrlResponseDto);
  }
}

import {Controller, Get, UseGuards} from '@nestjs/common';
import {MediaService} from './media.service';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {AuthUser} from 'src/common/decorators/user.decorator';
import {JwtUser} from 'src/common/types';
import {docs} from './media.docs';
import {ApiTags} from '@nestjs/swagger';

@Controller('media')
@ApiTags('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

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
}

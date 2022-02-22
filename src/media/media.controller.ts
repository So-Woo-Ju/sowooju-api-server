import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {MediaService} from './media.service';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {AuthUser} from 'src/common/decorators/user.decorator';
import {JwtUser} from 'src/common/types';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('video/presigned-url')
  getVideoPresignedUrl(@AuthUser() user: JwtUser) {
    return this.mediaService.getVideoPresignedUrl(user.id);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}

import {applyDecorators} from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiOkResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import {SwaggerMethodDoc} from 'src/common/types';
import {getMyMediasResponseBodyDto} from './dto/get-my-medias.dto';
import {GetVideoPresignedUrlResponseBodyDto} from './dto/get-video-presigned-url.dto';
import {GetVideoResultResponseBodyDto} from './dto/get-video-result.dto';
import {MediaController} from './media.controller';

export const docs: SwaggerMethodDoc<MediaController> = {
  getVideoResult(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: '사용자가 업로드한 영상의 자막 결과를 반환하고 미디어 정보를 저장합니다.',
      }),
      ApiOkResponse({
        type: GetVideoResultResponseBodyDto,
      }),
      ApiResponse({status: 400, description: '존재하지 않는 사용자입니다.'}),
      ApiResponse({status: 500, description: '유효하지 않은 정보입니다.'}),
    );
  },
  getVideoPresignedUrl(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description: 'Presigned URL 발급합니다.',
      }),
      ApiOkResponse({
        type: GetVideoPresignedUrlResponseBodyDto,
      }),
      ApiResponse({status: 400, description: '존재하지 않는 사용자입니다.'}),
      ApiResponse({
        status: 401,
        description:
          '1. 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
    );
  },
  getMyMedias(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
        description:
          '사용자의 모든 미디어 정보 조회를 조회합니다. \t\n VideoType [LOCAL : 로컬에서 업로드 , YOUTUBE : 유튜브에서 업로드] \t\n VideoLanguage [KOR : 한국어 자막, ENG : 영어 자막]',
      }),
      ApiOkResponse({
        type: getMyMediasResponseBodyDto,
      }),
      ApiResponse({status: 400, description: '존재하지 않는 사용자입니다.'}),
      ApiResponse({
        status: 401,
        description:
          '1. 토큰이 전송되지 않았습니다. \t\n 2. 유효하지 않은 토큰입니다. \t\n 3. 토큰이 만료되었습니다.',
      }),
    );
  },
  saveMediaS3Url(summary: string) {
    return applyDecorators(ApiExcludeEndpoint());
  },
};

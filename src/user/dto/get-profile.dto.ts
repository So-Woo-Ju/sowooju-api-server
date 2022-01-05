import {BaseResponseDto} from './../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {User} from 'src/user/entities/user.entity';

export class GetProfileResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: User;
}

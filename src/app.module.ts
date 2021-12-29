import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import ormconfig from '../ormconfig';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './user/user.module';
import {MediaModule} from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

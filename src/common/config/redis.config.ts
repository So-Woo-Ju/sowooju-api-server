import {registerAs} from '@nestjs/config';
import {ClientOpts} from 'redis';

export default registerAs('redis', async (): Promise<ClientOpts> => {
  return {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  };
});

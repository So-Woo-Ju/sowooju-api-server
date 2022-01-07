import {registerAs} from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    secret: process.env.JWT_SECRET_KEY,
    accessTokenExp: '15m',
    refreshTokenExp: '30d',
  };
});

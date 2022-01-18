import {registerAs} from '@nestjs/config';

export default registerAs('google', () => {
  return {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    ip: process.env.IP || 'http://localhost:3000',
  };
});

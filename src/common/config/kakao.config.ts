import {registerAs} from '@nestjs/config';

export default registerAs('kakao', () => {
  return {
    kakaoKey: process.env.KAKAO_KEY,
    ip: process.env.IP || 'http://localhost:3000',
  };
});

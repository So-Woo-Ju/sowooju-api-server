import {registerAs} from '@nestjs/config';

export default registerAs('lambda', () => {
  return {
    ipAddress: process.env.LAMBDA_IP_ADDRESS,
    port: process.env.LAMBDA_PORT,
  };
});

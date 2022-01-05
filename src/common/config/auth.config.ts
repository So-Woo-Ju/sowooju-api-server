import {registerAs} from '@nestjs/config';
import {JwtModuleOptions} from '@nestjs/jwt';

export type AuthConfig = JwtModuleOptions;

export default registerAs('auth', async (): Promise<AuthConfig> => {
  return {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {expiresIn: '900s'},
  };
});

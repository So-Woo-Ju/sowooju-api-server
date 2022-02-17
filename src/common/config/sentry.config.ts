import {registerAs} from '@nestjs/config';

export default registerAs('sentry', () => {
  return {
    webhook: process.env.WEB_HOOK,
    dsn: process.env.SENTRY_DSN,
  };
});
import {registerAs} from '@nestjs/config';
import {config, S3} from 'aws-sdk';
import {AWS_S3} from './../../constants';

export default registerAs(AWS_S3, async (): Promise<AWS.S3> => {
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'ap-northeast-2',
  });
  return new S3({useAccelerateEndpoint: true});
});

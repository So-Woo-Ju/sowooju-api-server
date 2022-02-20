import {registerAs} from '@nestjs/config';
import * as AWS from 'aws-sdk';

export default registerAs('s3', async () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  return new AWS.S3({useAccelerateEndpoint: true});
});
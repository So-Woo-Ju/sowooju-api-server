import {registerAs} from '@nestjs/config';

export default registerAs('s3-bucket', async () => {
  return {
    mediaS3BucketName: process.env.Media_S3_BUCKET_NAME,
    thumbnailS3BucketName: process.env.Thumbnail_S3_BUCKET_NAME,
    captionS3BucketName: process.env.Caption_S3_BUCKET_NAME,
  };
});

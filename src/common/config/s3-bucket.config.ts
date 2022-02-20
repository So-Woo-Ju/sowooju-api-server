import {registerAs} from '@nestjs/config';

export default registerAs('s3-bucket', async () => {
  return {
    videoS3BucketName: process.env.VIDEO_S3_BUCKET_NAME,
    thumbnailS3BucketName: process.env.THUMBNAIL_S3_BUCKET_NAME,
    captionS3BucketName: process.env.CAPTION_S3_BUCKET_NAME,
    textS3BucketName: process.env.TEXT_S3_BUCKET_NAME,
  };
});

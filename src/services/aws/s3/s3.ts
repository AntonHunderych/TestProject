import { IFileManager } from '../../../types/services/fileManager';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export function getFileManagerS3(): IFileManager {
  const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const bucket = process.env.AWS_S3_BUCKET_NAME!;

  return {
    async deleteFile(fileName: string): Promise<void> {
      const command = new DeleteObjectCommand({ Bucket: bucket, Key: fileName });
      await s3.send(command);
    },
    async getDownloadFileUrl(fileName: string): Promise<string> {
      const command = new GetObjectCommand({ Bucket: bucket, Key: fileName });
      return getSignedUrl(s3, command, { expiresIn: 60 * 5 });
    },
    async getUpLoadFileUrl(fileName: string, fileType: string): Promise<string> {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        ContentType: fileType,
      });

      return getSignedUrl(s3, command, { expiresIn: 60 * 5 });
    },
  };
}

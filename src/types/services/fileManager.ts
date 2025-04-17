import { EContentType } from '../enum/EFileTypes';

export interface IFileManager {
  getUploadFileUrl(fileName: string, fileType: EContentType): Promise<string>;
  getDownloadFileUrl(fileName: string): Promise<string>;
  deleteFile(fileName: string): Promise<void>;
  uploadFile(fileName: string, fileType: EContentType, file: Buffer): Promise<void>;
}

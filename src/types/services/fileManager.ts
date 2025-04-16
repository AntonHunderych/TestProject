import { EContentType } from '../enum/EFileTypes';

export interface IFileManager {
  getUpLoadFileUrl(fileName: string, fileType: EContentType): Promise<string>;
  getDownloadFileUrl(fileName: string): Promise<string>;
  deleteFile(fileName: string): Promise<void>;
}

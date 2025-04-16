import { IFileManager } from '../../../types/services/fileManager';
import { IWorkSpaceFile } from '../../../repos/workspace/files/workSpaceFile.repo';

export async function getDownloadUrl(
  fileManager: IFileManager,
  workSpaceFileRepo: IWorkSpaceFile,
  fileName: string,
  workSpaceId: string,
): Promise<string> {
  const file = await workSpaceFileRepo.getFile(fileName, workSpaceId);
  return await fileManager.getDownloadFileUrl(file.id);
}

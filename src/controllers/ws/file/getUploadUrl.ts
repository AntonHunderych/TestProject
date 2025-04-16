import { IFileManager } from '../../../types/services/fileManager';
import { IWorkSpaceFile } from '../../../repos/workspace/files/workSpaceFile.repo';
import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';
import { EContentType } from '../../../types/enum/EFileTypes';

export async function getUploadUrl(
  withTransaction: IWithTransaction,
  fileManager: IFileManager,
  workSpaceFileRepo: IWorkSpaceFile,
  fileName: string,
  fileType: EContentType,
  workSpaceId: string,
): Promise<string> {
  return await withTransaction(
    {
      workSpaceFileRepo,
    },
    async (repos) => {
      const file = await repos.workSpaceFileRepo.createFile(fileName, fileType, workSpaceId);
      return await fileManager.getUpLoadFileUrl(file.id, fileType);
    },
  );
}

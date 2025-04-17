import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';
import { IFileManager } from '../../../types/services/fileManager';
import { IWorkSpaceFile } from '../../../repos/workspace/files/workSpaceFile.repo';
import { EContentType } from '../../../types/enum/EFileTypes';

export async function uploadFile(
  withTransaction: IWithTransaction,
  fileManager: IFileManager,
  workSpaceFileRepo: IWorkSpaceFile,
  fileName: string,
  fileType: EContentType,
  file: Buffer,
  workSpaceId: string,
) {
  return await withTransaction(
    {
      workSpaceFileRepo,
    },
    async (repos) => {
      const fileDb = await repos.workSpaceFileRepo.createFile(fileName, fileType, workSpaceId);
      return await fileManager.uploadFile(fileDb.id, fileType, file);
    },
  );
}

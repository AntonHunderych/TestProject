import { IWithTransaction } from '../../../services/withTransaction/IWithTransaction';
import { IFileManager } from '../../../types/services/fileManager';
import { IWorkSpaceFile } from '../../../repos/workspace/files/workSpaceFile.repo';

export async function deleteFile(
  withTransaction: IWithTransaction,
  fileManager: IFileManager,
  workSpaceFileRepo: IWorkSpaceFile,
  fileName: string,
  workSpaceId: string,
): Promise<void> {
  return await withTransaction(
    {
      workSpaceFileRepo,
    },
    async (repos) => {
      const file = await repos.workSpaceFileRepo.deleteFile(fileName, workSpaceId);
      await fileManager.deleteFile(file.id);
    },
  );
}

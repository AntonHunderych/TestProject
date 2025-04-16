import { IWorkSpaceFile } from '../../../repos/workspace/files/workSpaceFile.repo';

export async function uploadComplete(
  workSpaceFileRepo: IWorkSpaceFile,
  fileName: string,
  workSpaceId: string,
  complete: boolean,
) {
  if (!complete) {
    await workSpaceFileRepo.deleteFile(fileName, workSpaceId);
  } else {
    await workSpaceFileRepo.uploadComplete(fileName, workSpaceId);
  }
}

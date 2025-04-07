import { IWorkSpaceRepo } from '../../repos/workspace/workspace.repo';
import { WorkSpace } from '../../types/entities/WorkSpace/WorkSpaceSchema';

export async function createWorkSpace(workSpaceRepo: IWorkSpaceRepo, data: Omit<WorkSpace, 'id'>): Promise<WorkSpace> {
  return await workSpaceRepo.createWorkSpace(data);
}

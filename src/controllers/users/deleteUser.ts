import { IUserRepo } from '../../repos/users/users.repo';

export default async function deleteUser(rep: IUserRepo, id: string): Promise<boolean> {
  try {
    return await rep.deleteUser(id);
  } catch (e) {
    throw Error('Error in deleting user');
  }
}

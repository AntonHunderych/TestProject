import { IUsersRepos } from '../../repos/users/users.repo';

export default async function deleteUserHandler(rep: IUsersRepos, id: string): Promise<boolean> {
  try {
    return await rep.deleteUser(id);
  } catch (e) {
    console.log(e);
    return false;
  }
}

import { IUsersRepos } from '../../repos/users/users.repos';

export default async function deleteUserHandler(rep: IUsersRepos, id: string): Promise<boolean> {
  try {
    return await rep.deleteUser(id);
  } catch (e) {
    console.log(e);
    return false;
  }
}

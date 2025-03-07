import { IUsersRepos } from '../../repos/users/users.repos';
import { User, UserSchema } from '../../db/schemas/UserSchema';

export default async function getAllUsersHandler(rep: IUsersRepos): Promise<User[]> {
  try {
    const users = await rep.getAllUsers();
    return users.map((user) => UserSchema.parse(user));
  } catch (e) {
    console.log(e);
    return [];
  }
}

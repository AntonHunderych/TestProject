import { IUsersRepos } from '../../repos/users/users.repo';
import { User, UserSchema } from '../../db/schemas/UserSchema';

export default async function updateUserHandler(rep: IUsersRepos, id: string, data: Partial<User>): Promise<User> {
  try {
    return UserSchema.parse(await rep.updateUser(id, data));
  } catch (e) {
    console.log(e);
    return {
      id: '',
      username: '',
      email: '',
      password: '',
      salt: '',
    };
  }
}

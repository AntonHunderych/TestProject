import { User, UserSchema } from '../../db/schemas/UserSchema';
import { IUsersRepos } from '../../repos/users/users.repo';

export default async function getUserByIdHandler(rep: IUsersRepos, id: string): Promise<User> {
  try {
    const user = await rep.getUserById(id);
    console.log(user);
    if (!user) {
      console.error('User not found');
      return {
        id: '',
        username: '',
        email: '',
        password: '',
        salt: '',
      };
    }

    return UserSchema.parse(user);
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

import { IUsersRepos } from '../../repos/users/users.repos';
import { UserSchema } from '../../db/schemas/UserSchema';
import { IUserRoleRepo } from '../../repos/user-role/getUserRoleRepo';
import z from 'zod';

interface ICreateUser {
  username: string;
  email: string;
  password: string;
  salt: string;
}

const UserControllerRespSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
});

type IUserControllerResp = z.infer<typeof UserControllerRespSchema>;

export default async function createUserHandler(
  rep: IUsersRepos,
  userRoleRepo: IUserRoleRepo,
  date: ICreateUser,
): Promise<IUserControllerResp> {
  try {
    const user = UserSchema.parse(await rep.createUser(date));
    await userRoleRepo.giveRoleToUser(user.id, 'USER');
    return UserControllerRespSchema.parse(await rep.getUserById(user.id));
  } catch (e) {
    console.log(e);
    return {
      id: '',
      username: '',
      email: '',
    };
  }
}

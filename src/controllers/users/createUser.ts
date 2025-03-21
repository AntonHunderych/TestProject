import { IUsersRepos } from '../../repos/users/users.repo';
import { UserSchema } from '../../db/schemas/UserSchema';
import { IUserRoleRepo } from '../../repos/user-role/user-role.repo';
import z from 'zod';
import { RoleEnum } from '../../types/Enum/RoleEnum';

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

export type IUserControllerResp = z.infer<typeof UserControllerRespSchema>;

export default async function createUserHandler(
  rep: IUsersRepos,
  userRoleRepo: IUserRoleRepo,
  date: ICreateUser,
): Promise<IUserControllerResp> {
  try {
    const user = UserSchema.parse(await rep.createUser(date));
    await userRoleRepo.giveRoleToUser(user.id, RoleEnum.USER);
    return UserControllerRespSchema.parse(await rep.getUserById(user.id));
  } catch (e) {
    throw Error("Shoto pishlo ne tak");
  }
}

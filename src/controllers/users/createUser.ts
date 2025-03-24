import { IUsersRepos } from '../../repos/users/users.repo';
import { IUserRoleRepo } from '../../repos/userRole/userRole.repo';
import z from 'zod';
import { RoleEnum } from '../../types/Enum/RoleEnum';
import { withTransaction } from '../../db/withTransaction';

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
  userRepo: IUsersRepos,
  userRoleRepo: IUserRoleRepo,
  date: ICreateUser,
): Promise<IUserControllerResp> {
  try {
    return await withTransaction(
      {userRepo, userRoleRepo},
      async (repos) => {
        const user = await repos.userRepo.createUser(date);
        await repos.userRoleRepo.giveRoleToUser(user.id, RoleEnum.USER);
        return UserControllerRespSchema.parse(await repos.userRepo.getUserById(user.id));
      }
    )
  } catch (error) {
    throw Error("Creating user error")
  }
}

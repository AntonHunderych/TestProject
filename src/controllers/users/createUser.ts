import {IUsersRepos} from "../../repos/users/users.repos";
import {UserSchema} from "../../db/schemas/UserSchema";
import {IUserRoleRepo} from "../../repos/user-role/getUserRoleRepo";

interface ICreateUser{
    username: string,
    email: string,
    password: string,
}

interface IUserControllerResp{
    id: string,
    username: string,
}

export default async function createUserHandler(rep : IUsersRepos, userRoleRepo: IUserRoleRepo, date:ICreateUser ): Promise<IUserControllerResp>{
    try {
        const user = UserSchema.parse(await rep.createUser(date))
        await userRoleRepo.giveRoleToUser(user.id, "USER")
        return UserSchema.parse(
            await rep.getUserById(user.id)
        )
    } catch (e){
        console.log(e)
        return {
            id:"",
            username:""
        }
    }
}
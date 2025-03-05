import {IUsersRepos} from "../../repos/users/users.repos";
import {UserSchema} from "../../db/schemas/UserSchema";

interface ICreateUser{
    username: string,
    email: string,
    password: string,
}

interface IUserControllerResp{
    id: string,
    username: string,
}

export default async function createUserHandler(rep : IUsersRepos, date:ICreateUser ): Promise<IUserControllerResp>{
    try {
        return UserSchema.parse(await rep.createUser(date))
    } catch (e){
        console.log(e)
        return {
            id:"",
            username:""
        } //tmp
    }
}
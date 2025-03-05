import {DataSource} from "typeorm";
import {getUserRepos} from "./users/users.repos";


export default function getRepos(db: DataSource){
    return{
        userRepo: getUserRepos(db)
    }
}

export type IRepos = ReturnType<typeof getRepos>
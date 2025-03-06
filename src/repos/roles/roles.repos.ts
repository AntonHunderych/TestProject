import {DataSource} from "typeorm";
import {Role} from "../../db/entities/RoleEntity";


export interface IRolesRepo {
    getRoleByValue(value : string): Promise<Role>;
    addRole(role: {
                value: string;
                description?: string
            }): Promise<Role>;
    getAllRoles(): Promise<Role[]>;
    deleteRole(id: string): Promise<boolean>;
}


export default function getRolesRepo(db: DataSource): IRolesRepo {

    const roleRepo = db.getRepository(Role);

    return {
        getRoleByValue: async (value: string): Promise<Role> => {
            return roleRepo.findOneOrFail({where: {value: value}})
        },
        addRole: async (role: {
            value: string,
            description?: string,
        }): Promise<Role> => {
            return roleRepo.save(role)
        },
        getAllRoles: async (): Promise<Role[]> => {
            return roleRepo.find({
                relations: ["users"]
            })
        },
        deleteRole: async (id: string): Promise<boolean> => {
            const role = await roleRepo.findOne({where: {id}});
            if (!role) return false;

            await roleRepo.remove(role);
            return true;
        }
    }
}
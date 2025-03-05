import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "./entities/UserEntity";

export const pgDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'mydb',
    synchronize: true, // ⚠️ У продакшені вимкніть (false) і використовуйте міграції!
    logging: true,
    entities: [User],
});

export const initDB = async () : Promise<DataSource> => {
    return await pgDataSource.initialize();
}
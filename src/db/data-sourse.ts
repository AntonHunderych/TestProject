import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/UserEntity';
import { Role } from './entities/RoleEntity';

export const pgDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'mydb',
  synchronize: true, // ⚠️ У продакшені вимкніть (false) і використовуйте міграції!
  //dropSchema: true,
  logging: true,
  entities: [User, Role],
});

export const initDB = async (): Promise<DataSource> => {
  return await pgDataSource.initialize();
};

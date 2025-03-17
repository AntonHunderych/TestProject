import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/UserEntity';
import { Role } from './entities/RoleEntity';
import { Todo } from './entities/TodoEntity';
import { Comment } from './entities/CommentEntity';
import { WorkSpace } from './entities/WorkSpaceEntity';
import { WorkSpaceTodo } from './entities/WorkSpaceTodo';
import { WorkSpaceUser } from './entities/WorkSpaceUser';
import { WorkSpaceRoles } from './entities/WorkSpaceRoles';
import { WorkSpacePermissions } from './entities/WorkSpacePermissions';
import { WorkSpaceComment } from './entities/WorkSpaceComment';
import dotenv from 'dotenv';

dotenv.config();

export const pgDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  //dropSchema: true,
  logging: true,
  entities: [User, Role, Todo, Comment, WorkSpace, WorkSpaceTodo, WorkSpaceUser,WorkSpaceRoles, WorkSpacePermissions, WorkSpaceComment],
});

export const initDB = async (): Promise<DataSource> => {
  return await pgDataSource.initialize();
};

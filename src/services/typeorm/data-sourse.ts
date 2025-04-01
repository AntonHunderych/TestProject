import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/UserEntity';
import { RoleEntity } from './entities/RoleEntity';
import { TodoEntity } from './entities/TodoEntity';
import { CommentEntity } from './entities/CommentEntity';
import { WorkSpaceEntity } from './entities/WorkSpace/WorkSpaceEntity';
import { WorkSpaceTodoEntity } from './entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './entities/WorkSpace/WorkSpaceUserEntity';
import { WorkSpaceRolesEntity } from './entities/WorkSpace/WorkSpaceRolesEntity';
import { WorkSpacePermissionsEntity } from './entities/WorkSpace/WorkSpacePermissionsEntity';
import { WorkSpaceCommentEntity } from './entities/WorkSpace/WorkSpaceCommentEntity';
import dotenv from 'dotenv';
import { TagEntity } from './entities/TagEntity';
import { WorkSpaceTagEntity, WorkSpaceTagTodo } from './entities/WorkSpace/WorkSpaceTagEntity';
import { CategoryEntity } from './entities/CategoryEntity';
import { WorkSpaceCategoryEntity, WorkSpaceCategoryConf } from './entities/WorkSpace/WorkSpaceCategoryEntity';
import { WorkSpaceCommandEntity } from './entities/WorkSpace/WorkSpaceCommandEntity';
import { TokenEntity } from './entities/TokenEntity';
import { UserRoleEntity } from './entities/UserRoleEntity';
import { TodoTagEntity } from './entities/TodoTagEntity';

dotenv.config();

export function getDataSource() {
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    //dropSchema: true,
    logging: true,
    entities: [
      UserEntity,
      RoleEntity,
      TodoEntity,
      CommentEntity,
      TagEntity,
      CategoryEntity,
      TokenEntity,
      UserRoleEntity,
      TodoTagEntity,
      WorkSpaceEntity,
      WorkSpaceTodoEntity,
      WorkSpaceUserEntity,
      WorkSpaceRolesEntity,
      WorkSpacePermissionsEntity,
      WorkSpaceCommentEntity,
      WorkSpaceTagEntity,
      WorkSpaceTagTodo,
      WorkSpaceCategoryEntity,
      WorkSpaceCategoryConf,
      WorkSpaceCommandEntity,
    ],
    migrations: ['./migrations/*.ts'],
  });
}

export const pgDataSource = getDataSource();

export const initDB = async (): Promise<DataSource> => {
  return await pgDataSource.initialize();
};

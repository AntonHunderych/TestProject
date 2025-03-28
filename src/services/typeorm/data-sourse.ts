import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/UserEntity';
import { Role } from './entities/RoleEntity';
import { Todo } from './entities/TodoEntity';
import { Comment } from './entities/CommentEntity';
import { WorkSpace } from './entities/WorkSpace/WorkSpaceEntity';
import { WorkSpaceTodo } from './entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceUser } from './entities/WorkSpace/WorkSpaceUserEntity';
import { WorkSpaceRoles } from './entities/WorkSpace/WorkSpaceRolesEntity';
import { WorkSpacePermissions } from './entities/WorkSpace/WorkSpacePermissionsEntity';
import { WorkSpaceComment } from './entities/WorkSpace/WorkSpaceCommentEntity';
import dotenv from 'dotenv';
import { Tag } from './entities/TagEntity';
import { WorkSpaceTag, WorkSpaceTagTodo } from './entities/WorkSpace/WorkSpaceTagEntity';
import { Category } from './entities/CategoryEntity';
import { WorkSpaceCategory, WorkSpaceCategoryConf } from './entities/WorkSpace/WorkSpaceCategoryEntity';
import { WorkSpaceCommand } from './entities/WorkSpace/WorkSpaceCommandEntity';
import { Token } from './entities/TokenEntity';
import { UserRole } from './entities/UserRoleEntity';
import { TodoTag } from './entities/TodoTagEntity';

dotenv.config();

export function getDataSource() {
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    //dropSchema: true,
    logging: true,
    entities: [
      User,
      Role,
      Todo,
      Comment,
      Tag,
      Category,
      Token,
      UserRole,
      TodoTag,
      WorkSpace,
      WorkSpaceTodo,
      WorkSpaceUser,
      WorkSpaceRoles,
      WorkSpacePermissions,
      WorkSpaceComment,
      WorkSpaceTag,
      WorkSpaceTagTodo,
      WorkSpaceCategory,
      WorkSpaceCategoryConf,
      WorkSpaceCommand,
    ],
    migrations: ['./migrations/*.ts'],
  });
}

export const pgDataSource = getDataSource();

export const initDB = async (): Promise<DataSource> => {
  return await pgDataSource.initialize();
};

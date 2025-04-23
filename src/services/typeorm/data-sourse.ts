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
import { WorkSpaceTagEntity } from './entities/WorkSpace/WorkSpaceTagEntity';
import { CategoryEntity } from './entities/CategoryEntity';
import { WorkSpaceCategoryEntity } from './entities/WorkSpace/WorkSpaceCategoryEntity';
import { WorkSpaceCommandEntity } from './entities/WorkSpace/WorkSpaceCommandEntity';
import { TokenEntity } from './entities/TokenEntity';
import { UserRoleEntity } from './entities/UserRoleEntity';
import { TodoTagEntity } from './entities/TodoTagEntity';
import { WorkSpaceTagTodoEntity } from './entities/WorkSpace/WorkSpaceTagTodoEntity';
import { WorkSpaceContributorEntity } from './entities/WorkSpace/WorkSpaceContributorEntity';
import { WorkSpaceRolePermissionEntity } from './entities/WorkSpace/WorkSpaceRolePermissionEntity';
import { WorkSpaceUserRoleEntity } from './entities/WorkSpace/WorkSpaceUserRoleEntity';
import { WorkSpaceUserCommandEntity } from './entities/WorkSpace/WorkSpaceUserCommandEntity';
import { WorkSpaceInviteLinkEntity } from './entities/WorkSpace/WorkSpaceInviteLinkEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from './entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';
import { WorkSpaceGoogleCalendarEventEntity } from './entities/WorkSpace/WorkSpaceGoogleCalendarEventEntity';
import { WorkSpaceFileEntity } from './entities/WorkSpace/WorkSpaceFileEntity';
import { PaymentHistoryEntity } from './entities/PaymentHistoryEntity';
import { PaymentErrorEntity } from './entities/PaymentErrorEntity';
import { PaymentProductsEntity } from './entities/PaymentProducts';
import { PaymentStripeProductEntity } from './entities/PaymentStripeProduct';
import { UserLimitsEntity } from './entities/UserLimitsEntity';
import { LimitsChangeEntity } from './entities/LimitsChangeEntity';

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
      WorkSpaceTagTodoEntity,
      WorkSpaceCategoryEntity,
      WorkSpaceCommandEntity,
      WorkSpaceContributorEntity,
      WorkSpaceRolePermissionEntity,
      WorkSpaceUserRoleEntity,
      WorkSpaceUserCommandEntity,
      WorkSpaceInviteLinkEntity,
      WorkSpaceGoogleCalendarTokenEntity,
      WorkSpaceGoogleCalendarEventEntity,
      WorkSpaceFileEntity,
      PaymentHistoryEntity,
      PaymentErrorEntity,
      PaymentProductsEntity,
      PaymentStripeProductEntity,
      UserLimitsEntity,
      LimitsChangeEntity,
    ],
    migrations: ['./migrations/*.ts'],
  });
}

export const pgDataSource = getDataSource();

export const initDB = async (): Promise<DataSource> => {
  return await pgDataSource.initialize();
};

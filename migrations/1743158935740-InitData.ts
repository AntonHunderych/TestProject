import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitData1743071441879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "workSpacePermissions" (value)
            VALUES 
            ('createTodo'),
            ('deleteTodo'),
            ('changeTodo'),
            ('addPerformersTodo'),
            ('removePerformersTodo'),
            ('deleteWorkSpace'),
            ('changeWorkSpace'),
            ('addUserToWorkSpace'),
            ('deleteUserFromWorkSpace'),
            ('writeComment'),
            ('changeComment'),
            ('deleteComment'),
            ('createRole'),
            ('deleteRole'),
            ('updateRole'),
            ('assignRole'),
            ('revokeRole'),
            ('createTag'),
            ('deleteTag'),
            ('changeTag'),
            ('createCategory'),
            ('deleteCategory'),
            ('changeCategory'),
            ('attachFile'),
            ('deleteFile'),
            ('updateFile'),
            ('manageNotifications'),
            ('changeSettings');
    `);
    await queryRunner.query(`
            INSERT INTO "role" (value, description)
            VALUES 
            ('USER', 'Звичайний користувач з базовими правами'),
            ('ADMIN', 'Адміністратор з повним доступом');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "workSpacePermissions"
            WHERE value IN (
                'createTodo', 'deleteTodo', 'changeTodo', 'addPerformersTodo',
                'removePerformersTodo', 'deleteWorkSpace', 'changeWorkSpace',
                'addUserToWorkSpace', 'deleteUserFromWorkSpace', 'writeComment',
                'changeComment', 'deleteComment', 'createRole', 'deleteRole',
                'updateRole', 'assignRole', 'revokeRole', 'createTag', 'deleteTag',
                'changeTag', 'createCategory', 'deleteCategory', 'changeCategory',
                'attachFile', 'deleteFile', 'updateFile', 'manageNotifications',
                'changeSettings'
            );
    `);
    await queryRunner.query(`
            DELETE FROM "role"
            WHERE value IN ('USER', 'ADMIN');
    `);
  }
}

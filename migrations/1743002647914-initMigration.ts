import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1743002647914 implements MigrationInterface {
  name = 'InitMigration1743002647914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "authorId" uuid NOT NULL, "todoId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_4f0f3ecd39f846b48c0f7596f00" UNIQUE ("value"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_fbbecbf5974405cb19dbd2f2434" UNIQUE ("value"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "TodoTag" ("tagId" uuid NOT NULL, "todoId" uuid NOT NULL, CONSTRAINT "UQ_7777cf5099ebe99a1b5c53fd8c4" UNIQUE ("tagId", "todoId"), CONSTRAINT "PK_7777cf5099ebe99a1b5c53fd8c4" PRIMARY KEY ("tagId", "todoId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "eliminatedDate" TIMESTAMP, "importance" integer, "status" character varying, "creatorId" uuid NOT NULL, "categoryId" uuid, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "authorId" uuid NOT NULL, "todoId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workSpaceId" uuid NOT NULL, CONSTRAINT "PK_7e4c895beaac36dd0df455c9f4a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "creatorId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_05c22ad73941a4e8959622999e7" UNIQUE ("value"), CONSTRAINT "PK_0e5ca512b7bf654202cee86fb4a" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_tag_todo" ("todoId" uuid NOT NULL, "tagId" uuid NOT NULL, "assignedByUserId" uuid, "assignedByWorkSpaceId" uuid, CONSTRAINT "UQ_daf7ebb513581ccf48a24e2d8cf" UNIQUE ("todoId", "tagId"), CONSTRAINT "PK_daf7ebb513581ccf48a24e2d8cf" PRIMARY KEY ("todoId", "tagId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "description" character varying NOT NULL, "creatorId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_0d8de9a580ca437351c1754d6f8" UNIQUE ("value"), CONSTRAINT "PK_2876acd13659f0e436a92e46fb6" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_category_conf" ("todoId" uuid NOT NULL, "categoryId" uuid NOT NULL, "attachedByUserId" character varying NOT NULL, "attachedData" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ea8952c271a57bec2c30063799e" PRIMARY KEY ("todoId", "categoryId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_command" ("workSpaceId" uuid NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_4098617aea07f6414537d81d019" PRIMARY KEY ("workSpaceId", "value"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "eliminatedDate" TIMESTAMP, "importance" integer, "status" character varying, "creatorId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, "categoryId" uuid, "commandValue" character varying, CONSTRAINT "PK_5e3341cc3061c5858a8c2e325dc" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "UQ_f67822708f5006c48a3f5768adc" UNIQUE ("value"), CONSTRAINT "PK_ff17c3c2a895375ffc533104d67" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_5108bf2fa353e6878c8721ef018" UNIQUE ("workSpaceId", "name"), CONSTRAINT "PK_d5b692b80181a71c14725aca0a2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "creatorId" character varying NOT NULL, CONSTRAINT "UQ_0d854a66d703509e998f23ba3ee" UNIQUE ("name", "creatorId"), CONSTRAINT "PK_77ad2aabe8a56267f822b09fdc0" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_user" ("userId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_ab72874df5c0be515ac853ae71c" UNIQUE ("userId", "workSpaceId"), CONSTRAINT "PK_ab72874df5c0be515ac853ae71c" PRIMARY KEY ("userId", "workSpaceId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" UNIQUE ("value"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "UserRole" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "UQ_5835d63ff2d20a9c455d2a75d77" UNIQUE ("userId", "roleId"), CONSTRAINT "PK_5835d63ff2d20a9c455d2a75d77" PRIMARY KEY ("userId", "roleId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_command_users_work_space_user" ("workSpaceCommandWorkSpaceId" uuid NOT NULL, "workSpaceCommandValue" character varying NOT NULL, "workSpaceUserUserId" uuid NOT NULL, "workSpaceUserWorkSpaceId" uuid NOT NULL, CONSTRAINT "PK_c9409420d67aa64fffa70ab6add" PRIMARY KEY ("workSpaceCommandWorkSpaceId", "workSpaceCommandValue", "workSpaceUserUserId", "workSpaceUserWorkSpaceId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_86394c21dda99f0319c1900829" ON "work_space_command_users_work_space_user" ("workSpaceCommandWorkSpaceId", "workSpaceCommandValue") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ac2131de5b8d6e9593fadc11d9" ON "work_space_command_users_work_space_user" ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_todo_contributors_work_space_user" ("workSpaceTodoId" uuid NOT NULL, "workSpaceUserUserId" uuid NOT NULL, "workSpaceUserWorkSpaceId" uuid NOT NULL, CONSTRAINT "PK_090789eacbc58d298670c35c68a" PRIMARY KEY ("workSpaceTodoId", "workSpaceUserUserId", "workSpaceUserWorkSpaceId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_35697cddc7b5744ec3fe56e061" ON "work_space_todo_contributors_work_space_user" ("workSpaceTodoId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_6bdcf2f43c7b503c4d8aa95f32" ON "work_space_todo_contributors_work_space_user" ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_permissions_roles_work_space_roles" ("workSpacePermissionsId" uuid NOT NULL, "workSpaceRolesId" uuid NOT NULL, CONSTRAINT "PK_d5332d8db090a8cad256e8992f1" PRIMARY KEY ("workSpacePermissionsId", "workSpaceRolesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e46e1b49fadedf7000214d0371" ON "work_space_permissions_roles_work_space_roles" ("workSpacePermissionsId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_5c5169bd4ce7573cb182dbe63e" ON "work_space_permissions_roles_work_space_roles" ("workSpaceRolesId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_roles_work_space_users_work_space_user" ("workSpaceRolesId" uuid NOT NULL, "workSpaceUserUserId" uuid NOT NULL, "workSpaceUserWorkSpaceId" uuid NOT NULL, CONSTRAINT "PK_dabf4bce99b3887ad0825935f2c" PRIMARY KEY ("workSpaceRolesId", "workSpaceUserUserId", "workSpaceUserWorkSpaceId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b1c76e4c2d7fa158838f325f3f" ON "work_space_roles_work_space_users_work_space_user" ("workSpaceRolesId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e1fb2d6dfbad898e4f0ebed3f0" ON "work_space_roles_work_space_users_work_space_user" ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "work_space_roles_permissions_work_space_permissions" ("workSpaceRolesId" uuid NOT NULL, "workSpacePermissionsId" uuid NOT NULL, CONSTRAINT "PK_7ad5f7c44175b9668c818757e0f" PRIMARY KEY ("workSpaceRolesId", "workSpacePermissionsId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b4b0e2967e04a1d8b1f9050258" ON "work_space_roles_permissions_work_space_permissions" ("workSpaceRolesId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_f64362a13b0568ecab94bf981e" ON "work_space_roles_permissions_work_space_permissions" ("workSpacePermissionsId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_f28138baab6c22e4b27f489d8be" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "tag" ADD CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "TodoTag" ADD CONSTRAINT "FK_51d489b5fdc5025f1737dbe04f4" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "TodoTag" ADD CONSTRAINT "FK_96b72c3b5ebbe55e7ec0f49eee6" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "todo" ADD CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "todo" ADD CONSTRAINT "FK_e383b628056351072a5f483f6bb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_comment" ADD CONSTRAINT "FK_3e0aa503300fe3f0a4e42d78241" FOREIGN KEY ("workSpaceId", "authorId") REFERENCES "work_space_user"("workSpaceId","userId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_comment" ADD CONSTRAINT "FK_1aed4a5ae8f73bd0ae900de2a66" FOREIGN KEY ("todoId") REFERENCES "work_space_todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_tag" ADD CONSTRAINT "FK_46aa88482f0edca92a7ebf65cd3" FOREIGN KEY ("creatorId", "workSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_tag" ADD CONSTRAINT "FK_8e9babc0fd780ef037b9d7854ab" FOREIGN KEY ("workSpaceId") REFERENCES "work_space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_tag_todo" ADD CONSTRAINT "FK_efdaf5e3a387ed191439c12fa13" FOREIGN KEY ("tagId") REFERENCES "work_space_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_tag_todo" ADD CONSTRAINT "FK_3ceb21df5f0aae9c3411204ac16" FOREIGN KEY ("todoId") REFERENCES "work_space_todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_tag_todo" ADD CONSTRAINT "FK_92969acef881bf3527abadbc1b3" FOREIGN KEY ("assignedByUserId", "assignedByWorkSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_category" ADD CONSTRAINT "FK_4a67335baff61b3ae7339d0d6cb" FOREIGN KEY ("creatorId", "workSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_category" ADD CONSTRAINT "FK_bf5c97606e4f48c9c7dac14b2c7" FOREIGN KEY ("workSpaceId") REFERENCES "work_space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_category_conf" ADD CONSTRAINT "FK_7eb80f4f48971cf69a1b561c7fa" FOREIGN KEY ("todoId") REFERENCES "work_space_todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_category_conf" ADD CONSTRAINT "FK_bac03bddad9ff011b6388174d74" FOREIGN KEY ("categoryId") REFERENCES "work_space_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_command" ADD CONSTRAINT "FK_d7b8b088b42f886f02666c3639e" FOREIGN KEY ("workSpaceId") REFERENCES "work_space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo" ADD CONSTRAINT "FK_27cdbe8ac5678c2ac9c9ca21b5c" FOREIGN KEY ("workSpaceId") REFERENCES "work_space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo" ADD CONSTRAINT "FK_f1e6aeca95dbe994850997d7d8b" FOREIGN KEY ("creatorId", "workSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo" ADD CONSTRAINT "FK_494f8cb8be416203b90fc490ce6" FOREIGN KEY ("categoryId", "id") REFERENCES "work_space_category_conf"("categoryId","todoId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo" ADD CONSTRAINT "FK_67f56f8b6aceb1dd90d698794c0" FOREIGN KEY ("workSpaceId", "commandValue") REFERENCES "work_space_command"("workSpaceId","value") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles" ADD CONSTRAINT "FK_680d635a8324d69ce25a3f585f7" FOREIGN KEY ("workSpaceId") REFERENCES "work_space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_user" ADD CONSTRAINT "FK_07b674927ad0155997c3e388ee6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_user" ADD CONSTRAINT "FK_7093a7fee0a40a1e059aaea9071" FOREIGN KEY ("workSpaceId") REFERENCES "work_space"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "UserRole" ADD CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "UserRole" ADD CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_command_users_work_space_user" ADD CONSTRAINT "FK_86394c21dda99f0319c19008290" FOREIGN KEY ("workSpaceCommandWorkSpaceId", "workSpaceCommandValue") REFERENCES "work_space_command"("workSpaceId","value") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_command_users_work_space_user" ADD CONSTRAINT "FK_ac2131de5b8d6e9593fadc11d90" FOREIGN KEY ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo_contributors_work_space_user" ADD CONSTRAINT "FK_35697cddc7b5744ec3fe56e061a" FOREIGN KEY ("workSpaceTodoId") REFERENCES "work_space_todo"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo_contributors_work_space_user" ADD CONSTRAINT "FK_6bdcf2f43c7b503c4d8aa95f321" FOREIGN KEY ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_permissions_roles_work_space_roles" ADD CONSTRAINT "FK_e46e1b49fadedf7000214d03719" FOREIGN KEY ("workSpacePermissionsId") REFERENCES "work_space_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_permissions_roles_work_space_roles" ADD CONSTRAINT "FK_5c5169bd4ce7573cb182dbe63e4" FOREIGN KEY ("workSpaceRolesId") REFERENCES "work_space_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_work_space_users_work_space_user" ADD CONSTRAINT "FK_b1c76e4c2d7fa158838f325f3f9" FOREIGN KEY ("workSpaceRolesId") REFERENCES "work_space_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_work_space_users_work_space_user" ADD CONSTRAINT "FK_e1fb2d6dfbad898e4f0ebed3f0b" FOREIGN KEY ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") REFERENCES "work_space_user"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_permissions_work_space_permissions" ADD CONSTRAINT "FK_b4b0e2967e04a1d8b1f90502580" FOREIGN KEY ("workSpaceRolesId") REFERENCES "work_space_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_permissions_work_space_permissions" ADD CONSTRAINT "FK_f64362a13b0568ecab94bf981ea" FOREIGN KEY ("workSpacePermissionsId") REFERENCES "work_space_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_permissions_work_space_permissions" DROP CONSTRAINT "FK_f64362a13b0568ecab94bf981ea"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_permissions_work_space_permissions" DROP CONSTRAINT "FK_b4b0e2967e04a1d8b1f90502580"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_work_space_users_work_space_user" DROP CONSTRAINT "FK_e1fb2d6dfbad898e4f0ebed3f0b"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_roles_work_space_users_work_space_user" DROP CONSTRAINT "FK_b1c76e4c2d7fa158838f325f3f9"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_permissions_roles_work_space_roles" DROP CONSTRAINT "FK_5c5169bd4ce7573cb182dbe63e4"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_permissions_roles_work_space_roles" DROP CONSTRAINT "FK_e46e1b49fadedf7000214d03719"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo_contributors_work_space_user" DROP CONSTRAINT "FK_6bdcf2f43c7b503c4d8aa95f321"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_todo_contributors_work_space_user" DROP CONSTRAINT "FK_35697cddc7b5744ec3fe56e061a"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_command_users_work_space_user" DROP CONSTRAINT "FK_ac2131de5b8d6e9593fadc11d90"',
    );
    await queryRunner.query(
      'ALTER TABLE "work_space_command_users_work_space_user" DROP CONSTRAINT "FK_86394c21dda99f0319c19008290"',
    );
    await queryRunner.query('ALTER TABLE "UserRole" DROP CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38"');
    await queryRunner.query('ALTER TABLE "UserRole" DROP CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe"');
    await queryRunner.query('ALTER TABLE "work_space_user" DROP CONSTRAINT "FK_7093a7fee0a40a1e059aaea9071"');
    await queryRunner.query('ALTER TABLE "work_space_user" DROP CONSTRAINT "FK_07b674927ad0155997c3e388ee6"');
    await queryRunner.query('ALTER TABLE "work_space_roles" DROP CONSTRAINT "FK_680d635a8324d69ce25a3f585f7"');
    await queryRunner.query('ALTER TABLE "work_space_todo" DROP CONSTRAINT "FK_67f56f8b6aceb1dd90d698794c0"');
    await queryRunner.query('ALTER TABLE "work_space_todo" DROP CONSTRAINT "FK_494f8cb8be416203b90fc490ce6"');
    await queryRunner.query('ALTER TABLE "work_space_todo" DROP CONSTRAINT "FK_f1e6aeca95dbe994850997d7d8b"');
    await queryRunner.query('ALTER TABLE "work_space_todo" DROP CONSTRAINT "FK_27cdbe8ac5678c2ac9c9ca21b5c"');
    await queryRunner.query('ALTER TABLE "work_space_command" DROP CONSTRAINT "FK_d7b8b088b42f886f02666c3639e"');
    await queryRunner.query('ALTER TABLE "work_space_category_conf" DROP CONSTRAINT "FK_bac03bddad9ff011b6388174d74"');
    await queryRunner.query('ALTER TABLE "work_space_category_conf" DROP CONSTRAINT "FK_7eb80f4f48971cf69a1b561c7fa"');
    await queryRunner.query('ALTER TABLE "work_space_category" DROP CONSTRAINT "FK_bf5c97606e4f48c9c7dac14b2c7"');
    await queryRunner.query('ALTER TABLE "work_space_category" DROP CONSTRAINT "FK_4a67335baff61b3ae7339d0d6cb"');
    await queryRunner.query('ALTER TABLE "work_space_tag_todo" DROP CONSTRAINT "FK_92969acef881bf3527abadbc1b3"');
    await queryRunner.query('ALTER TABLE "work_space_tag_todo" DROP CONSTRAINT "FK_3ceb21df5f0aae9c3411204ac16"');
    await queryRunner.query('ALTER TABLE "work_space_tag_todo" DROP CONSTRAINT "FK_efdaf5e3a387ed191439c12fa13"');
    await queryRunner.query('ALTER TABLE "work_space_tag" DROP CONSTRAINT "FK_8e9babc0fd780ef037b9d7854ab"');
    await queryRunner.query('ALTER TABLE "work_space_tag" DROP CONSTRAINT "FK_46aa88482f0edca92a7ebf65cd3"');
    await queryRunner.query('ALTER TABLE "work_space_comment" DROP CONSTRAINT "FK_1aed4a5ae8f73bd0ae900de2a66"');
    await queryRunner.query('ALTER TABLE "work_space_comment" DROP CONSTRAINT "FK_3e0aa503300fe3f0a4e42d78241"');
    await queryRunner.query('ALTER TABLE "todo" DROP CONSTRAINT "FK_e383b628056351072a5f483f6bb"');
    await queryRunner.query('ALTER TABLE "todo" DROP CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d"');
    await queryRunner.query('ALTER TABLE "TodoTag" DROP CONSTRAINT "FK_96b72c3b5ebbe55e7ec0f49eee6"');
    await queryRunner.query('ALTER TABLE "TodoTag" DROP CONSTRAINT "FK_51d489b5fdc5025f1737dbe04f4"');
    await queryRunner.query('ALTER TABLE "tag" DROP CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5"');
    await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_f28138baab6c22e4b27f489d8be"');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"');
    await queryRunner.query('DROP INDEX "public"."IDX_f64362a13b0568ecab94bf981e"');
    await queryRunner.query('DROP INDEX "public"."IDX_b4b0e2967e04a1d8b1f9050258"');
    await queryRunner.query('DROP TABLE "work_space_roles_permissions_work_space_permissions"');
    await queryRunner.query('DROP INDEX "public"."IDX_e1fb2d6dfbad898e4f0ebed3f0"');
    await queryRunner.query('DROP INDEX "public"."IDX_b1c76e4c2d7fa158838f325f3f"');
    await queryRunner.query('DROP TABLE "work_space_roles_work_space_users_work_space_user"');
    await queryRunner.query('DROP INDEX "public"."IDX_5c5169bd4ce7573cb182dbe63e"');
    await queryRunner.query('DROP INDEX "public"."IDX_e46e1b49fadedf7000214d0371"');
    await queryRunner.query('DROP TABLE "work_space_permissions_roles_work_space_roles"');
    await queryRunner.query('DROP INDEX "public"."IDX_6bdcf2f43c7b503c4d8aa95f32"');
    await queryRunner.query('DROP INDEX "public"."IDX_35697cddc7b5744ec3fe56e061"');
    await queryRunner.query('DROP TABLE "work_space_todo_contributors_work_space_user"');
    await queryRunner.query('DROP INDEX "public"."IDX_ac2131de5b8d6e9593fadc11d9"');
    await queryRunner.query('DROP INDEX "public"."IDX_86394c21dda99f0319c1900829"');
    await queryRunner.query('DROP TABLE "work_space_command_users_work_space_user"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "UserRole"');
    await queryRunner.query('DROP TABLE "role"');
    await queryRunner.query('DROP TABLE "token"');
    await queryRunner.query('DROP TABLE "work_space_user"');
    await queryRunner.query('DROP TABLE "work_space"');
    await queryRunner.query('DROP TABLE "work_space_roles"');
    await queryRunner.query('DROP TABLE "work_space_permissions"');
    await queryRunner.query('DROP TABLE "work_space_todo"');
    await queryRunner.query('DROP TABLE "work_space_command"');
    await queryRunner.query('DROP TABLE "work_space_category_conf"');
    await queryRunner.query('DROP TABLE "work_space_category"');
    await queryRunner.query('DROP TABLE "work_space_tag_todo"');
    await queryRunner.query('DROP TABLE "work_space_tag"');
    await queryRunner.query('DROP TABLE "work_space_comment"');
    await queryRunner.query('DROP TABLE "todo"');
    await queryRunner.query('DROP TABLE "TodoTag"');
    await queryRunner.query('DROP TABLE "tag"');
    await queryRunner.query('DROP TABLE "category"');
    await queryRunner.query('DROP TABLE "comment"');
  }
}

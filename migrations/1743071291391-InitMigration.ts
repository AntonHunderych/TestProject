import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1743071291391 implements MigrationInterface {
  name = 'InitMigration1743071291391';
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
      'CREATE TABLE "todoTag" ("tagId" uuid NOT NULL, "todoId" uuid NOT NULL, CONSTRAINT "UQ_a2a7c975d4884e7d111781514f5" UNIQUE ("tagId", "todoId"), CONSTRAINT "PK_a2a7c975d4884e7d111781514f5" PRIMARY KEY ("tagId", "todoId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "eliminatedDate" TIMESTAMP, "importance" integer, "status" character varying, "creatorId" uuid NOT NULL, "categoryId" uuid, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceComment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "authorId" uuid NOT NULL, "todoId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workSpaceId" uuid NOT NULL, CONSTRAINT "PK_ed0e8e202fd170448953e035b39" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceTag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "creatorId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_d4cb7c901d04630edc5256df13b" UNIQUE ("value"), CONSTRAINT "PK_fbc30596db7bcaedaf1c272360b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceTagTodo" ("todoId" uuid NOT NULL, "tagId" uuid NOT NULL, "assignedByUserId" uuid, "assignedByWorkSpaceId" uuid, CONSTRAINT "UQ_a1d2e90e4fa35a2f6fa7ea36ba2" UNIQUE ("todoId", "tagId"), CONSTRAINT "PK_a1d2e90e4fa35a2f6fa7ea36ba2" PRIMARY KEY ("todoId", "tagId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "description" character varying NOT NULL, "creatorId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_e423481e441e45f047bf234114e" UNIQUE ("value"), CONSTRAINT "PK_bf50d921576e57f40cb669e3fd2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceTodoCategory" ("todoId" uuid NOT NULL, "categoryId" uuid NOT NULL, "attachedByUserId" character varying NOT NULL, "attachedData" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4a95dbba97e9d045a29e132c3" PRIMARY KEY ("todoId", "categoryId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceCommand" ("workSpaceId" uuid NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_ec23c5397b42c9a031ab584d875" PRIMARY KEY ("workSpaceId", "value"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceTodo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "eliminatedDate" TIMESTAMP, "importance" integer, "status" character varying, "creatorId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, "categoryId" uuid, "commandValue" character varying, CONSTRAINT "PK_186e1a5f55625ba1568aeae1624" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpacePermissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "UQ_2eb32e210ef9bee47d9bee99e07" UNIQUE ("value"), CONSTRAINT "PK_17e69b4ee8737d258f5a2714af4" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceRoles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_7b4df21972d35731fac11b2eef2" UNIQUE ("workSpaceId", "name"), CONSTRAINT "PK_0dad671e65d09612d37c94c77b9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "creatorId" character varying NOT NULL, CONSTRAINT "UQ_5061d62d634c08e1d42c60fe398" UNIQUE ("name", "creatorId"), CONSTRAINT "PK_dd0415595b20fffc0046c72cf53" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceUser" ("userId" uuid NOT NULL, "workSpaceId" uuid NOT NULL, CONSTRAINT "UQ_8d906516e9e3c54ed5a535f64c4" UNIQUE ("userId", "workSpaceId"), CONSTRAINT "PK_8d906516e9e3c54ed5a535f64c4" PRIMARY KEY ("userId", "workSpaceId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" UNIQUE ("value"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "userRole" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "UQ_a829a1a2c80a91f5a8a47213b69" UNIQUE ("userId", "roleId"), CONSTRAINT "PK_a829a1a2c80a91f5a8a47213b69" PRIMARY KEY ("userId", "roleId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceUserCommand" ("workSpaceCommandWorkSpaceId" uuid NOT NULL, "workSpaceCommandValue" character varying NOT NULL, "workSpaceUserUserId" uuid NOT NULL, "workSpaceUserWorkSpaceId" uuid NOT NULL, CONSTRAINT "PK_55e156881b276ca23e345361066" PRIMARY KEY ("workSpaceCommandWorkSpaceId", "workSpaceCommandValue", "workSpaceUserUserId", "workSpaceUserWorkSpaceId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b3469968081cf6c14052bafe6a" ON "workSpaceUserCommand" ("workSpaceCommandWorkSpaceId", "workSpaceCommandValue") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ea0a938be9e6b09f1edd88c2e4" ON "workSpaceUserCommand" ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceUserTodo" ("workSpaceTodoId" uuid NOT NULL, "workSpaceUserUserId" uuid NOT NULL, "workSpaceUserWorkSpaceId" uuid NOT NULL, CONSTRAINT "PK_ab7b527d5b1dcd630672f1c0a1c" PRIMARY KEY ("workSpaceTodoId", "workSpaceUserUserId", "workSpaceUserWorkSpaceId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ddefd0f29025846956005c3a70" ON "workSpaceUserTodo" ("workSpaceTodoId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_34438883be9d0157b8f1797ed4" ON "workSpaceUserTodo" ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceRolePermission" ("workSpacePermissionsId" uuid NOT NULL, "workSpaceRolesId" uuid NOT NULL, CONSTRAINT "PK_efb0ec4cbf80cd00395ca151127" PRIMARY KEY ("workSpacePermissionsId", "workSpaceRolesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_9c26fcb84c92512be85640780f" ON "workSpaceRolePermission" ("workSpacePermissionsId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_368fbd21402b5d094fa3ddfcc3" ON "workSpaceRolePermission" ("workSpaceRolesId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "workSpaceUserRole" ("workSpaceRolesId" uuid NOT NULL, "workSpaceUserUserId" uuid NOT NULL, "workSpaceUserWorkSpaceId" uuid NOT NULL, CONSTRAINT "PK_fcbe906b241cbb704fbd44c04c2" PRIMARY KEY ("workSpaceRolesId", "workSpaceUserUserId", "workSpaceUserWorkSpaceId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_ea3f31c83045225ad33990f8bf" ON "workSpaceUserRole" ("workSpaceRolesId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_9a113945ec17323790a2d896f8" ON "workSpaceUserRole" ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") ',
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
      'ALTER TABLE "todoTag" ADD CONSTRAINT "FK_331f2b44ef4b6b997c5edc5ad32" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "todoTag" ADD CONSTRAINT "FK_76ae043c5760ac0b42ad4782b75" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "todo" ADD CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "todo" ADD CONSTRAINT "FK_e383b628056351072a5f483f6bb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceComment" ADD CONSTRAINT "FK_9f80e4f89d858b9b309d71c4809" FOREIGN KEY ("workSpaceId", "authorId") REFERENCES "workSpaceUser"("workSpaceId","userId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceComment" ADD CONSTRAINT "FK_2c943d388480b20adda005326d2" FOREIGN KEY ("todoId") REFERENCES "workSpaceTodo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTag" ADD CONSTRAINT "FK_801f95c8144fcc7c9fac440024c" FOREIGN KEY ("creatorId", "workSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTag" ADD CONSTRAINT "FK_25b8fb6cbde2b184701ab418583" FOREIGN KEY ("workSpaceId") REFERENCES "workSpace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTagTodo" ADD CONSTRAINT "FK_79052c83f236f02a850acc67a8f" FOREIGN KEY ("tagId") REFERENCES "workSpaceTag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTagTodo" ADD CONSTRAINT "FK_8fca6b41563336d6b144d50c729" FOREIGN KEY ("todoId") REFERENCES "workSpaceTodo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTagTodo" ADD CONSTRAINT "FK_844df5e679ddca6ea0ab2de2ace" FOREIGN KEY ("assignedByUserId", "assignedByWorkSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceCategory" ADD CONSTRAINT "FK_66f8fad62749050164a4135771f" FOREIGN KEY ("creatorId", "workSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceCategory" ADD CONSTRAINT "FK_a4db1a1ccece962d9f820a24790" FOREIGN KEY ("workSpaceId") REFERENCES "workSpace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTodoCategory" ADD CONSTRAINT "FK_0070a2cf92ad9724b9a24c724dc" FOREIGN KEY ("todoId") REFERENCES "workSpaceTodo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTodoCategory" ADD CONSTRAINT "FK_34d209eefd772d2db73ad8812f2" FOREIGN KEY ("categoryId") REFERENCES "workSpaceCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceCommand" ADD CONSTRAINT "FK_3f95599ca191875563d6e336389" FOREIGN KEY ("workSpaceId") REFERENCES "workSpace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTodo" ADD CONSTRAINT "FK_acff4b3d4bf90114adee0e16fa0" FOREIGN KEY ("workSpaceId") REFERENCES "workSpace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTodo" ADD CONSTRAINT "FK_ab10199b2a35049488f3105b39e" FOREIGN KEY ("creatorId", "workSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTodo" ADD CONSTRAINT "FK_4945723c7ae0305d8dde555cad1" FOREIGN KEY ("categoryId", "id") REFERENCES "workSpaceTodoCategory"("categoryId","todoId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceTodo" ADD CONSTRAINT "FK_7b33fc445b52ac8d262b970c2f4" FOREIGN KEY ("workSpaceId", "commandValue") REFERENCES "workSpaceCommand"("workSpaceId","value") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceRoles" ADD CONSTRAINT "FK_40b11a564d7425c3ae78678a8a2" FOREIGN KEY ("workSpaceId") REFERENCES "workSpace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUser" ADD CONSTRAINT "FK_cb2bd21de9b1ff537849f1690c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUser" ADD CONSTRAINT "FK_c42ae8e4f2125ffe63c4e225b3f" FOREIGN KEY ("workSpaceId") REFERENCES "workSpace"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "userRole" ADD CONSTRAINT "FK_aa72ae0c32996d476c28f12eb78" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "userRole" ADD CONSTRAINT "FK_bc794a2ac3d2f53fc2bc04c3cf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUserCommand" ADD CONSTRAINT "FK_b3469968081cf6c14052bafe6ab" FOREIGN KEY ("workSpaceCommandWorkSpaceId", "workSpaceCommandValue") REFERENCES "workSpaceCommand"("workSpaceId","value") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUserCommand" ADD CONSTRAINT "FK_ea0a938be9e6b09f1edd88c2e4c" FOREIGN KEY ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUserTodo" ADD CONSTRAINT "FK_ddefd0f29025846956005c3a706" FOREIGN KEY ("workSpaceTodoId") REFERENCES "workSpaceTodo"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUserTodo" ADD CONSTRAINT "FK_34438883be9d0157b8f1797ed4a" FOREIGN KEY ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceRolePermission" ADD CONSTRAINT "FK_9c26fcb84c92512be85640780fb" FOREIGN KEY ("workSpacePermissionsId") REFERENCES "workSpacePermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceRolePermission" ADD CONSTRAINT "FK_368fbd21402b5d094fa3ddfcc35" FOREIGN KEY ("workSpaceRolesId") REFERENCES "workSpaceRoles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUserRole" ADD CONSTRAINT "FK_ea3f31c83045225ad33990f8bf1" FOREIGN KEY ("workSpaceRolesId") REFERENCES "workSpaceRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workSpaceUserRole" ADD CONSTRAINT "FK_9a113945ec17323790a2d896f8d" FOREIGN KEY ("workSpaceUserUserId", "workSpaceUserWorkSpaceId") REFERENCES "workSpaceUser"("userId","workSpaceId") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "workSpaceUserRole" DROP CONSTRAINT "FK_9a113945ec17323790a2d896f8d"');
    await queryRunner.query('ALTER TABLE "workSpaceUserRole" DROP CONSTRAINT "FK_ea3f31c83045225ad33990f8bf1"');
    await queryRunner.query('ALTER TABLE "workSpaceRolePermission" DROP CONSTRAINT "FK_368fbd21402b5d094fa3ddfcc35"');
    await queryRunner.query('ALTER TABLE "workSpaceRolePermission" DROP CONSTRAINT "FK_9c26fcb84c92512be85640780fb"');
    await queryRunner.query('ALTER TABLE "workSpaceUserTodo" DROP CONSTRAINT "FK_34438883be9d0157b8f1797ed4a"');
    await queryRunner.query('ALTER TABLE "workSpaceUserTodo" DROP CONSTRAINT "FK_ddefd0f29025846956005c3a706"');
    await queryRunner.query('ALTER TABLE "workSpaceUserCommand" DROP CONSTRAINT "FK_ea0a938be9e6b09f1edd88c2e4c"');
    await queryRunner.query('ALTER TABLE "workSpaceUserCommand" DROP CONSTRAINT "FK_b3469968081cf6c14052bafe6ab"');
    await queryRunner.query('ALTER TABLE "userRole" DROP CONSTRAINT "FK_bc794a2ac3d2f53fc2bc04c3cf4"');
    await queryRunner.query('ALTER TABLE "userRole" DROP CONSTRAINT "FK_aa72ae0c32996d476c28f12eb78"');
    await queryRunner.query('ALTER TABLE "workSpaceUser" DROP CONSTRAINT "FK_c42ae8e4f2125ffe63c4e225b3f"');
    await queryRunner.query('ALTER TABLE "workSpaceUser" DROP CONSTRAINT "FK_cb2bd21de9b1ff537849f1690c9"');
    await queryRunner.query('ALTER TABLE "workSpaceRoles" DROP CONSTRAINT "FK_40b11a564d7425c3ae78678a8a2"');
    await queryRunner.query('ALTER TABLE "workSpaceTodo" DROP CONSTRAINT "FK_7b33fc445b52ac8d262b970c2f4"');
    await queryRunner.query('ALTER TABLE "workSpaceTodo" DROP CONSTRAINT "FK_4945723c7ae0305d8dde555cad1"');
    await queryRunner.query('ALTER TABLE "workSpaceTodo" DROP CONSTRAINT "FK_ab10199b2a35049488f3105b39e"');
    await queryRunner.query('ALTER TABLE "workSpaceTodo" DROP CONSTRAINT "FK_acff4b3d4bf90114adee0e16fa0"');
    await queryRunner.query('ALTER TABLE "workSpaceCommand" DROP CONSTRAINT "FK_3f95599ca191875563d6e336389"');
    await queryRunner.query('ALTER TABLE "workSpaceTodoCategory" DROP CONSTRAINT "FK_34d209eefd772d2db73ad8812f2"');
    await queryRunner.query('ALTER TABLE "workSpaceTodoCategory" DROP CONSTRAINT "FK_0070a2cf92ad9724b9a24c724dc"');
    await queryRunner.query('ALTER TABLE "workSpaceCategory" DROP CONSTRAINT "FK_a4db1a1ccece962d9f820a24790"');
    await queryRunner.query('ALTER TABLE "workSpaceCategory" DROP CONSTRAINT "FK_66f8fad62749050164a4135771f"');
    await queryRunner.query('ALTER TABLE "workSpaceTagTodo" DROP CONSTRAINT "FK_844df5e679ddca6ea0ab2de2ace"');
    await queryRunner.query('ALTER TABLE "workSpaceTagTodo" DROP CONSTRAINT "FK_8fca6b41563336d6b144d50c729"');
    await queryRunner.query('ALTER TABLE "workSpaceTagTodo" DROP CONSTRAINT "FK_79052c83f236f02a850acc67a8f"');
    await queryRunner.query('ALTER TABLE "workSpaceTag" DROP CONSTRAINT "FK_25b8fb6cbde2b184701ab418583"');
    await queryRunner.query('ALTER TABLE "workSpaceTag" DROP CONSTRAINT "FK_801f95c8144fcc7c9fac440024c"');
    await queryRunner.query('ALTER TABLE "workSpaceComment" DROP CONSTRAINT "FK_2c943d388480b20adda005326d2"');
    await queryRunner.query('ALTER TABLE "workSpaceComment" DROP CONSTRAINT "FK_9f80e4f89d858b9b309d71c4809"');
    await queryRunner.query('ALTER TABLE "todo" DROP CONSTRAINT "FK_e383b628056351072a5f483f6bb"');
    await queryRunner.query('ALTER TABLE "todo" DROP CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d"');
    await queryRunner.query('ALTER TABLE "todoTag" DROP CONSTRAINT "FK_76ae043c5760ac0b42ad4782b75"');
    await queryRunner.query('ALTER TABLE "todoTag" DROP CONSTRAINT "FK_331f2b44ef4b6b997c5edc5ad32"');
    await queryRunner.query('ALTER TABLE "tag" DROP CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5"');
    await queryRunner.query('ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_f28138baab6c22e4b27f489d8be"');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"');
    await queryRunner.query('DROP INDEX "public"."IDX_9a113945ec17323790a2d896f8"');
    await queryRunner.query('DROP INDEX "public"."IDX_ea3f31c83045225ad33990f8bf"');
    await queryRunner.query('DROP TABLE "workSpaceUserRole"');
    await queryRunner.query('DROP INDEX "public"."IDX_368fbd21402b5d094fa3ddfcc3"');
    await queryRunner.query('DROP INDEX "public"."IDX_9c26fcb84c92512be85640780f"');
    await queryRunner.query('DROP TABLE "workSpaceRolePermission"');
    await queryRunner.query('DROP INDEX "public"."IDX_34438883be9d0157b8f1797ed4"');
    await queryRunner.query('DROP INDEX "public"."IDX_ddefd0f29025846956005c3a70"');
    await queryRunner.query('DROP TABLE "workSpaceUserTodo"');
    await queryRunner.query('DROP INDEX "public"."IDX_ea0a938be9e6b09f1edd88c2e4"');
    await queryRunner.query('DROP INDEX "public"."IDX_b3469968081cf6c14052bafe6a"');
    await queryRunner.query('DROP TABLE "workSpaceUserCommand"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "userRole"');
    await queryRunner.query('DROP TABLE "role"');
    await queryRunner.query('DROP TABLE "token"');
    await queryRunner.query('DROP TABLE "workSpaceUser"');
    await queryRunner.query('DROP TABLE "workSpace"');
    await queryRunner.query('DROP TABLE "workSpaceRoles"');
    await queryRunner.query('DROP TABLE "workSpacePermissions"');
    await queryRunner.query('DROP TABLE "workSpaceTodo"');
    await queryRunner.query('DROP TABLE "workSpaceCommand"');
    await queryRunner.query('DROP TABLE "workSpaceTodoCategory"');
    await queryRunner.query('DROP TABLE "workSpaceCategory"');
    await queryRunner.query('DROP TABLE "workSpaceTagTodo"');
    await queryRunner.query('DROP TABLE "workSpaceTag"');
    await queryRunner.query('DROP TABLE "workSpaceComment"');
    await queryRunner.query('DROP TABLE "todo"');
    await queryRunner.query('DROP TABLE "todoTag"');
    await queryRunner.query('DROP TABLE "tag"');
    await queryRunner.query('DROP TABLE "category"');
    await queryRunner.query('DROP TABLE "comment"');
  }
}

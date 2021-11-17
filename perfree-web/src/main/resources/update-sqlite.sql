--PerfreeBlog
--v1.2.4;
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (3, '文章编辑', '文章编辑', 'editor', '2021-09-15 13:59:43', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (4, '文章贡献', '文章贡献', 'contribute', '2021-09-15 14:00:21', NULL);
UPDATE `p_role` SET `name` = '普通用户', `description` = '网站用户', `code` = 'user', `createTime` = '2020-12-17 13:11:50', `updateTime` = NULL WHERE `id` = 2;
--PerfreeBlog
--v1.2.8;
ALTER TABLE "p_menu"  ADD COLUMN "pluginId" text(128) DEFAULT(NULL);
--PerfreeBlog
--v1.3.1;
ALTER TABLE "p_menu" RENAME TO "_p_menu_old_1.3.1";
CREATE TABLE "p_menu" (
  "id" text(64) NOT NULL,
  "pid" text(64),
  "name" text(128) NOT NULL,
  "url" text(128),
  "icon" text(64),
  "seq" integer,
  "type" integer NOT NULL,
  "target" integer,
  "articleId" integer,
  "status" integer NOT NULL,
  "createTime" DATETIME NOT NULL,
  "updateTime" DATETIME,
   PRIMARY KEY ("id")
);
INSERT INTO "p_menu" ("id", "pid", "name", "url", "icon", "seq", "type", "target", "articleId", "status", "createTime", "updateTime") SELECT "id", "pid", "name", "url", "icon", "seq", "type", "target", "articleId", "status", "createTime", "updateTime" FROM "_p_menu_old_1.3.1";
drop table if exists "_p_menu_old_1.3.1";
ALTER TABLE "main"."p_role_menu" RENAME TO "_p_role_menu_old_1.3.1";
CREATE TABLE "main"."p_role_menu" (
  "roleId" integer NOT NULL,
  "menuId" text(64) NOT NULL
);
INSERT INTO "main"."p_role_menu" ("roleId", "menuId") SELECT "roleId", "menuId" FROM "main"."_p_role_menu_old_1.3.1";
drop table if exists "_p_role_menu_old_1.3.1";
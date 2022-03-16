--PerfreeBlog
--v1.2.4;
INSERT INTO "main".`p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (3, '文章编辑', '文章编辑', 'editor', '2021-09-15 13:59:43', NULL);
INSERT INTO "main".`p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (4, '文章贡献', '文章贡献', 'contribute', '2021-09-15 14:00:21', NULL);
UPDATE "main".`p_role` SET `name` = '普通用户', `description` = '网站用户', `code` = 'user', `createTime` = '2020-12-17 13:11:50', `updateTime` = NULL WHERE `id` = 2;
--PerfreeBlog
--v1.2.8;
ALTER TABLE "main"."p_menu"  ADD COLUMN "pluginId" text(128) DEFAULT(NULL);
--PerfreeBlog
--v1.3.1;
ALTER TABLE "main"."p_menu" RENAME TO "_p_menu_old_1.3.1";
CREATE TABLE "main"."p_menu" (
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
INSERT INTO "main"."p_menu" ("id", "pid", "name", "url", "icon", "seq", "type", "target", "articleId", "status", "createTime", "updateTime") SELECT "id", "pid", "name", "url", "icon", "seq", "type", "target", "articleId", "status", "createTime", "updateTime" FROM "_p_menu_old_1.3.1";
drop table if exists "main"."_p_menu_old_1.3.1";
ALTER TABLE "main"."p_role_menu" RENAME TO "_p_role_menu_old_1.3.1";
CREATE TABLE "main"."p_role_menu" (
  "roleId" integer NOT NULL,
  "menuId" text(64) NOT NULL
);
INSERT INTO "main"."p_role_menu" ("roleId", "menuId") SELECT "roleId", "menuId" FROM "main"."_p_role_menu_old_1.3.1";
drop table if exists "main"."_p_role_menu_old_1.3.1";
--PerfreeBlog
--v1.3.2;
ALTER TABLE "main"."p_option" RENAME TO "_p_option_old_1.3.2";
CREATE TABLE "main"."p_option" (
           "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
           "key" text(256) NOT NULL,
           "value" text
);
INSERT INTO "main"."p_option" ("id", "key", "value") SELECT "id", "key", "value" FROM "main"."_p_option_old_1.3.2";
drop table if exists "main"."_p_option_old_1.3.2";
--PerfreeBlog
--v2.0.0;
ALTER TABLE "main"."p_article" RENAME TO "_p_article_old_1.3.3";
CREATE TABLE "main"."p_article" (
                                    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "title" text(256) NOT NULL,
                                    "content" text,
                                    "type" text(32),
                                    "summary" text(1024),
                                    "categoryId" integer,
                                    "metaKeywords" text(512),
                                    "metaDescription" text(512),
                                    "thumbnail" text(256),
                                    "isTop" integer,
                                    "status" integer,
                                    "commentCount" integer,
                                    "viewCount" integer,
                                    "userId" integer NOT NULL,
                                    "isComment" integer,
                                    "slug" text(128),
                                    "createTime" DATETIME NOT NULL,
                                    "updateTime" DATETIME
);
INSERT INTO "main"."p_article" ("id", "title", "content", "type", "summary", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "createTime", "updateTime") SELECT "id", "title", "content", "type", "summary", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "createTime", "updateTime" FROM "main"."_p_article_old_1.3.3";
drop table if exists "main"."_p_article_old_1.3.3";
ALTER TABLE "main"."p_menu" RENAME TO "_p_menu_old_1.3.3";
CREATE TABLE "main"."p_menu" (
                                 "id" text(64) NOT NULL,
                                 "pid" text(64),
                                 "name" text(128) NOT NULL,
                                 "url" text(128),
                                 "icon" text(64),
                                 "seq" integer,
                                 "type" integer NOT NULL,
                                 "target" integer,
                                 "status" integer NOT NULL,
                                 "createTime" DATETIME NOT NULL,
                                 "updateTime" DATETIME,
                                 PRIMARY KEY ("id")
);
INSERT INTO "main"."p_menu" ("id", "pid", "name", "url", "icon", "seq", "type", "target", "status", "createTime", "updateTime") SELECT "id", "pid", "name", "url", "icon", "seq", "type", "target", "status", "createTime", "updateTime" FROM "main"."_p_menu_old_1.3.3";
drop table if exists "main"."_p_menu_old_1.3.3";
UPDATE "main"."p_article" set slug = id where slug is null;
--PerfreeBlog
--v2.1.0;
ALTER TABLE "main"."p_article" RENAME TO "_p_article_old_2.1.0";
CREATE TABLE "main"."p_article" (
                                    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "title" text(256) NOT NULL,
                                    "content" text,
                                    "contentModel" text(32),
                                    "type" text(32),
                                    "summary" text(1024),
                                    "categoryId" integer,
                                    "metaKeywords" text(512),
                                    "metaDescription" text(512),
                                    "thumbnail" text(256),
                                    "isTop" integer,
                                    "status" integer,
                                    "commentCount" integer,
                                    "viewCount" integer,
                                    "userId" integer NOT NULL,
                                    "isComment" integer,
                                    "slug" text(128),
                                    "createTime" DATETIME NOT NULL,
                                    "updateTime" DATETIME
);
INSERT INTO "main"."p_article" ("id", "slug", "title", "content", "type", "summary", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "createTime", "updateTime") SELECT "id", "slug", "title", "content", "type", "summary", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "createTime", "updateTime" FROM "main"."_p_article_old_2.1.0";
drop table if exists "main"."_p_article_old_2.1.0";
UPDATE "main"."p_article" set contentModel = 'markdown' where contentModel is null;
--PerfreeBlog
--v2.2.0;
ALTER TABLE "main"."p_plugin" RENAME TO "_p_plugin_old_2.2.0";
CREATE TABLE "main"."p_plugin" (
                                   "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                   "name" text(256) NOT NULL,
                                   "path" text(256),
                                   "desc" text(512),
                                   "version" text(64),
                                   "status" integer,
                                   "author" text(64),
                                   "createTime" DATETIME NOT NULL,
                                   "updateTime" DATETIME
);
INSERT INTO "main"."p_plugin" ("id", "name", "path", "desc", "version", "author", "createTime", "updateTime") SELECT "id", "name", "path", "desc", "version", "author", "createTime", "updateTime" FROM "main"."_p_plugin_old_2.2.0";
drop table if exists "main"."_p_plugin_old_2.2.0";
UPDATE "main"."p_plugin" set "status" = 1 where "status" is null;
--PerfreeBlog
--v2.2.2;
ALTER TABLE "main"."p_article" RENAME TO "_p_article_old_2.2.2";
CREATE TABLE "main"."p_article" (
                                    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                    "title" text(256) NOT NULL,
                                    "content" text,
                                    "contentModel" text(32),
                                    "type" text(32),
                                    "summary" text(1024),
                                    "slug" text(128),
                                    "categoryId" integer,
                                    "metaKeywords" text(512),
                                    "metaDescription" text(512),
                                    "thumbnail" text(256),
                                    "isTop" integer,
                                    "status" integer,
                                    "commentCount" integer,
                                    "viewCount" integer,
                                    "userId" integer NOT NULL,
                                    "isComment" integer,
                                    "flag" text(256),
                                    "template" text(256),
                                    "createTime" DATETIME NOT NULL,
                                    "updateTime" DATETIME
);
INSERT INTO "main"."p_article" ("id", "title", "content", "contentModel", "type", "summary", "slug", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "createTime", "updateTime") SELECT "id", "title", "content", "contentModel", "type", "summary", "slug", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "createTime", "updateTime" FROM "main"."_p_article_old_2.2.2";
drop table if exists "main"."_p_article_old_2.2.2";

--PerfreeBlog
--v2.3.1;
ALTER TABLE "main"."p_attach" RENAME TO "_p_attach_old_2.3.1";
CREATE TABLE "main"."p_attach" (
                                   "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                   "name" text(256) NOT NULL,
                                   "desc" text(512),
                                   "path" text(512) NOT NULL,
                                   "suffix" text(32),
                                   "flag" text(256),
                                   "type" text(32),
                                   "saveType" text(32),
                                   "fileKey" text(512),
                                   "createTime" DATETIME NOT NULL,
                                   "updateTime" DATETIME
);
INSERT INTO "main"."p_attach" ("id", "name", "desc", "path", "suffix", "flag", "type", "createTime", "updateTime") SELECT "id", "name", "desc", "path", "suffix", "flag", "type", "createTime", "updateTime" FROM "main"."_p_attach_old_2.3.1";
drop table if exists "main"."_p_attach_old_2.3.1";
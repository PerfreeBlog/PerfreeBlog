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

--PerfreeBlog
--v3.0.0;
ALTER TABLE "main"."p_tag" RENAME TO "_p_tag_old_3.0.0";
CREATE TABLE "main"."p_tag" (
                                "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                "name" text(256) NOT NULL,
                                "userId" integer NOT NULL,
                                "createTime" DATETIME NOT NULL,
                                "updateTime" DATETIME,
                                "color" TEXT,
                                "thumbnail" TEXT,
                                "slug" TEXT
);
INSERT INTO "main"."p_tag" ("id", "name", "userId", "createTime", "updateTime") SELECT "id", "name", "userId", "createTime", "updateTime" FROM "main"."_p_tag_old_3.0.0";
drop table if exists "main"."_p_tag_old_3.0.0";
UPDATE "main"."p_tag" set slug = id where slug is null;
ALTER TABLE "main"."p_category" RENAME TO "_p_category_old_3.0.0";
CREATE TABLE "main"."p_category" (
                                     "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                     "name" text(256) NOT NULL,
                                     "pid" integer NOT NULL,
                                     "desc" text(512),
                                     "count" integer NOT NULL,
                                     "metaKeywords" text(256),
                                     "metaDescription" text(256),
                                     "status" integer NOT NULL,
                                     "createTime" DATETIME NOT NULL,
                                     "updateTime" DATETIME,
                                     "thumbnail" TEXT,
                                     "slug" TEXT
);
INSERT INTO "main"."p_category" ("id", "name", "pid", "desc", "count", "metaKeywords", "metaDescription", "status", "createTime", "updateTime") SELECT "id", "name", "pid", "desc", "count", "metaKeywords", "metaDescription", "status", "createTime", "updateTime" FROM "main"."_p_category_old_3.0.0";
drop table if exists "main"."_p_category_old_3.0.0";
UPDATE "main"."p_category" set slug = id where slug is null;
ALTER TABLE "main"."p_article" RENAME TO "_p_article_old_3.0.0";
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
                                    "updateTime" DATETIME,
                                    "greatCount" integer DEFAULT 0
);
INSERT INTO "main"."p_article" ("id", "title", "content", "contentModel", "type", "summary", "slug", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "flag", "template", "createTime", "updateTime") SELECT "id", "title", "content", "contentModel", "type", "summary", "slug", "categoryId", "metaKeywords", "metaDescription", "thumbnail", "isTop", "status", "commentCount", "viewCount", "userId", "isComment", "flag", "template", "createTime", "updateTime" FROM "main"."_p_article_old_3.0.0";
drop table if exists "main"."_p_article_old_3.0.0";
UPDATE "main"."p_article" set greatCount = 0;
CREATE INDEX "main"."p_article_slug" ON "p_article" ("slug");
CREATE INDEX "main"."p_article_isTop" ON "p_article" ("isTop");
CREATE INDEX "main"."p_article_type" ON "p_article" ("type");
CREATE INDEX "main"."p_attach_type" ON "p_attach" ("type");
CREATE INDEX "main"."p_attach_saveType" ON "p_attach" ("saveType");
CREATE INDEX "main"."p_category_status" ON "p_category" ("status");
CREATE INDEX "main"."p_category_slug" ON "p_category" ("slug");
CREATE INDEX "main"."p_comment_articleId" ON "p_comment" ("articleId");
CREATE INDEX "main"."p_comment_status" ON "p_comment" ("status");
CREATE INDEX "main"."p_menu_status" ON "p_menu" ("status");
CREATE INDEX "main"."p_menu_type" ON "p_menu" ("type");
CREATE INDEX "main"."p_user_account" ON "p_user" ("account");
CREATE INDEX "main"."p_user_status" ON "p_user" ("status");
CREATE INDEX "main"."p_tag_slug" ON "p_tag" ("slug");
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES ('000000000000000000046b67a553452e','-1', '动态', '/journal', 'fa-newspaper-o', 99, 0, 0, 0, '2022-08-08 08:08:08', '2022-08-08 08:08:08');

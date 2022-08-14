drop table if exists `p_article`;
CREATE TABLE "p_article" (
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
                             "greatCount" integer,
                             "userId" integer NOT NULL,
                             "isComment" integer,
                             "flag" text(256),
                             "template" text(256),
                             "createTime" DATETIME NOT NULL,
                             "updateTime" DATETIME
);
drop table if exists `p_article_tag`;
CREATE TABLE "p_article_tag" (
                                 "articleId" integer NOT NULL,
                                 "tagId" integer NOT NULL
);
drop table if exists `p_attach`;
CREATE TABLE "p_attach" (
                            "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                            "name" text(256) NOT NULL,
                            "desc" text(512),
                            "path" text(512) NOT NULL,
                            "suffix" text(32),
                            "flag" text(256),
                            "type" text(32),
                            "createTime" DATETIME NOT NULL,
                            "updateTime" DATETIME,
                            "saveType" text(32),
                            "fileKey" text(512)
);
drop table if exists `p_category`;
CREATE TABLE "p_category" (
                              "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                              "name" text(256) NOT NULL,
                              "pid" integer NOT NULL,
                              "desc" text(512),
                              "count" integer NOT NULL,
                              "thumbnail" text(256),
                              "slug" text(128),
                              "metaKeywords" text(256),
                              "metaDescription" text(256),
                              "status" integer NOT NULL,
                              "createTime" DATETIME NOT NULL,
                              "updateTime" DATETIME
);
drop table if exists `p_comment`;
CREATE TABLE "p_comment" (
                             "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                             "articleId" integer NOT NULL,
                             "pid" integer,
                             "topPid" integer,
                             "userId" integer,
                             "content" text(2048),
                             "status" integer,
                             "avatar" text(256),
                             "website" text(256),
                             "email" text(256) NOT NULL,
                             "userName" text(256) NOT NULL,
                             "createTime" DATETIME NOT NULL,
                             "updateTime" DATETIME
);
drop table if exists `p_link`;
CREATE TABLE "p_link" (
                          "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                          "name" text(256) NOT NULL,
                          "logo" text(256),
                          "desc" text(512),
                          "address" text(256) NOT NULL,
                          "createTime" DATETIME NOT NULL,
                          "updateTime" DATETIME
);
drop table if exists `p_menu`;
CREATE TABLE "p_menu" (
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
drop table if exists `p_option`;
CREATE TABLE "p_option" (
                            "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                            "key" text(256) NOT NULL,
                            "value" text
);
drop table if exists `p_role`;
CREATE TABLE "p_role" (
                          "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                          "name" text(32) NOT NULL,
                          "description" text(256),
                          "code" text(32) NOT NULL,
                          "createTime" DATETIME NOT NULL,
                          "updateTime" DATETIME
);
drop table if exists `p_role_menu`;
CREATE TABLE "p_role_menu" (
                  "roleId" integer NOT NULL,
                    "menuId" text(64) NOT NULL
);
drop table if exists `p_tag`;
CREATE TABLE "p_tag" (
                         "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                         "name" text(256) NOT NULL,
                         "color" text(128),
                         "thumbnail" text(256),
                         "slug" text(128),
                         "userId" integer NOT NULL,
                         "createTime" DATETIME NOT NULL,
                         "updateTime" DATETIME
);
drop table if exists `p_user`;
CREATE TABLE "p_user" (
                          "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                          "account" text(32) NOT NULL,
                          "userName" text(32) NOT NULL,
                          "password" text(32) NOT NULL,
                          "salt" text(32) NOT NULL,
                          "status" integer NOT NULL,
                          "avatar" text(256),
                          "roleId" integer NOT NULL,
                          "email" text(128),
                          "website" text(256),
                          "createTime" DATETIME NOT NULL,
                          "updateTime" DATETIME
);
drop table if exists `p_plugin`;
CREATE TABLE `p_plugin`  (
                             `id` integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                             `name` text(256) NOT NULL,
                             `path` text(256),
                             `desc` text(512),
                             `version` text(64),
                             `author` text(64),
                             "status" integer NOT NULL,
                             "createTime" DATETIME NOT NULL,
                             "updateTime" DATETIME
);
CREATE INDEX "main"."p_article_slug" ON "p_article" ("slug");
CREATE INDEX "main"."p_article_isTop" ON "p_article" ("isTop");
CREATE INDEX "main"."p_article_type" ON "p_article" ("type");
CREATE INDEX "main"."p_attach_type" ON "p_attach" ("type");
CREATE INDEX "main"."p_attach_saveType" ON "p_attach" ("saveType");
CREATE INDEX "main"."p_category_status" ON "p_category" ("status");
CREATE INDEX "main"."p_comment_articleId" ON "p_comment" ("articleId");
CREATE INDEX "main"."p_comment_status" ON "p_comment" ("status");
CREATE INDEX "main"."p_menu_status" ON "p_menu" ("status");
CREATE INDEX "main"."p_menu_type" ON "p_menu" ("type");
CREATE INDEX "main"."p_user_account" ON "p_user" ("account");
CREATE INDEX "main"."p_user_status" ON "p_user" ("status");
CREATE INDEX "main"."p_tag_slug" ON "p_tag" ("slug");
CREATE INDEX "main"."p_category_slug" ON "p_category" ("slug");

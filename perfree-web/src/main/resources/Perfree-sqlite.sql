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
                             "userId" integer NOT NULL,
                             "isComment" integer,
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
                            "updateTime" DATETIME
);
drop table if exists `p_category`;
CREATE TABLE "p_category" (
                              "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                              "name" text(256) NOT NULL,
                              "pid" integer NOT NULL,
                              "desc" text(512),
                              "count" integer NOT NULL,
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
                             "createTime" DATETIME NOT NULL,
                             "updateTime" DATETIME
);



INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (1, 'WEB_THEME', 'perfree');
INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (2, 'WEB_IS_REGISTER', '1');
INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (3, 'WEB_COMMENT_IS_REVIEW', '0');

INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (1, '管理员', '网站管理员', 'admin', '1608819123890', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (2, '用户', '网站用户', 'user', '1608819123890', NULL);

INSERT INTO `p_menu`(`id`,`pid`, `name`, `url`, `icon`, `seq`, `type`, `target`,`status`, `createTime`, `updateTime`) VALUES ('47d098465f85488898428369b90dd0d3','-1',  '归档', '/archive', 'fa-calendar', 1, 0, 0, 0, '1608819123890', '1608819123890');
INSERT INTO `p_menu`(`id`,`pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES ('7484645890c546d0bba46b67a553452e','-1', '友链', '/page/link', 'fa-user-o', 2, 0, 0, 0, '1608819123890', '1608819123890');


INSERT INTO `p_article`(`id`, `title`, `content`,`contentModel`, `type`, `summary`, `categoryId`, `metaKeywords`, `metaDescription`, `thumbnail`, `isTop`, `status`, `commentCount`, `viewCount`, `userId`, `isComment`, `slug`,`createTime`, `updateTime`) VALUES (1, 'HelloWorld', '欢迎使用 Perfree，如果您看到这篇文章,表示Perfree 已经安装成功.', 'markdown','article', '', NULL, '', '', '', 0, 0, 0, 0, 1, 1, '1',datetime('now'), datetime('now'));
INSERT INTO `p_article`(`id`, `title`, `content`, `contentModel`,`type`, `summary`, `categoryId`, `metaKeywords`, `metaDescription`, `thumbnail`, `isTop`, `status`, `commentCount`, `viewCount`, `userId`, `isComment`, `slug`,`createTime`, `updateTime`) VALUES (2, '友链', '友链','markdown', 'page', '', NULL, '', '', '', 0, 0, 1, 1, 1, 1, 'link',datetime('now'), datetime('now'));
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (3, '文章编辑', '文章编辑', 'editor', '2021-09-15 13:59:43', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (4, '文章贡献', '文章贡献', 'contribute', '2021-09-15 14:00:21', NULL);
UPDATE `p_role` SET `name` = '普通用户', `description` = '网站用户', `code` = 'user', `createTime` = '2020-12-17 13:11:50', `updateTime` = NULL WHERE `id` = 2;


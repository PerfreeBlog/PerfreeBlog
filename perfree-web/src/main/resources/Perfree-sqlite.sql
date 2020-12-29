CREATE TABLE "p_article" (
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
  "createTime" DATETIME NOT NULL,
  "updateTime" DATETIME
);

CREATE TABLE "p_article_tag" (
  "articleId" integer NOT NULL,
  "tagId" integer NOT NULL
);

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

CREATE TABLE "p_link" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text(256) NOT NULL,
  "logo" text(256),
  "desc" text(512),
  "address" text(256) NOT NULL,
  "createTime" DATETIME NOT NULL,
  "updateTime" DATETIME
);

CREATE TABLE "p_menu" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "pid" integer,
  "name" text(128) NOT NULL,
  "url" text(128),
  "icon" text(64),
  "seq" integer,
  "type" integer NOT NULL,
  "target" integer,
  "articleId" integer,
  "status" integer NOT NULL,
  "createTime" DATETIME NOT NULL,
  "updateTime" DATETIME
);

CREATE TABLE "p_option" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "key" text(256) NOT NULL,
  "value" text(512)
);

CREATE TABLE "p_role" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text(32) NOT NULL,
  "description" text(256),
  "code" text(32) NOT NULL,
  "createTime" DATETIME NOT NULL,
  "updateTime" DATETIME
);

CREATE TABLE "p_role_menu" (
  "roleId" integer NOT NULL,
  "menuId" integer NOT NULL
);

CREATE TABLE "p_tag" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text(256) NOT NULL,
  "userId" integer NOT NULL,
  "createTime" DATETIME NOT NULL,
  "updateTime" DATETIME
);

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



INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (1, 'WEB_THEME', 'perfree');
INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (2, 'WEB_IS_REGISTER', '1');
INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (3, 'WEB_COMMENT_IS_REVIEW', '0');

INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (1, '管理员', '网站管理员', 'admin', '1608819123890', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (2, '用户', '网站用户', 'user', '1608819123890', NULL);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 1);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 2);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 3);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 4);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 5);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 6);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 7);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 8);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 9);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 10);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 11);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 12);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 13);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 14);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 15);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 16);


INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (1, -1, '主页', '/admin/dashboard', 'fa-home', 1, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (2, -1, '写文章', '/admin/article/addPage', 'fa-pencil-square-o', 2, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (3, -1, '内容管理', NULL, 'fa-inbox', 3, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (4, -1, '主题管理', NULL, 'fa-tachometer', 4, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (5, 3, '文章管理', '/admin/article', NULL, 1, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (6, 3, '评论管理', '/admin/comment', NULL, 3, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (7, 3, '分类管理', '/admin/category', NULL, 4, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (8, 3, '标签管理', '/admin/tag', NULL, 5, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (9, 3, '附件管理', '/admin/attach', NULL, 6, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (10, 3, '用户管理', '/admin/user', NULL, 7, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (11, 3, '菜单管理', '/admin/menu', NULL, 8, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (12, 4, '所有主题', '/admin/theme', NULL, 1, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (13, 4, '主题设置', '/admin/theme/setting', NULL, 2, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (14, 3, '友链管理', '/admin/link', NULL, 8, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (15, -1, '网站设置', '/admin/setting', 'fa-sliders', 5, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (16, 3, '页面管理', '/admin/page', NULL, 2, 1, 0, NULL, 0, '1608819123890', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (17, -1, '归档', '/archive', 'fa-calendar', 1, 0, 0, NULL, 0, '1608819123890', '1608819123890');
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (18, -1, '友链', '/link', 'fa-user-o', 2, 0, 0, NULL, 0, '1608819123890', '1608819123890');

INSERT INTO `p_article`(`id`, `title`, `content`, `type`, `summary`, `categoryId`, `metaKeywords`, `metaDescription`, `thumbnail`, `isTop`, `status`, `commentCount`, `viewCount`, `userId`, `isComment`, `createTime`, `updateTime`) VALUES (1, 'HelloWorld', '欢迎使用 Perfree，如果您看到这篇文章,表示Perfree 已经安装成功.', 'article', '', NULL, '', '', '', 0, 0, 0, 0, 1, 1, '1608819123890', '1608819123890');



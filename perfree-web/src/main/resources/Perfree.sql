drop table if exists `p_article`;
CREATE TABLE `p_article`  (
                              `id` int(0) NOT NULL AUTO_INCREMENT,
                              `title` varchar(256) NOT NULL COMMENT '文章标题',
                              `content` longtext NULL COMMENT '文章内容',
                              `type` varchar(32) NULL DEFAULT NULL COMMENT '文章类型:article文章,page页面',
                              `summary` varchar(1024) NULL DEFAULT NULL COMMENT '文章摘要',
                              `categoryId` int(0) NULL DEFAULT NULL COMMENT '所属分类',
                              `metaKeywords` varchar(512) NULL DEFAULT NULL COMMENT 'SEO关键字',
                              `metaDescription` varchar(512) NULL DEFAULT NULL COMMENT 'SEO描述',
                              `thumbnail` varchar(256) NULL DEFAULT NULL COMMENT '缩略图',
                              `slug` varchar(128) NULL DEFAULT NULL COMMENT 'slug',
                              `isTop` int(0) NULL DEFAULT 0 COMMENT '是否置顶0:否,1:是',
                              `status` int(0) NULL DEFAULT 0 COMMENT '状态0:已发布,1:草稿',
                              `commentCount` int(0) NULL DEFAULT 0 COMMENT '评论数',
                              `viewCount` int(0) NULL DEFAULT 0 COMMENT '访问量',
                              `userId` int(0) NOT NULL COMMENT '创建人',
                              `isComment` int(0) NULL DEFAULT 1 COMMENT '是否允许评论0:否,1是',
                              `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                              `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                              PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_article_tag`;
CREATE TABLE `p_article_tag`  (
                                  `articleId` int(0) NOT NULL COMMENT '文章id',
                                  `tagId` int(0) NOT NULL COMMENT '标签id'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_attach`;
CREATE TABLE `p_attach`  (
                             `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                             `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '附件名',
                             `desc` varchar(512) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '附件描述',
                             `path` varchar(512) CHARACTER SET utf8mb4 NOT NULL COMMENT '附件路径',
                             `suffix` varchar(32) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '附件后缀',
                             `flag` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '标识',
                             `type` varchar(32) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '文件类型',
                             `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                             `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                             PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_category`;
CREATE TABLE `p_category`  (
                               `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                               `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '分类名',
                               `pid` int(0) NOT NULL DEFAULT -1 COMMENT '父级id',
                               `desc` varchar(512) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '描述',
                               `count` int(0) NOT NULL DEFAULT 0 COMMENT '文章数量',
                               `metaKeywords` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'SEO关键字',
                               `metaDescription` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'SEO描述内容',
                               `status` int(0) NOT NULL DEFAULT 0 COMMENT '状态0:正常,1禁用',
                               `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                               `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                               PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COMMENT = '分类表' ROW_FORMAT = Dynamic;

drop table if exists `p_comment`;
CREATE TABLE `p_comment`  (
                              `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                              `articleId` int(0) NOT NULL COMMENT '文章id',
                              `pid` int(0) NULL DEFAULT -1 COMMENT '父级id',
                              `topPid` int(0) NULL DEFAULT -1 COMMENT '顶层父级id',
                              `userId` int(0) NULL DEFAULT NULL COMMENT '用户iD',
                              `content` varchar(2048) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '评论内容',
                              `status` int(0) NULL DEFAULT 0 COMMENT '状态:0正常,1:待审核',
                              `avatar` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '头像',
                              `website` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '网站地址',
                              `email` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '邮箱',
                              `userName` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '评论人',
                              `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                              `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                              PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_user`;
CREATE TABLE `p_user`  (
                           `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `account` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '账户',
                           `userName` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '账户名',
                           `password` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '密码',
                           `salt` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '盐值',
                           `status` int(0) NOT NULL DEFAULT 0 COMMENT '状态:0正常,1禁用',
                           `avatar` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '头像',
                           `roleId` int(0) NOT NULL COMMENT '角色id',
                           `email` varchar(128) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '邮箱',
                           `website` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '网站地址',
                           `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                           `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_link`;
CREATE TABLE `p_link`  (
                           `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '网站名',
                           `logo` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '网站logo',
                           `desc` varchar(512) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '网站描述',
                           `address` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '网站地址',
                           `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                           `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_menu`;
CREATE TABLE `p_menu`  (
                           `id` varchar(64) CHARACTER SET utf8mb4 NOT NULL COMMENT '主键',
                           `pid` varchar(64) CHARACTER SET utf8mb4 NULL DEFAULT '-1' COMMENT '父级id',
                           `name` varchar(128) CHARACTER SET utf8mb4 NOT NULL COMMENT '菜单名',
                           `url` varchar(128) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '菜单链接',
                           `icon` varchar(64) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '菜单图标',
                           `seq` int(0) NULL DEFAULT NULL COMMENT '排序序号',
                           `type` int(0) NOT NULL DEFAULT 0 COMMENT '菜单类型0:前台,1:后台',
                           `target` int(0) NULL DEFAULT 0 COMMENT '菜单打开方式:0本页,1:新窗口',
                           `status` int(0) NOT NULL DEFAULT 0 COMMENT '菜单状态0:启用,1禁用',
                           `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                           `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_option`;
CREATE TABLE `p_option`  (
                             `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                             `key` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT 'key',
                             `value` text CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'value',
                             PRIMARY KEY (`id`, `key`) USING BTREE,
                             UNIQUE INDEX `key`(`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_role`;
CREATE TABLE `p_role`  (
                           `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `name` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '角色名',
                           `description` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '角色描述',
                           `code` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '角色码',
                           `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                           `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_role_menu`;
CREATE TABLE `p_role_menu`  (
                                `roleId` int(0) NOT NULL COMMENT '角色id',
                                `menuId` varchar(64) CHARACTER SET utf8mb4  NOT NULL COMMENT '菜单id'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

drop table if exists `p_tag`;
CREATE TABLE `p_tag`  (
                          `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                          `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '标签名',
                          `userId` int(0) NOT NULL COMMENT '添加人',
                          `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                          `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
                          PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;
drop table if exists `p_plugin`;
CREATE TABLE `p_plugin`  (
                       `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                       `name` varchar(256) CHARACTER SET utf8mb4 NULL COMMENT '插件名',
                       `path` varchar(256) CHARACTER SET utf8mb4 NOT NULL COMMENT '路径',
                       `desc` varchar(512) CHARACTER SET utf8mb4 NULL COMMENT '插件描述',
                       `version` varchar(64) CHARACTER SET utf8mb4 NULL COMMENT '版本',
                       `author` varchar(64) CHARACTER SET utf8mb4 NULL COMMENT '作者',
                       `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                       `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                       PRIMARY KEY (`id`) USING BTREE
)ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (1, 'WEB_THEME', 'perfree');
INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (2, 'WEB_IS_REGISTER', '1');
INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (3, 'WEB_COMMENT_IS_REVIEW', '0');

INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (1, '管理员', '网站管理员', 'admin', '2020-12-17 13:11:31', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (2, '用户', '网站用户', 'user', '2020-12-17 13:11:50', NULL);

INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES ('47d098465f85488898428369b90dd0d3','-1', '归档', '/archive', 'fa-calendar', 1, 0, 0,0, '2020-11-27 08:06:10', '2020-12-14 03:26:37');
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES ('7484645890c546d0bba46b67a553452e','-1', '友链', '/page/link', 'fa-user-o', 2, 0, 0, 0, '2020-12-11 03:12:49', '2020-12-14 03:26:59');

INSERT INTO `p_article`(`id`, `title`, `content`, `type`, `summary`, `categoryId`, `metaKeywords`, `metaDescription`, `thumbnail`, `isTop`, `status`, `commentCount`, `viewCount`, `userId`, `isComment`,`slug`, `createTime`, `updateTime`) VALUES (1, 'HelloWorld', '欢迎使用 Perfree，如果您看到这篇文章,表示Perfree 已经安装成功.', 'article', '', NULL, '', '', '', 0, 0, 0, 0, 1, 1, '1',now(), now());
INSERT INTO `p_article`(`id`, `title`, `content`, `type`, `summary`, `categoryId`, `metaKeywords`, `metaDescription`, `thumbnail`, `isTop`, `status`, `commentCount`, `viewCount`, `userId`, `isComment`, `slug`, `createTime`, `updateTime`) VALUES (2, '友链', '友链', 'page', '', NULL, '', '', '', 0, 0, 1, 1, 1, 1, 'link',now(), now());
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (3, '文章编辑', '文章编辑', 'editor', '2021-09-15 13:59:43', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (4, '文章贡献', '文章贡献', 'contribute', '2021-09-15 14:00:21', NULL);
UPDATE `p_role` SET `name` = '普通用户', `description` = '网站用户', `code` = 'user', `createTime` = '2020-12-17 13:11:50', `updateTime` = NULL WHERE `id` = 2;


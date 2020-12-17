drop table if exists `p_article`;
CREATE TABLE `p_article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL COMMENT '文章标题',
  `content` longtext NULL COMMENT '文章内容',
  `summary` varchar(1024) NULL DEFAULT NULL COMMENT '文章摘要',
  `categoryId` int(0) NULL DEFAULT NULL COMMENT '所属分类',
  `metaKeywords` varchar(512) NULL DEFAULT NULL COMMENT 'SEO关键字',
  `metaDescription` varchar(512) NULL DEFAULT NULL COMMENT 'SEO描述',
  `thumbnail` varchar(256) NULL DEFAULT NULL COMMENT '缩略图',
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
  `userId` int(0) NULL DEFAULT NULL COMMENT '用户iD',
  `content` varchar(2048) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '评论内容',
  `status` int(0) NULL DEFAULT 0 COMMENT '状态:0正常,1:待审核',
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
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pid` int(0) NULL DEFAULT -1 COMMENT '父级id',
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
  `value` varchar(512) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'value',
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
  `menuId` int(0) NOT NULL COMMENT '菜单id'
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
  `sex` int(0) NULL DEFAULT NULL COMMENT '性别0:女,1男',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;

INSERT INTO `p_option`(`id`, `key`, `value`) VALUES (1, 'WEB_THEME', 'perfree');
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (1, '管理员', '网站管理员', 'admin', '2020-12-17 13:11:31', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (2, '用户', '网站用户', 'user', '2020-12-17 13:11:50', NULL);
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

INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (1, -1, '主页', '/admin/dashboard', 'fa-home', 1, 1, 0, 0, '2020-11-19 15:57:28', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (2, -1, '写文章', '/admin/article/addPage', 'fa-pencil-square-o', 2, 1, 0, 0, '2020-11-19 15:58:06', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (3, -1, '内容管理', NULL, 'fa-inbox', 3, 1, 0, 0, '2020-11-19 15:58:37', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (4, -1, '主题管理', NULL, 'fa-tachometer', 4, 1, 0, 0, '2020-11-19 15:59:01', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (5, 3, '文章管理', '/admin/article', NULL, 1, 1, 0, 0, '2020-11-19 15:59:32', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (6, 3, '评论管理', '/admin/comment', NULL, 2, 1, 0, 0, '2020-11-19 16:00:01', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (7, 3, '分类管理', '/admin/category', NULL, 3, 1, 0, 0, '2020-11-19 16:00:46', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (8, 3, '标签管理', '/admin/tag', NULL, 4, 1, 0, 0, '2020-11-19 16:01:14', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (9, 3, '附件管理', '/admin/attach', NULL, 5, 1, 0, 0, '2020-11-19 16:01:41', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (10, 3, '用户管理', '/admin/user', NULL, 6, 1, 0, 0, '2020-11-19 16:02:07', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (11, 3, '菜单管理', '/admin/menu', NULL, 7, 1, 0, 0, '2020-11-19 16:02:30', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (12, 4, '所有主题', '/admin/theme', NULL, 1, 1, 0, 0, '2020-11-19 16:03:08', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (13, 4, '主题设置', '/admin/theme/setting', NULL, 2, 1, 0, 0, '2020-11-19 16:03:42', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (14, 3, '友链管理', '/admin/link', NULL, 8, 1, 0, 0, '2020-12-15 09:07:00', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (15, -1, '网站设置', '/admin/setting', 'fa-sliders', 5, 1, 0, 0, '2020-11-19 16:04:37', NULL);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (16, -1, '归档', '/page/archive', 'fa-calendar', 1, 0, 0, 0, '2020-11-27 08:06:10', '2020-12-14 03:26:37');
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES (17, -1, '朋友', '/page/link', 'fa-user-o', 2, 0, 1, 0, '2020-12-11 03:12:49', '2020-12-14 03:26:59');


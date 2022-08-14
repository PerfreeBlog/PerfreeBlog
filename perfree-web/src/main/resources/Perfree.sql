drop table if exists `p_article`;
CREATE TABLE `p_article`  (
                              `id` int(0) NOT NULL AUTO_INCREMENT,
                              `title` varchar(256) NOT NULL COMMENT '文章标题',
                              `content` longtext NULL COMMENT '文章内容',
                              `contentModel` varchar(32) NULL COMMENT '文章内容类型:html/markdown',
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
                              `greatCount` int(0) NULL DEFAULT 0 COMMENT '访问量',
                              `userId` int(0) NOT NULL COMMENT '创建人',
                              `isComment` int(0) NULL DEFAULT 1 COMMENT '是否允许评论0:否,1是',
                              `flag` varchar(256) NULL COMMENT '标识',
                              `template` varchar(256) NULL COMMENT '模板',
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
                             `saveType` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '存储方式',
                             `fileKey` varchar(512) CHARACTER SET utf8mb4 NOT NULL COMMENT 'fileKey',
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
                               `thumbnail` varchar(256) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT '封面图',
                               `slug` varchar(128) CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'slug',
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
                          `color` varchar(128) CHARACTER SET utf8mb4 NULL COMMENT '颜色',
                          `thumbnail` varchar(256) CHARACTER SET utf8mb4 NULL COMMENT '缩略图',
                          `slug` varchar(128) CHARACTER SET utf8mb4 NULL COMMENT 'slug',
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
                       `status` int(0) NOT NULL DEFAULT 0 COMMENT '插件状态:0禁用,1启用',
                       `createTime` datetime(0) NOT NULL COMMENT '创建时间',
                       `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
                       PRIMARY KEY (`id`) USING BTREE
)ENGINE = InnoDB CHARACTER SET = utf8mb4 ROW_FORMAT = Dynamic;
ALTER TABLE `p_article` ADD INDEX `slug`(`slug`),ADD INDEX `isTop`(`isTop`), ADD INDEX `type`(`type`), ADD INDEX `categoryId`(`categoryId`);
ALTER TABLE `p_attach` ADD INDEX `type`(`type`) , ADD INDEX `saveType`(`saveType`);
ALTER TABLE `p_category` ADD INDEX `status`(`status`),ADD INDEX `slug`(`slug`);
ALTER TABLE `p_tag` ADD INDEX `slug`(`slug`);
ALTER TABLE `p_comment` ADD INDEX `articleId`(`articleId`), ADD INDEX `status`(`status`);
ALTER TABLE `p_menu` ADD INDEX `type`(`type`), ADD INDEX `status`(`status`);
ALTER TABLE `p_user` ADD INDEX `account`(`account`), ADD INDEX `status`(`status`);

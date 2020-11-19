/*
 Navicat Premium Data Transfer

 Source Server         : 本机mysql
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : perfree

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 19/11/2020 15:45:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for p_article
-- ----------------------------
DROP TABLE IF EXISTS `p_article`;
CREATE TABLE `p_article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '文章内容',
  `summary` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章摘要',
  `categoryId` int(0) NULL DEFAULT NULL COMMENT '所属分类',
  `metaKeywords` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO关键字',
  `metaDescription` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO描述',
  `thumbnail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '缩略图',
  `isTop` int(0) NULL DEFAULT 0 COMMENT '是否置顶0:否,1:是',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '访问密码',
  `status` int(0) NULL DEFAULT 0 COMMENT '状态0:已发布,1:草稿',
  `commentCount` int(0) NULL DEFAULT 0 COMMENT '评论数',
  `viewCount` int(0) NULL DEFAULT 0 COMMENT '访问量',
  `userId` int(0) NOT NULL COMMENT '创建人',
  `isComment` int(0) NULL DEFAULT 1 COMMENT '是否允许评论0:否,1是',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_article
-- ----------------------------
INSERT INTO `p_article` VALUES (43, '测试文章', '测试文章', '测试文章', 9, '测试文章', '测试文章', '/attach/20201119/2fb8202d31fc48a2854cd683c683a4bb.jpg', 0, '123456', 1, 0, 0, 1, 1, '2020-11-19 03:42:24', '2020-11-19 03:42:28');

-- ----------------------------
-- Table structure for p_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `p_article_tag`;
CREATE TABLE `p_article_tag`  (
  `articleId` int(0) NOT NULL COMMENT '文章id',
  `tagId` int(0) NOT NULL COMMENT '标签id'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_article_tag
-- ----------------------------
INSERT INTO `p_article_tag` VALUES (43, 43);

-- ----------------------------
-- Table structure for p_attach
-- ----------------------------
DROP TABLE IF EXISTS `p_attach`;
CREATE TABLE `p_attach`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '附件名',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '附件描述',
  `path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '附件路径',
  `suffix` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '附件后缀',
  `flag` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标识',
  `type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件类型',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_attach
-- ----------------------------
INSERT INTO `p_attach` VALUES (45, '1.jpg', '', '/attach/20201119/2fb8202d31fc48a2854cd683c683a4bb.jpg', '.jpg', '', 'img', '2020-11-19 03:41:56', NULL);

-- ----------------------------
-- Table structure for p_category
-- ----------------------------
DROP TABLE IF EXISTS `p_category`;
CREATE TABLE `p_category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名',
  `pid` int(0) NOT NULL DEFAULT -1 COMMENT '父级id',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `count` int(0) NOT NULL DEFAULT 0 COMMENT '文章数量',
  `metaKeywords` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO关键字',
  `metaDescription` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO描述内容',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT '状态0:正常,1禁用',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_category
-- ----------------------------
INSERT INTO `p_category` VALUES (7, '232', 2, '2323', 0, '23232', '3232', 0, '2020-11-13 07:31:22', NULL);
INSERT INTO `p_category` VALUES (9, 'java', -1, '从入门到入土', 0, '', '', 0, '2020-11-19 03:39:51', NULL);

-- ----------------------------
-- Table structure for p_comment
-- ----------------------------
DROP TABLE IF EXISTS `p_comment`;
CREATE TABLE `p_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `articleId` int(0) NOT NULL COMMENT '文章id',
  `pid` int(0) NULL DEFAULT -1 COMMENT '父级id',
  `userName` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '评论人名称',
  `userId` int(0) NULL DEFAULT NULL COMMENT '用户iD',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '评论内容',
  `status` int(0) NULL DEFAULT 0 COMMENT '状态:0正常,1:待审核',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_comment
-- ----------------------------
INSERT INTO `p_comment` VALUES (1, 43, -1, '11111', 1, '1', '1', 0, '2020-11-19 14:39:31', '2020-11-19 06:44:42');

-- ----------------------------
-- Table structure for p_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_menu`;
CREATE TABLE `p_menu`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pid` int(0) NULL DEFAULT -1 COMMENT '父级id',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单名',
  `url` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单链接',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `seq` int(0) NULL DEFAULT NULL COMMENT '排序序号',
  `type` int(0) NOT NULL DEFAULT 0 COMMENT '菜单类型0:前台,1:后台',
  `target` int(0) NULL DEFAULT 0 COMMENT '菜单打开方式:0本页,1:新窗口',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT '菜单状态0:启用,1禁用',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_menu
-- ----------------------------
INSERT INTO `p_menu` VALUES (1, -1, '主页', '/admin/dashboard', 'fa-home', 1, 1, 0, 0, '2020-08-31 17:15:08', '2020-08-31 17:15:10');
INSERT INTO `p_menu` VALUES (2, -1, '文章', NULL, 'fa-book', 2, 1, 0, 0, '2020-08-31 17:15:39', '2020-08-31 17:15:41');
INSERT INTO `p_menu` VALUES (3, 2, '列表', '/admin/article', NULL, 1, 1, 0, 0, '2020-08-31 17:16:34', '2020-08-31 17:16:36');
INSERT INTO `p_menu` VALUES (4, 2, '写文章', '/admin/article/addPage', '', 2, 1, 0, 0, '2020-08-31 17:16:58', '2020-08-31 17:17:00');
INSERT INTO `p_menu` VALUES (5, -1, '评论', '/admin/comment', 'fa-comment', 3, 1, 0, 0, '2020-08-31 17:17:29', '2020-08-31 17:17:32');
INSERT INTO `p_menu` VALUES (6, -1, '分类', '/admin/category', 'fa-bars', 4, 1, 0, 0, '2020-08-31 17:17:55', '2020-08-31 17:17:57');
INSERT INTO `p_menu` VALUES (7, -1, '标签', '/admin/tag', 'fa-tags', 5, 1, 0, 0, '2020-08-31 17:18:18', '2020-08-31 17:18:20');
INSERT INTO `p_menu` VALUES (8, -1, '主题', '', 'fa-tachometer', 6, 1, 0, 0, '2020-08-31 17:18:51', '2020-08-31 17:18:53');
INSERT INTO `p_menu` VALUES (9, -1, '设置', '/admin/dashboard', 'fa-sliders', 10, 1, 0, 0, '2020-08-31 17:19:40', '2020-08-31 17:19:42');
INSERT INTO `p_menu` VALUES (10, -1, '用户', '/admin/user', 'fa-user', 7, 1, 0, 0, '2020-11-11 13:30:44', '2020-11-11 13:30:46');
INSERT INTO `p_menu` VALUES (11, -1, '菜单', '/admin/menu', 'fa-bars', 8, 1, 0, 0, '2020-11-12 15:55:30', '2020-11-17 20:33:28');
INSERT INTO `p_menu` VALUES (12, -1, '附件', '/admin/attach', 'fa-file-archive-o', 9, 1, 0, 0, '2020-11-17 20:33:26', '2020-11-17 20:33:31');
INSERT INTO `p_menu` VALUES (13, 8, '所有主题', '/admin/dashboard', NULL, 1, 1, 0, 0, '2020-11-19 15:26:54', '2020-11-19 15:26:57');
INSERT INTO `p_menu` VALUES (14, 8, '主题设置', '/admin/dashboard', NULL, 2, 1, 0, 0, '2020-11-19 15:27:36', '2020-11-19 15:27:38');
INSERT INTO `p_menu` VALUES (15, 8, '安装主题', '/admin/dashboard', NULL, 3, 1, 0, 0, '2020-11-19 15:28:00', '2020-11-19 15:28:02');

-- ----------------------------
-- Table structure for p_option
-- ----------------------------
DROP TABLE IF EXISTS `p_option`;
CREATE TABLE `p_option`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `key` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'key',
  `value` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'value',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_option
-- ----------------------------

-- ----------------------------
-- Table structure for p_role
-- ----------------------------
DROP TABLE IF EXISTS `p_role`;
CREATE TABLE `p_role`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名',
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色码',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_role
-- ----------------------------
INSERT INTO `p_role` VALUES (1, 'superAdmin', '超级管理员', 'superAdmin', '2020-08-31 16:44:01', '2020-08-31 16:44:04');
INSERT INTO `p_role` VALUES (2, 'admin', '管理员', 'admin', '2020-08-31 16:44:17', '2020-08-31 16:44:20');
INSERT INTO `p_role` VALUES (3, 'user', '用户', 'user', '2020-08-31 16:44:33', '2020-08-31 16:44:36');

-- ----------------------------
-- Table structure for p_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_role_menu`;
CREATE TABLE `p_role_menu`  (
  `roleId` int(0) NOT NULL COMMENT '角色id',
  `menuId` int(0) NOT NULL COMMENT '菜单id'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_role_menu
-- ----------------------------
INSERT INTO `p_role_menu` VALUES (1, 1);
INSERT INTO `p_role_menu` VALUES (1, 2);
INSERT INTO `p_role_menu` VALUES (1, 3);
INSERT INTO `p_role_menu` VALUES (1, 4);
INSERT INTO `p_role_menu` VALUES (1, 5);
INSERT INTO `p_role_menu` VALUES (1, 6);
INSERT INTO `p_role_menu` VALUES (1, 7);
INSERT INTO `p_role_menu` VALUES (1, 8);
INSERT INTO `p_role_menu` VALUES (1, 9);
INSERT INTO `p_role_menu` VALUES (1, 10);
INSERT INTO `p_role_menu` VALUES (1, 11);
INSERT INTO `p_role_menu` VALUES (1, 12);
INSERT INTO `p_role_menu` VALUES (1, 13);
INSERT INTO `p_role_menu` VALUES (1, 14);
INSERT INTO `p_role_menu` VALUES (1, 15);

-- ----------------------------
-- Table structure for p_tag
-- ----------------------------
DROP TABLE IF EXISTS `p_tag`;
CREATE TABLE `p_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标签名',
  `userId` int(0) NOT NULL COMMENT '添加人',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_tag
-- ----------------------------
INSERT INTO `p_tag` VALUES (43, 'java', 1, '2020-11-19 03:39:27', NULL);

-- ----------------------------
-- Table structure for p_user
-- ----------------------------
DROP TABLE IF EXISTS `p_user`;
CREATE TABLE `p_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账户',
  `userName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '盐值',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT '状态:0正常,1禁用',
  `avatar` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `roleId` int(0) NOT NULL COMMENT '角色id',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `sex` int(0) NULL DEFAULT NULL COMMENT '性别0:女,1男',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_user
-- ----------------------------
INSERT INTO `p_user` VALUES (1, 'admin', 'admin', 'd8c4bf31094a3fa994e4d249df0b53a3', '53328f9638c84bb4aac05c5dbbd85677', 0, 'https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=', 1, NULL, NULL, '2020-08-31 16:43:12', '2020-08-31 16:43:14');
INSERT INTO `p_user` VALUES (12, 'user', 'user', '768f6f5f6fd13559637365e9a727e916', 'f9d785f9e3a845a9a29507c21e8cce6c', 0, '/avatar/20201119/3bd8f23b80d84555944f3fb4379c5e92.jpg', 3, NULL, NULL, '2020-11-19 03:40:08', NULL);
INSERT INTO `p_user` VALUES (13, '2313', '2312', '9a40013e64454404eb2db4ba0928c0e0', '48d22a963e6c4e7aba30d364e19b833b', 0, '/avatar/20201119/d92cfd18ab3c48a48cfb7e4890997f53.jpg', 1, '', 0, '2020-11-19 05:23:56', NULL);

SET FOREIGN_KEY_CHECKS = 1;

/*
 Navicat Premium Data Transfer

 Source Server         : 本机mysql
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : perfree

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 15/11/2020 13:47:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_attach
-- ----------------------------
INSERT INTO `p_attach` VALUES (1, '96ef23c83008aa227e48deb9c1a1d299.gif', NULL, '\\attach\\20201115\\d975fc2032e44e04a9f8140f297134db.gif', '.gif', NULL, 'img', '2020-11-15 05:43:55', NULL);
INSERT INTO `p_attach` VALUES (2, '96ef23c83008aa227e48deb9c1a1d299.gif', NULL, '\\attach\\20201115\\e932146150b049d1a854c2f23beb3c6b.gif', '.gif', NULL, 'img', '2020-11-15 05:45:29', NULL);
INSERT INTO `p_attach` VALUES (3, 'bird.png', NULL, '\\attach\\20201115\\748c7e0e898f41809f13ddbd4dcaf5ba.png', '.png', NULL, 'img', '2020-11-15 05:45:54', NULL);

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
INSERT INTO `p_category` VALUES (1, '1', -1, '1', 0, '	是否单行显示，溢出悬浮展开	是否单行显示，溢出悬浮展开	是否单行显示，溢出悬浮展开	是否单行显示，溢出悬浮展开22222', '1', 0, '2020-11-13 14:50:23', '2020-11-13 07:39:19');
INSERT INTO `p_category` VALUES (2, '2', 1, '2', 2, '2', '2', 0, '2020-11-13 14:50:48', '2020-11-13 07:39:19');
INSERT INTO `p_category` VALUES (7, '232', 2, '2323', 0, '23232', '3232', 0, '2020-11-13 07:31:22', NULL);

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
INSERT INTO `p_menu` VALUES (4, 2, '新建', '/admin/articleCreate', '', 2, 1, 0, 0, '2020-08-31 17:16:58', '2020-08-31 17:17:00');
INSERT INTO `p_menu` VALUES (5, -1, '评论', '/admin/dashboard', 'fa-comment', 3, 1, 0, 0, '2020-08-31 17:17:29', '2020-08-31 17:17:32');
INSERT INTO `p_menu` VALUES (6, -1, '分类', '/admin/category', 'fa-bars', 4, 1, 0, 0, '2020-08-31 17:17:55', '2020-08-31 17:17:57');
INSERT INTO `p_menu` VALUES (7, -1, '标签', '/admin/tag', 'fa-tags', 5, 1, 0, 0, '2020-08-31 17:18:18', '2020-08-31 17:18:20');
INSERT INTO `p_menu` VALUES (8, -1, '主题', '/admin/dashboard', 'fa-tachometer', 6, 1, 0, 0, '2020-08-31 17:18:51', '2020-08-31 17:18:53');
INSERT INTO `p_menu` VALUES (9, -1, '设置', '/admin/dashboard', 'fa-sliders', 9, 1, 0, 0, '2020-08-31 17:19:40', '2020-08-31 17:19:42');
INSERT INTO `p_menu` VALUES (10, -1, '用户', '/admin/user', 'fa-user', 7, 1, 0, 0, '2020-11-11 13:30:44', '2020-11-11 13:30:46');
INSERT INTO `p_menu` VALUES (11, -1, '菜单', '/admin/menu', 'fa-bars', 8, 1, 0, 0, '2020-11-12 15:55:30', NULL);
INSERT INTO `p_menu` VALUES (20, -1, '2', '1', '1', 1, 0, 1, 0, '2020-11-13 03:41:39', '2020-11-13 07:21:06');
INSERT INTO `p_menu` VALUES (24, 23, 'dsada', 'dsads', 'dsadas', 2, 0, 1, 0, '2020-11-13 03:55:04', NULL);
INSERT INTO `p_menu` VALUES (27, 26, '3', '3', '3', 3, 0, 1, 0, '2020-11-13 03:55:31', NULL);
INSERT INTO `p_menu` VALUES (28, -1, '22222', '23333', '1', 45, 0, 0, 0, '2020-11-13 05:13:06', '2020-11-13 05:18:00');
INSERT INTO `p_menu` VALUES (29, 20, '12', '221', '12', 21, 0, 1, 0, '2020-11-13 05:24:37', NULL);

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

-- ----------------------------
-- Table structure for p_tag
-- ----------------------------
DROP TABLE IF EXISTS `p_tag`;
CREATE TABLE `p_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标签名',
  `count` int(0) NOT NULL DEFAULT 0 COMMENT '文章数量',
  `userId` int(0) NOT NULL COMMENT '添加人',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_tag
-- ----------------------------
INSERT INTO `p_tag` VALUES (11, '打撒大撒放到', 0, 1, '2020-11-11 01:03:07', NULL);
INSERT INTO `p_tag` VALUES (13, '我去额去我', 0, 1, '2020-11-11 01:04:06', NULL);
INSERT INTO `p_tag` VALUES (26, '散打按时', 0, 1, '2020-11-11 04:35:31', NULL);
INSERT INTO `p_tag` VALUES (27, '1', 0, 1, '2020-11-11 08:53:53', NULL);

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
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_user
-- ----------------------------
INSERT INTO `p_user` VALUES (1, 'admin', 'admin', 'd8c4bf31094a3fa994e4d249df0b53a3', '53328f9638c84bb4aac05c5dbbd85677', 0, 'https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=', 1, '2020-08-31 16:43:12', '2020-08-31 16:43:14');
INSERT INTO `p_user` VALUES (9, '12321321', '213qwq221222222', 'b0d86782c6487b6d4f1416c33acd93fb', '79a33b4d54374c01bcf0552cd2e4c928', 0, '/avatar/12-11-2020/ffbaff9bbece4c7eaa899aedc5dcd357.jpg', 1, '2020-11-12 06:55:53', '2020-11-13 05:17:29');
INSERT INTO `p_user` VALUES (10, 'love', '李莉', '25cf33fa7efa160fa473c5f720a9667e', '3220fde8863343bc935ba8b0303caf82', 0, '/avatar/13-11-2020/5a5e6a396e304634bd7fea9eec52c61a.jpg', 1, '2020-11-13 12:27:03', NULL);
INSERT INTO `p_user` VALUES (11, '3213', '2312', '777b52ce8ab46aeb35c84f9dc5245fbf', '0a2eff2c8f194ed3adbb6933913ea893', 0, '\\avatar\\14112020\\d684c95f083048b4afb49be2d8189405.jpg', 1, '2020-11-14 15:03:08', NULL);

SET FOREIGN_KEY_CHECKS = 1;

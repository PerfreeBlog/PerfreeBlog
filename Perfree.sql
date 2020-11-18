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

 Date: 18/11/2020 16:44:37
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
  `status` int(0) NULL DEFAULT 0 COMMENT '状态0:已发布,1:草稿,2:隐藏',
  `commentCount` int(0) NULL DEFAULT 0 COMMENT '评论数',
  `viewCount` int(0) NULL DEFAULT 0 COMMENT '访问量',
  `userId` int(0) NOT NULL COMMENT '创建人',
  `isComment` int(0) NULL DEFAULT 1 COMMENT '是否允许评论0:否,1是',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_article
-- ----------------------------
INSERT INTO `p_article` VALUES (2, '111', '11111', '', 1, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 06:19:56', NULL);
INSERT INTO `p_article` VALUES (12, '2222222', '22222', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 07:52:12', NULL);
INSERT INTO `p_article` VALUES (13, '343', '34324233432', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 07:53:43', NULL);
INSERT INTO `p_article` VALUES (14, '223', '3232323', '', NULL, '', '', '', 1, '', 0, 0, 0, 1, 1, '2020-11-18 07:58:25', NULL);
INSERT INTO `p_article` VALUES (15, '232321', '321321321', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:04:18', NULL);
INSERT INTO `p_article` VALUES (16, '123', '321321321', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:11:19', NULL);
INSERT INTO `p_article` VALUES (17, '231232', '321321321321321', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:11:33', NULL);
INSERT INTO `p_article` VALUES (18, '23232', '13213213213213', '', 1, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:13:43', NULL);
INSERT INTO `p_article` VALUES (19, '213', '213213213213', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:14:22', NULL);
INSERT INTO `p_article` VALUES (20, '23213', '2313213', '', NULL, '', '', '', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:16:20', NULL);
INSERT INTO `p_article` VALUES (21, '小丁小丁小丁小丁小丁', '小丁\n小丁小丁小丁小丁小丁小丁![](/attach/20201118/ee9d3a3e5fe9402094edcbf4b50e3e8c.jpg)\n![](/attach/20201118/c72a3e7062544304b4e25fd7464fdc84.jpg)', '', 1, '', '', '/attach/20201118/ee9d3a3e5fe9402094edcbf4b50e3e8c.jpg', 0, 'b0d062c3dd3afba8d9c73bf627b6f954', 0, 0, 0, 1, 1, '2020-11-18 08:32:21', NULL);
INSERT INTO `p_article` VALUES (22, '丁', '12321321321321', '', 1, '', '', '/attach/20201118/ee9d3a3e5fe9402094edcbf4b50e3e8c.jpg', 0, '', 0, 0, 0, 1, 1, '2020-11-18 08:34:56', NULL);

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
INSERT INTO `p_article_tag` VALUES (2, 39);
INSERT INTO `p_article_tag` VALUES (2, 38);
INSERT INTO `p_article_tag` VALUES (3, 39);
INSERT INTO `p_article_tag` VALUES (3, 38);
INSERT INTO `p_article_tag` VALUES (3, 40);
INSERT INTO `p_article_tag` VALUES (4, 39);
INSERT INTO `p_article_tag` VALUES (4, 38);
INSERT INTO `p_article_tag` VALUES (4, 40);
INSERT INTO `p_article_tag` VALUES (15, 40);
INSERT INTO `p_article_tag` VALUES (15, 39);
INSERT INTO `p_article_tag` VALUES (15, 38);
INSERT INTO `p_article_tag` VALUES (15, 37);
INSERT INTO `p_article_tag` VALUES (15, 36);
INSERT INTO `p_article_tag` VALUES (15, 35);
INSERT INTO `p_article_tag` VALUES (16, 40);
INSERT INTO `p_article_tag` VALUES (17, 39);
INSERT INTO `p_article_tag` VALUES (17, 38);
INSERT INTO `p_article_tag` VALUES (17, 37);
INSERT INTO `p_article_tag` VALUES (17, 36);
INSERT INTO `p_article_tag` VALUES (18, 40);
INSERT INTO `p_article_tag` VALUES (18, 39);
INSERT INTO `p_article_tag` VALUES (18, 38);
INSERT INTO `p_article_tag` VALUES (18, 37);
INSERT INTO `p_article_tag` VALUES (19, 40);
INSERT INTO `p_article_tag` VALUES (19, 39);
INSERT INTO `p_article_tag` VALUES (19, 38);
INSERT INTO `p_article_tag` VALUES (19, 37);
INSERT INTO `p_article_tag` VALUES (20, 39);
INSERT INTO `p_article_tag` VALUES (20, 38);
INSERT INTO `p_article_tag` VALUES (20, 37);
INSERT INTO `p_article_tag` VALUES (20, 36);
INSERT INTO `p_article_tag` VALUES (21, 39);
INSERT INTO `p_article_tag` VALUES (21, 40);
INSERT INTO `p_article_tag` VALUES (21, 38);
INSERT INTO `p_article_tag` VALUES (21, 41);
INSERT INTO `p_article_tag` VALUES (22, 41);
INSERT INTO `p_article_tag` VALUES (22, 40);
INSERT INTO `p_article_tag` VALUES (22, 39);

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_attach
-- ----------------------------
INSERT INTO `p_attach` VALUES (32, '1.mp3', '', '/attach/20201118/a6770ade777f46c0a20a0ca12b1330ac.mp3', '.mp3', '', 'audio', '2020-11-18 02:32:19', NULL);
INSERT INTO `p_attach` VALUES (33, '2.jpg', '', '/attach/20201118/12040a5f3c224259b5269e738f97996b.jpg', '.jpg', '', 'img', '2020-11-18 02:38:08', NULL);
INSERT INTO `p_attach` VALUES (34, '系统配置.xlsx', '', '/attach/20201118/a5ef7598fb6740d3863b8b48020f9651.xlsx', '.xlsx', '', 'other', '2020-11-18 02:39:08', NULL);
INSERT INTO `p_attach` VALUES (35, '6c4b3ab1798e1b252d81e1357e155bb7.mp4', '21312', '/attach/20201118/3b54691368184e8c83cb54fecd9ee537.mp4', '.mp4', '23213', 'video', '2020-11-18 02:39:17', '2020-11-18 03:04:37');
INSERT INTO `p_attach` VALUES (36, '平台-9月绩效考核.xlsx', '', '/attach/20201118/d0fd0fbc897940b3b8c97d5cf70d2772.xlsx', '.xlsx', '', 'other', '2020-11-18 02:42:25', NULL);
INSERT INTO `p_attach` VALUES (37, 'Perfree.zip', '', '/attach/20201118/f0294ccdab97472189f3098a93aba7a9.zip', '.zip', '', 'other', '2020-11-18 02:42:36', NULL);
INSERT INTO `p_attach` VALUES (38, 'android_111685.rar', '', '/attach/20201118/ff80f880dfde472396dbdc94e19f53bb.rar', '.rar', '', 'other', '2020-11-18 02:44:43', NULL);
INSERT INTO `p_attach` VALUES (39, 'all.2020-11-17.log', '23213', '/attach/20201118/645a935e24e843a593bea404547baffa.2020-11-17.log', '.2020-11-17.log', '', 'other', '2020-11-18 02:45:28', '2020-11-18 03:04:29');
INSERT INTO `p_attach` VALUES (40, '3.jpg', '1222', '/attach/20201118/48b47d234cf640cf88069f5175dba56a.jpg', '.jpg', '', 'img', '2020-11-18 02:51:25', '2020-11-18 03:04:33');
INSERT INTO `p_attach` VALUES (41, '1.jpg', '', '/attach/20201118/ee9d3a3e5fe9402094edcbf4b50e3e8c.jpg', '.jpg', '', 'img', '2020-11-18 03:05:08', NULL);
INSERT INTO `p_attach` VALUES (42, '2.jpg', '', '/attach/20201118/c00cf01e0f194565ac78d3c959a27260.jpg', '.jpg', '', 'img', '2020-11-18 03:43:47', NULL);
INSERT INTO `p_attach` VALUES (44, '1.jpg', NULL, '/attach/20201118/c72a3e7062544304b4e25fd7464fdc84.jpg', '.jpg', NULL, 'img', '2020-11-18 08:31:35', NULL);

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
INSERT INTO `p_menu` VALUES (4, 2, '新建', '/admin/article/addPage', '', 2, 1, 0, 0, '2020-08-31 17:16:58', '2020-08-31 17:17:00');
INSERT INTO `p_menu` VALUES (5, -1, '评论', '/admin/dashboard', 'fa-comment', 3, 1, 0, 0, '2020-08-31 17:17:29', '2020-08-31 17:17:32');
INSERT INTO `p_menu` VALUES (6, -1, '分类', '/admin/category', 'fa-bars', 4, 1, 0, 0, '2020-08-31 17:17:55', '2020-08-31 17:17:57');
INSERT INTO `p_menu` VALUES (7, -1, '标签', '/admin/tag', 'fa-tags', 5, 1, 0, 0, '2020-08-31 17:18:18', '2020-08-31 17:18:20');
INSERT INTO `p_menu` VALUES (8, -1, '主题', '/admin/dashboard', 'fa-tachometer', 6, 1, 0, 0, '2020-08-31 17:18:51', '2020-08-31 17:18:53');
INSERT INTO `p_menu` VALUES (9, -1, '设置', '/admin/dashboard', 'fa-sliders', 10, 1, 0, 0, '2020-08-31 17:19:40', '2020-08-31 17:19:42');
INSERT INTO `p_menu` VALUES (10, -1, '用户', '/admin/user', 'fa-user', 7, 1, 0, 0, '2020-11-11 13:30:44', '2020-11-11 13:30:46');
INSERT INTO `p_menu` VALUES (11, -1, '菜单', '/admin/menu', 'fa-bars', 8, 1, 0, 0, '2020-11-12 15:55:30', '2020-11-17 20:33:28');
INSERT INTO `p_menu` VALUES (12, -1, '附件', '/admin/attach', 'fa-file-archive-o', 9, 1, 0, 0, '2020-11-17 20:33:26', '2020-11-17 20:33:31');

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
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_tag
-- ----------------------------
INSERT INTO `p_tag` VALUES (11, '打撒大撒放到', 1, '2020-11-11 01:03:07', NULL);
INSERT INTO `p_tag` VALUES (13, '我去额去我', 1, '2020-11-11 01:04:06', NULL);
INSERT INTO `p_tag` VALUES (26, '散打按时', 1, '2020-11-11 04:35:31', NULL);
INSERT INTO `p_tag` VALUES (27, '1', 1, '2020-11-11 08:53:53', NULL);
INSERT INTO `p_tag` VALUES (28, 'aa', 1, '2020-11-18 05:31:06', NULL);
INSERT INTO `p_tag` VALUES (29, '456', 1, '2020-11-18 05:37:03', NULL);
INSERT INTO `p_tag` VALUES (30, '789', 1, '2020-11-18 05:37:44', NULL);
INSERT INTO `p_tag` VALUES (31, '11232', 1, '2020-11-18 05:38:09', NULL);
INSERT INTO `p_tag` VALUES (32, '撒大事', 1, '2020-11-18 05:39:55', NULL);
INSERT INTO `p_tag` VALUES (33, '而我却', 1, '2020-11-18 05:41:52', NULL);
INSERT INTO `p_tag` VALUES (34, '呃呃呃', 1, '2020-11-18 05:42:51', NULL);
INSERT INTO `p_tag` VALUES (35, '111', 1, '2020-11-18 05:43:07', NULL);
INSERT INTO `p_tag` VALUES (36, '23223', 1, '2020-11-18 05:44:21', NULL);
INSERT INTO `p_tag` VALUES (37, '23223大大', 1, '2020-11-18 05:44:27', NULL);
INSERT INTO `p_tag` VALUES (38, '2323哇啊', 1, '2020-11-18 05:45:02', NULL);
INSERT INTO `p_tag` VALUES (39, '是大大说的撒', 1, '2020-11-18 05:48:19', NULL);
INSERT INTO `p_tag` VALUES (40, '萨达', 1, '2020-11-18 06:20:29', NULL);
INSERT INTO `p_tag` VALUES (41, '小丁', 1, '2020-11-18 08:31:57', NULL);

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

SET FOREIGN_KEY_CHECKS = 1;

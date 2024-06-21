/*
 Navicat Premium Data Transfer

 Source Server         : 153.153.234.13
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : 153.153.234.13:3306
 Source Schema         : perfree_b

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 21/06/2024 17:50:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for p_article
-- ----------------------------
DROP TABLE IF EXISTS `p_article`;
CREATE TABLE `p_article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
  `parseContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '解析后的文章内容',
  `contentModel` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章内容类型:html/markdown',
  `type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章类型:article文章,page页面',
  `summary` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章摘要',
  `metaKeywords` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO关键字',
  `metaDescription` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO描述',
  `thumbnail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '缩略图',
  `slug` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'slug',
  `isTop` int NULL DEFAULT 0 COMMENT '是否置顶0:否,1:是',
  `status` int NULL DEFAULT 0 COMMENT '状态0:已发布,1:草稿',
  `commentCount` int NULL DEFAULT 0 COMMENT '评论数',
  `viewCount` int NULL DEFAULT 0 COMMENT '访问量',
  `greatCount` int NULL DEFAULT 0 COMMENT '访问量',
  `isComment` int NULL DEFAULT 1 COMMENT '是否允许评论0:否,1是',
  `flag` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标识',
  `template` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模板',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NOT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `slug`(`slug`) USING BTREE,
  INDEX `isTop`(`isTop`) USING BTREE,
  INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_article
-- ----------------------------
INSERT INTO `p_article` VALUES (1, 'HelloWorld', '欢迎使用 Perfree，如果您看到这篇文章,表示Perfree 已经安装成功.', '', 'markdown', 'article', '欢迎使用 Perfree，如果您看到这篇文章,表示Perfree 已经安装成功.\n', NULL, NULL, NULL, '1', 0, 0, 1, 4, 0, 1, NULL, NULL, '2024-03-19 11:39:26', '2024-06-20 14:42:47', 1, 1);
INSERT INTO `p_article` VALUES (2, '友链', '友链页面,您可直接访问填写的访问地址进行查看,或者在菜单管理配置该访问地址~', '', 'markdown', 'page', '友链页面,您可直接访问填写的访问地址进行查看,或者在菜单管理配置该访问地址~\n', NULL, NULL, NULL, 'link', 0, 0, 0, 0, 0, 1, NULL, NULL, '2024-03-19 11:39:26', '2024-03-19 11:39:26', 1, NULL);
INSERT INTO `p_article` VALUES (3, '演示页面', '这是一个演示页面,您可直接访问填写的访问地址进行查看,或者在菜单管理配置该访问地址~', '', 'markdown', 'page', '这是一个演示页面,您可直接访问填写的访问地址进行查看,或者在菜单管理配置该访问地址~\n', NULL, NULL, NULL, 'demo', 0, 0, 0, 0, 0, 1, NULL, NULL, '2024-03-19 11:39:26', '2024-03-19 11:39:26', 1, NULL);
INSERT INTO `p_article` VALUES (4, '2024-03-19 11:39:26', '第一条动态', '', 'markdown', 'journal', '第一条动态\n', NULL, NULL, NULL, '4', 0, 0, 0, 0, 0, 1, NULL, NULL, '2024-03-19 11:39:26', '2024-03-19 11:39:26', 1, NULL);
INSERT INTO `p_article` VALUES (6, '测试323232撒打算', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'CS323232SDS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 10:45:17', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (7, '测试21312312321312', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'CS21312312321312', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 10:56:30', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (8, '草稿测试', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'CGCS', 0, 1, 0, 0, 0, 1, '', NULL, '2024-06-20 10:58:13', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (9, '测试', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '/attach/2024-06-19/1a597474fa6a44eeb64ecfc4e24abbca.jpg', 'CS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 11:02:44', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (10, '21321321321321', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', '21321321321321', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 11:57:28', '2024-06-20 14:44:21', 1, 1);
INSERT INTO `p_article` VALUES (11, '21312321', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', '21312321', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 11:59:40', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (12, '2132133232', '写点什么?水电费水电费是的', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"5f935e23417cc178bc23241b832b86b31\" class=\"cherry-highlight-line\">写点什么?水电费水电费是的</p></div>', 'markdown', 'article', '写点什么?水电费水电费是的', '', '', '', '2132133232', 1, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 11:59:51', '2024-06-21 17:14:08', 1, 1);
INSERT INTO `p_article` VALUES (13, '阿斯顿撒', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'ASDS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:55:51', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (14, '21323', '写点什么?323', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"30b8744ea568b0f09b16bd98a69067161\" class=\"cherry-highlight-line\">写点什么?323</p></div>', 'markdown', 'article', '写点什么?323', '', '', '', '21323', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:56:45', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (15, '32123', '写点什么?213', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"5751b76e92c888cb075184a41a701c881\" class=\"cherry-highlight-line\">写点什么?213</p></div>', 'markdown', 'article', '写点什么?213', '', '', '', '32123', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:58:24', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (17, '第三方第三方斯蒂芬', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'DSFDSFSDF', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:58:46', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (20, '是的是的大萨达洒点水', '写点什么?撒打算', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"888135ef286ee7becddb69847a997d6b1\" class=\"cherry-highlight-line\">写点什么?撒打算</p></div>', 'markdown', 'article', '写点什么?撒打算', '', '', '', 'SDSDDSDSDS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 14:00:13', '2024-06-20 15:30:16', 1, 1);
INSERT INTO `p_article` VALUES (22, '侧耳啊实打实', '写点什么?额额为', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"a67bfa3603b720aa41f08b68f35073b51\" class=\"cherry-highlight-line\">写点什么?额额为</p></div>', 'markdown', 'article', '写点什么?额额为', '', '', '', 'CEASDS', 1, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 15:30:47', '2024-06-21 10:30:13', 1, 1);

-- ----------------------------
-- Table structure for p_article_category
-- ----------------------------
DROP TABLE IF EXISTS `p_article_category`;
CREATE TABLE `p_article_category`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `articleId` int NOT NULL COMMENT '文章id',
  `categoryId` int NOT NULL COMMENT '分类id',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_article_category
-- ----------------------------
INSERT INTO `p_article_category` VALUES (2, 1, 2, '2024-06-14 11:43:18', NULL, NULL, NULL);
INSERT INTO `p_article_category` VALUES (3, 22, 5, '2024-06-20 15:30:47', NULL, 1, NULL);
INSERT INTO `p_article_category` VALUES (4, 22, 6, '2024-06-20 15:30:47', NULL, 1, NULL);

-- ----------------------------
-- Table structure for p_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `p_article_tag`;
CREATE TABLE `p_article_tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `articleId` int NOT NULL COMMENT '文章id',
  `tagId` int NOT NULL COMMENT '标签id',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_article_tag
-- ----------------------------
INSERT INTO `p_article_tag` VALUES (1, 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO `p_article_tag` VALUES (2, 22, 7, '2024-06-20 15:30:47', NULL, 1, NULL);
INSERT INTO `p_article_tag` VALUES (3, 22, 8, '2024-06-20 15:30:47', NULL, 1, NULL);

-- ----------------------------
-- Table structure for p_attach
-- ----------------------------
DROP TABLE IF EXISTS `p_attach`;
CREATE TABLE `p_attach`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '附件名',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '附件描述',
  `path` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '附件路径',
  `flag` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标识',
  `mineType` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件类型mineType',
  `type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件类型',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `configId` int NOT NULL COMMENT '存储策略id',
  `url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '访问路径',
  `attachGroup` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'default' COMMENT '附件分组',
  `storage` int NOT NULL COMMENT '存储器类型',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_attach
-- ----------------------------
INSERT INTO `p_attach` VALUES (28, '813d3cd4ea6859bb7530a7366bd03a6c3f05dcc839bca226819e973137c93485.jpg', NULL, '2024-06-19/deada8a3892344c68aad271d068771e7.jpg', NULL, 'image/jpeg', 'img', '2024-06-19 11:38:42', NULL, 5, '/attach/2024-06-19/deada8a3892344c68aad271d068771e7.jpg', 'default', 0, 1, NULL);
INSERT INTO `p_attach` VALUES (29, 'a1000_u0_p409_s2415365777.mp3', NULL, '2024-06-19/e0f4ae59f0544bf886dbd0ec5ff76500.mp3', NULL, 'audio/mpeg', 'audio', '2024-06-19 11:38:42', NULL, 5, '/attach/2024-06-19/e0f4ae59f0544bf886dbd0ec5ff76500.mp3', 'default', 0, 1, NULL);
INSERT INTO `p_attach` VALUES (30, 'b68979b6e1ef4053be218b505a205c48.mp4', NULL, '2024-06-19/c44da00a937a48a787c00f8fe1fcf979.mp4', NULL, 'video/mp4', 'video', '2024-06-19 11:38:43', NULL, 5, '/attach/2024-06-19/c44da00a937a48a787c00f8fe1fcf979.mp4', 'default', 0, 1, NULL);
INSERT INTO `p_attach` VALUES (31, 'fc27dfc6c3bcf88e3b7c207a32632ed693e77476360076c67140b1cd39f54df9.jpg', NULL, '2024-06-19/37ba91582caa469fa3c5e042035a4d73.jpg', NULL, 'image/jpeg', 'img', '2024-06-19 14:48:58', NULL, 8, '/attach/2024-06-19/37ba91582caa469fa3c5e042035a4d73.jpg', 'default', 0, 1, NULL);
INSERT INTO `p_attach` VALUES (32, '1689038706902.jpg', NULL, '2024-06-19/1a597474fa6a44eeb64ecfc4e24abbca.jpg', NULL, 'image/png', 'img', '2024-06-19 14:52:15', NULL, 10, '/attach/2024-06-19/1a597474fa6a44eeb64ecfc4e24abbca.jpg', 'default', 0, 1, NULL);

-- ----------------------------
-- Table structure for p_attach_config
-- ----------------------------
DROP TABLE IF EXISTS `p_attach_config`;
CREATE TABLE `p_attach_config`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '配置名',
  `storage` int NOT NULL COMMENT '存储器',
  `remark` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  `config` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '存储配置',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `master` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否为主配置',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '附件服务器配置' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_attach_config
-- ----------------------------
INSERT INTO `p_attach_config` VALUES (3, '2132123232', 0, '323213', '{\"basePath\":\"E:\\\\logs\"}', '2024-02-26 14:25:44', '2024-05-28 15:16:56', b'0', NULL, NULL);
INSERT INTO `p_attach_config` VALUES (5, '3213', 0, '23213', '{\"basePath\":\"E:\\\\my-work\"}', '2024-02-27 15:43:08', '2024-02-28 09:59:46', b'0', NULL, NULL);
INSERT INTO `p_attach_config` VALUES (6, '阿里云', 1, '111', '{\"endpoint\":\"oss-cn-beijing.aliyuncs.com\",\"bucket\":\"perfree\",\"accessKey\":\"LTAI5tGwXDPcxc3Hwarpdi3g\",\"accessSecret\":\"mwILb88eryCuzSsxnfqN0PKXy6EsJj\",\"domain\":\"\",\"uploadDir\":\"/test/{year}/{month}/{day}\"}', '2024-02-28 10:57:49', '2024-05-28 15:26:49', b'1', NULL, NULL);
INSERT INTO `p_attach_config` VALUES (7, 'minio', 1, '', '{\"endpoint\":\"https://minio.5gmed.cn\",\"bucket\":\"shenjing\",\"accessKey\":\"HsAcGzPhZMRxiSYCmDJh\",\"accessSecret\":\"2voyur48VahjSVJsgvbjpmJduwcgkDCCnf0tnkSF\",\"domain\":\"https://minio.5gmed.cn/shenjing\",\"uploadDir\":\"/test/{year}/{month}/{day}\"}', '2024-02-28 11:39:23', '2024-05-28 15:26:49', b'0', NULL, NULL);
INSERT INTO `p_attach_config` VALUES (8, '1111111', 0, '', '{\"basePath\":\"E:\\\\111\"}', '2024-06-19 14:48:44', NULL, b'0', 1, NULL);
INSERT INTO `p_attach_config` VALUES (9, '22222', 0, '', '{\"basePath\":\"E:\\\\222\"}', '2024-06-19 14:50:00', NULL, b'0', 1, NULL);
INSERT INTO `p_attach_config` VALUES (10, '3333', 0, '3333', '{\"basePath\":\"E:\\\\3333\"}', '2024-06-19 14:51:48', NULL, b'0', 1, NULL);

-- ----------------------------
-- Table structure for p_category
-- ----------------------------
DROP TABLE IF EXISTS `p_category`;
CREATE TABLE `p_category`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名',
  `pid` int NOT NULL DEFAULT -1 COMMENT '父级id',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `count` int NOT NULL DEFAULT 0 COMMENT '文章数量',
  `metaKeywords` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO关键字',
  `thumbnail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '封面图',
  `slug` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'slug',
  `metaDescription` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'SEO描述内容',
  `status` int NOT NULL DEFAULT 0 COMMENT '状态0:正常,1禁用',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `status`(`status`) USING BTREE,
  INDEX `slug`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_category
-- ----------------------------
INSERT INTO `p_category` VALUES (3, '测试2122', -1, '1231233', 0, '23123', 'https://minio.5gmed.cn/shenjing/test/2024/05/31/285f7d47af604d43bc1d0c6db29c954f.jpg', '321', '2313213', 0, '2024-06-14 14:26:03', '2024-06-14 14:30:03', 1, 1);
INSERT INTO `p_category` VALUES (5, '子分类', 3, '', 0, '', '', '5', '', 0, '2024-06-19 15:28:45', '2024-06-19 15:28:45', 1, 1);
INSERT INTO `p_category` VALUES (6, '以及分类', -1, '', 0, '', '', '6', '', 0, '2024-06-19 15:28:54', '2024-06-19 15:28:54', 1, 1);

-- ----------------------------
-- Table structure for p_codegen_column
-- ----------------------------
DROP TABLE IF EXISTS `p_codegen_column`;
CREATE TABLE `p_codegen_column`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tableId` int NOT NULL COMMENT '表编号',
  `columnName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字段名',
  `dataType` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字段类型',
  `columnComment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字段描述',
  `nullable` bit(1) NOT NULL COMMENT '是否允许为空',
  `primaryKey` bit(1) NOT NULL COMMENT '是否主键',
  `autoIncrement` bit(1) NOT NULL COMMENT '是否自增',
  `javaType` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Java 属性类型',
  `javaField` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Java 属性名',
  `insertOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为插入字段',
  `updateOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为更新字段',
  `listOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为列表展示字段',
  `listQueryOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为列表查询关键字',
  `queryType` int NULL DEFAULT NULL COMMENT '查询类型',
  `formType` int NULL DEFAULT NULL COMMENT 'form表单类型',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 151 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_codegen_column
-- ----------------------------
INSERT INTO `p_codegen_column` VALUES (84, 17, 'id', 'INTEGER', '', b'0', b'1', b'1', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (85, 17, 'title', 'VARCHAR', '文章标题', b'0', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (86, 17, 'content', 'LONGVARCHAR', '文章内容', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (87, 17, 'contentModel', 'VARCHAR', '文章内容类型:html/markdown', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (88, 17, 'type', 'VARCHAR', '文章类型:article文章,page页面', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (89, 17, 'summary', 'VARCHAR', '文章摘要', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (90, 17, 'categoryId', 'INTEGER', '所属分类', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (91, 17, 'metaKeywords', 'VARCHAR', 'SEO关键字', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (92, 17, 'metaDescription', 'VARCHAR', 'SEO描述', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (93, 17, 'thumbnail', 'VARCHAR', '缩略图', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (94, 17, 'slug', 'VARCHAR', 'slug', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (95, 17, 'isTop', 'INTEGER', '是否置顶0:否,1:是', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (96, 17, 'status', 'INTEGER', '状态0:已发布,1:草稿', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (97, 17, 'commentCount', 'INTEGER', '评论数', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (98, 17, 'viewCount', 'INTEGER', '访问量', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (99, 17, 'greatCount', 'INTEGER', '访问量', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (100, 17, 'userId', 'INTEGER', '创建人', b'0', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (101, 17, 'isComment', 'INTEGER', '是否允许评论0:否,1是', b'1', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (102, 17, 'flag', 'VARCHAR', '标识', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (103, 17, 'template', 'VARCHAR', '模板', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (104, 17, 'createTime', 'TIMESTAMP', '创建时间', b'0', b'0', b'0', 'LocalDateTime', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (105, 17, 'updateTime', 'TIMESTAMP', '更新时间', b'1', b'0', b'0', 'LocalDateTime', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (106, 18, 'id', 'INTEGER', '主键', b'0', b'1', b'1', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:08', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (107, 18, 'name', 'VARCHAR', '附件名', b'0', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (108, 18, 'desc', 'VARCHAR', '附件描述', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (109, 18, 'path', 'VARCHAR', '附件路径', b'0', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (110, 18, 'flag', 'VARCHAR', '标识', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (111, 18, 'type', 'VARCHAR', '文件类型', b'1', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (112, 18, 'createTime', 'TIMESTAMP', '创建时间', b'0', b'0', b'0', 'LocalDateTime', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (113, 18, 'updateTime', 'TIMESTAMP', '更新时间', b'1', b'0', b'0', 'LocalDateTime', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (114, 18, 'configId', 'INTEGER', '存储策略id', b'0', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (115, 18, 'url', 'VARCHAR', '访问路径', b'0', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (116, 18, 'attachGroup', 'VARCHAR', '附件分组', b'0', b'0', b'0', 'String', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (117, 18, 'storage', 'INTEGER', '存储器类型', b'0', b'0', b'0', 'Integer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 16:58:11', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (118, 19, 'id', 'INTEGER', '主键', b'0', b'1', b'1', 'Integer', 'id', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (119, 19, 'name', 'VARCHAR', '分类名', b'0', b'0', b'0', 'String', 'name', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (120, 19, 'pid', 'INTEGER', '父级id', b'0', b'0', b'0', 'Integer', 'pid', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (121, 19, 'desc', 'VARCHAR', '描述', b'1', b'0', b'0', 'String', 'desc', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (122, 19, 'count', 'INTEGER', '文章数量', b'0', b'0', b'0', 'Integer', 'count', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (123, 19, 'metaKeywords', 'VARCHAR', 'SEO关键字', b'1', b'0', b'0', 'String', 'metaKeywords', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (124, 19, 'thumbnail', 'VARCHAR', '封面图', b'1', b'0', b'0', 'String', 'thumbnail', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (125, 19, 'slug', 'VARCHAR', 'slug', b'1', b'0', b'0', 'String', 'slug', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (126, 19, 'metaDescription', 'VARCHAR', 'SEO描述内容', b'1', b'0', b'0', 'String', 'metaDescription', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (127, 19, 'status', 'INTEGER', '状态0:正常,1禁用', b'0', b'0', b'0', 'Integer', 'status', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (128, 19, 'createTime', 'TIMESTAMP', '创建时间', b'0', b'0', b'0', 'LocalDateTime', 'createTime', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (129, 19, 'updateTime', 'TIMESTAMP', '更新时间', b'1', b'0', b'0', 'LocalDateTime', 'updateTime', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (130, 20, 'id', 'INTEGER', '主键', b'0', b'1', b'1', 'Long', 'id', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (131, 20, 'name', 'VARCHAR', '配置名', b'0', b'0', b'0', 'String', 'name', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (132, 20, 'storage', 'INTEGER', '存储器', b'0', b'0', b'0', 'Integer', 'storage', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (133, 20, 'remark', 'VARCHAR', '备注', b'1', b'0', b'0', 'String', 'remark', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (134, 20, 'config', 'VARCHAR', '存储配置', b'0', b'0', b'0', 'String', 'config', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (135, 20, 'createTime', 'TIMESTAMP', '创建时间', b'0', b'0', b'0', 'LocalDateTime', 'createTime', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (136, 20, 'updateTime', 'TIMESTAMP', '更新时间', b'1', b'0', b'0', 'LocalDateTime', 'updateTime', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (137, 20, 'master', 'BIT', '是否为主配置', b'0', b'0', b'0', 'Boolean', 'master', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (138, 21, 'id', 'INTEGER', '主键', b'0', b'1', b'1', 'Integer', 'id', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:32', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (139, 21, 'articleId', 'INTEGER', '文章id', b'0', b'0', b'0', 'Integer', 'articleId', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (140, 21, 'pid', 'INTEGER', '父级id', b'1', b'0', b'0', 'Integer', 'pid', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (141, 21, 'topPid', 'INTEGER', '顶层父级id', b'1', b'0', b'0', 'Integer', 'topPid', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (142, 21, 'userId', 'INTEGER', '用户iD', b'1', b'0', b'0', 'Integer', 'userId', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (143, 21, 'content', 'VARCHAR', '评论内容', b'1', b'0', b'0', 'String', 'content', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (144, 21, 'status', 'INTEGER', '状态:0正常,1:待审核', b'1', b'0', b'0', 'Integer', 'status', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (145, 21, 'avatar', 'VARCHAR', '头像', b'1', b'0', b'0', 'String', 'avatar', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (146, 21, 'website', 'VARCHAR', '网站地址', b'1', b'0', b'0', 'String', 'website', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (147, 21, 'email', 'VARCHAR', '邮箱', b'0', b'0', b'0', 'String', 'email', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (148, 21, 'userName', 'VARCHAR', '评论人', b'0', b'0', b'0', 'String', 'userName', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (149, 21, 'createTime', 'TIMESTAMP', '创建时间', b'0', b'0', b'0', 'LocalDateTime', 'createTime', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);
INSERT INTO `p_codegen_column` VALUES (150, 21, 'updateTime', 'TIMESTAMP', '更新时间', b'1', b'0', b'0', 'LocalDateTime', 'updateTime', NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-06 17:04:35', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for p_codegen_table
-- ----------------------------
DROP TABLE IF EXISTS `p_codegen_table`;
CREATE TABLE `p_codegen_table`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `scene` tinyint NOT NULL DEFAULT 1 COMMENT '生成场景0:后台代码,1: 插件代码',
  `tableName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '表名称',
  `tableComment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '表描述',
  `moduleName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '模块名',
  `className` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '类名称',
  `classComment` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '类描述',
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '作者',
  `parentMenuId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父菜单编号',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_codegen_table
-- ----------------------------
INSERT INTO `p_codegen_table` VALUES (17, 0, 'p_article', '', 'system', 'pArticle', '', NULL, '-1', '2024-06-06 14:33:29', NULL, NULL, NULL);
INSERT INTO `p_codegen_table` VALUES (18, 0, 'p_attach', '', 'system', 'pAttach', '', NULL, '-1', '2024-06-06 16:56:56', NULL, NULL, NULL);
INSERT INTO `p_codegen_table` VALUES (19, 0, 'p_category', '分类表', 'system', 'pCategory', '分类表', NULL, '-1', '2024-06-06 17:02:26', NULL, NULL, NULL);
INSERT INTO `p_codegen_table` VALUES (20, 0, 'p_attach_config', '附件服务器配置', 'system', 'pAttachConfig', '附件服务器配置', '213123', '-1', '2024-06-06 17:03:47', '2024-06-07 10:32:14', NULL, NULL);
INSERT INTO `p_codegen_table` VALUES (21, 0, 'p_comment', '', 'system', 'pComment', '', NULL, '-1', '2024-06-06 17:04:11', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for p_comment
-- ----------------------------
DROP TABLE IF EXISTS `p_comment`;
CREATE TABLE `p_comment`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `articleId` int NOT NULL COMMENT '文章id',
  `pid` int NULL DEFAULT -1 COMMENT '父级id',
  `topPid` int NULL DEFAULT -1 COMMENT '顶层父级id',
  `userId` int NULL DEFAULT NULL COMMENT '用户iD',
  `content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '评论内容',
  `status` int NULL DEFAULT 0 COMMENT '状态:0正常,1:待审核',
  `avatar` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `website` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网站地址',
  `email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `userName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论人',
  `ip` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'ip',
  `device` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备类型',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `articleId`(`articleId`) USING BTREE,
  INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_comment
-- ----------------------------
INSERT INTO `p_comment` VALUES (1, 1, -1, -1, NULL, '第一条评论', 0, '//gravatar.webp.se/avatar/635e66d06c6c1ed34903fc3afca02dfa', 'http://www.perfree.org.cn', 'perfree@126.com', 'Perfree', NULL, NULL, '2024-03-19 11:39:26', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for p_link
-- ----------------------------
DROP TABLE IF EXISTS `p_link`;
CREATE TABLE `p_link`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '网站名',
  `logo` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网站logo',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网站描述',
  `address` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '网站地址',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_link
-- ----------------------------
INSERT INTO `p_link` VALUES (1, 'Perfree官网', 'http://www.perfree.org.cn/static/public/images/logo.png', '一款Java开发的博客/CMS系统2311231', 'http://www.perfree.org.cn', '2024-03-19 11:39:26', '2024-06-14 15:07:31', NULL, 1);

-- ----------------------------
-- Table structure for p_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_menu`;
CREATE TABLE `p_menu`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '主键',
  `pid` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '-1' COMMENT '父级id',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单名',
  `url` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单链接',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `seq` int NULL DEFAULT NULL COMMENT '排序序号',
  `type` int NOT NULL DEFAULT 0 COMMENT '菜单类型0:前台,1:后台',
  `target` int NULL DEFAULT 0 COMMENT '菜单打开方式:0本页,1:新窗口',
  `status` int NOT NULL DEFAULT 0 COMMENT '菜单状态0:启用,1禁用',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `menuType` int NULL DEFAULT NULL COMMENT '菜单类型（0目录1菜单2按钮）',
  `pluginId` int NULL DEFAULT NULL COMMENT '插件id',
  `flag` int NULL DEFAULT NULL COMMENT '菜单标识:0:系统自带,1:用户创建,2:插件',
  `component` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件路径',
  `componentName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件名称',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限标识',
  `isFrame` int NULL DEFAULT 1 COMMENT '是否为外链（0是 1否）',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `type`(`type`) USING BTREE,
  INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_menu
-- ----------------------------
INSERT INTO `p_menu` VALUES ('0266af7c88624be3bfddc6cdfe3cf010', '-1', '动态', '/journal', 'fa-solid fa-grin-stars', 2, 0, 0, 0, '2024-03-19 11:39:26', '2024-05-27 11:14:05', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('108987c88fb847f8b88b3f8ac0dfbec2', '7a95da79256243f0baeb289b11eddc5b', '网站设置', '/admin/setting', NULL, 1, 1, 0, 0, '2024-03-19 15:40:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('137a52c0b1c34293857d8a52dfca97e7', '6453ca30d9c8407f81e50a78a3adee9d', '代码生成', '/admin/codegen', 'fa-solid fa-pastafarianism', 0, 1, 0, 0, '2024-06-05 15:12:35', NULL, 1, NULL, NULL, '/codegen/CodegenView', 'codegen', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('26583191a63d4970a5d2f6e1b294121c', '-1', '写文章', '/admin/article/create', 'fa-solid fa-pencil-alt', 0, 1, 0, 0, '2024-06-17 14:02:17', NULL, 1, NULL, NULL, '/article/ArticleCreateView', 'articleCreate', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('26b41a12802541a2bb7054600b114c10', 'a98d36d52c174124a5fdf1884e572a0f', '附件相关', '', 'fa-solid fa-folder-closed', 9, 1, 0, 0, '2024-05-28 15:01:18', '2024-06-20 10:49:40', 0, NULL, NULL, '', '', '', 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('2c6d9fb51d2e45dbaba4574472d9b252', '-1', '主题管理', NULL, 'fa-solid fa-comment-alt', 4, 1, 0, 0, '2024-03-19 15:40:46', '2024-05-27 11:17:47', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('38a64c087da742719c8543b554586529', 'a98d36d52c174124a5fdf1884e572a0f', '友链管理', '/admin/link', 'fa-solid fa-feather', 0, 1, 0, 0, '2024-06-14 14:45:47', NULL, 1, NULL, NULL, '/link/LinkView', 'link', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('50508321af38403e833f6e4fef896c0e', '-1', '归档', '/archive', 'fa-calendar', 1, 0, 0, 0, '2024-03-19 11:39:26', '2024-05-27 11:13:05', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('5a86941f652b4c79b25ba6922823f098', '2c6d9fb51d2e45dbaba4574472d9b252', '所有主题', '/admin/theme', NULL, 1, 1, 0, 0, '2024-03-19 15:40:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('6453ca30d9c8407f81e50a78a3adee9d', '-1', '系统管理', '', 'fa-solid fa-shield-blank', 3, 1, 0, 0, '2024-05-27 13:48:37', '2024-05-27 13:48:47', 0, NULL, NULL, '', '', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('7a95da79256243f0baeb289b11eddc5b', '-1', '系统设置', NULL, 'fa-solid fa-fingerprint', 6, 1, 0, 0, '2024-03-19 15:40:48', '2024-05-27 11:17:55', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('7bcb68dcf18f45838d53d019fff1d0ba', 'a98d36d52c174124a5fdf1884e572a0f', '文章管理', '/admin/article', 'fa-solid fa-file-alt', 0, 1, 0, 0, '2024-06-20 10:50:40', NULL, 1, NULL, NULL, '/article/ArticleView', 'article', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('8a693ffb64a44d6cb9e0bbdf748b907f', '6453ca30d9c8407f81e50a78a3adee9d', '角色管理', '/admin/role', 'fa-solid fa-user-times', 0, 1, 0, 0, '2024-05-27 13:51:17', '2024-05-28 13:47:30', 1, NULL, NULL, '/role/RoleView', 'role', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('9dbf169f6adc41f7a96f95e5926bbb04', '7a95da79256243f0baeb289b11eddc5b', '关于系统', '/admin/about', NULL, 3, 1, 0, 0, '2024-03-19 15:40:48', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('a98d36d52c174124a5fdf1884e572a0f', '-1', '内容管理', NULL, 'fa-solid fa-r', 3, 1, 0, 0, '2024-03-19 15:40:41', '2024-05-27 11:18:54', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('b5ad52581b4e4ebb9cbd4166453873b2', 'de0d9535890b4357b91253e0d426e025', '插件列表', '/admin/plugin', NULL, 1, 1, 0, 0, '2024-03-19 15:40:47', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c1b3c57e13974ff7928f86ca1e58fa57', 'a98d36d52c174124a5fdf1884e572a0f', '分类管理', '/admin/category', 'fa-solid fa-table', 0, 1, 0, 0, '2024-06-13 13:57:48', NULL, 1, NULL, NULL, '/category/CategoryView', 'category', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c347eae0721040a3b458db78ef34fe05', '6453ca30d9c8407f81e50a78a3adee9d', '系统设置', '/admin/systemConfig', 'fa-solid fa-cloud-sun', 0, 1, 0, 0, '2024-05-28 15:49:10', NULL, 1, NULL, NULL, '/systemConfig/SystemConfigView', 'systemConfig', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c70427da2c934d7d9ae876360538ee63', 'a98d36d52c174124a5fdf1884e572a0f', '标签管理', '/admin/tag', 'fa-solid fa-bookmark', 0, 1, 0, 0, '2024-06-12 15:07:01', NULL, 1, NULL, NULL, '/tag/TagView', 'tag', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c8001d41c5264bf485e40b4dd6a55d33', '-1', '友链', '/page/link', 'fa-solid fa-person-cane', 3, 0, 0, 0, '2024-03-19 11:39:26', '2024-05-27 11:14:36', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c8e7fa97c78f476783b98087bed755ba', '7a95da79256243f0baeb289b11eddc5b', '邮件模板', '/admin/emailSetting', NULL, 2, 1, 0, 0, '2024-03-19 15:40:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c997fdfd98514ae6bb05f47228916aa6', '6453ca30d9c8407f81e50a78a3adee9d', '站点管理', '/admin/site', 'fa-solid fa-fire-flame-simple', 0, 1, 0, 0, '2024-05-30 17:41:53', NULL, 1, NULL, NULL, '/site/SiteView', 'site', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('d3aefa8f4b94444498770ae31872a5cc', '26b41a12802541a2bb7054600b114c10', '存储策略', '/admin/attachConfig', 'fa-solid fa-skating', 0, 1, 0, 0, '2024-05-28 15:02:19', NULL, 1, NULL, NULL, '/attachConfig/AttachConfigView', 'attachConfig', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('de0d9535890b4357b91253e0d426e025', '-1', '插件管理', NULL, 'fa-solid fa-building-circle-arrow-right', 5, 1, 0, 0, '2024-03-19 15:40:47', '2024-05-27 11:17:51', 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('dfefa164cd0946d2808dea537581e5f0', '6453ca30d9c8407f81e50a78a3adee9d', '菜单管理', '/admin/menu', 'fa-solid fa-football', 1, 1, 0, 0, '2024-05-27 13:50:34', '2024-05-28 13:47:44', 1, NULL, NULL, '/menu/MenuView', 'menu', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('e849790fc83e40cd9fe05d5ac61a5ea3', '2c6d9fb51d2e45dbaba4574472d9b252', '主题设置', '/admin/theme/setting', 'fa-solid fa-dice-three', 2, 1, 0, 0, '2024-03-19 15:40:47', '2024-06-04 11:40:07', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `p_menu` VALUES ('ebc4ce91f4044d00974c4da9a5670cbc', '26b41a12802541a2bb7054600b114c10', '附件列表', '/admin/attach', 'fa-solid fa-file-text', 1, 1, 0, 0, '2024-05-28 15:09:05', NULL, 1, NULL, NULL, '/attach/AttachView', 'attach', '', 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('fc9e3ac152de46559c31b34599045db6', '6453ca30d9c8407f81e50a78a3adee9d', '用户管理', '/admin/user', 'fa-solid fa-male', 0, 1, 0, 0, '2024-05-27 13:50:55', '2024-05-28 13:47:38', 1, NULL, NULL, '/user/UserView', 'user', '', 1, NULL, NULL);

-- ----------------------------
-- Table structure for p_option
-- ----------------------------
DROP TABLE IF EXISTS `p_option`;
CREATE TABLE `p_option`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `key` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'key',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'value',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_option
-- ----------------------------
INSERT INTO `p_option` VALUES (1, 'WEB_THEME', 'default', NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (2, 'WEB_IS_REGISTER', '1', NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (3, 'WEB_COMMENT_IS_REVIEW', '0', NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (4, 'LOGIN_CAPTCHA_ENABLE', '1', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for p_plugin
-- ----------------------------
DROP TABLE IF EXISTS `p_plugin`;
CREATE TABLE `p_plugin`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '插件名',
  `path` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '路径',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '插件描述',
  `version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '版本',
  `author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作者',
  `status` int NOT NULL DEFAULT 0 COMMENT '插件状态:0禁用,1启用',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_plugin
-- ----------------------------

-- ----------------------------
-- Table structure for p_role
-- ----------------------------
DROP TABLE IF EXISTS `p_role`;
CREATE TABLE `p_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名',
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色码',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_role
-- ----------------------------
INSERT INTO `p_role` VALUES (1, '管理员', '网站管理员222', 'admin', '2024-03-19 11:39:26', '2024-03-19 11:39:26', NULL, NULL);
INSERT INTO `p_role` VALUES (2, '普通用户', '网站用户', 'user', '2024-03-19 11:39:26', '2024-03-19 11:39:26', NULL, NULL);
INSERT INTO `p_role` VALUES (3, '文章编辑', '文章编辑', 'editor', '2024-03-19 11:39:26', '2024-03-19 11:39:26', NULL, NULL);

-- ----------------------------
-- Table structure for p_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_role_menu`;
CREATE TABLE `p_role_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL COMMENT '角色id',
  `menuId` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单id',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_role_menu
-- ----------------------------
INSERT INTO `p_role_menu` VALUES (1, 1, '883f70eee42d4e09ae486bd0541a173a', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (2, 3, '883f70eee42d4e09ae486bd0541a173a', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (3, 1, 'a98d36d52c174124a5fdf1884e572a0f', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (4, 3, 'a98d36d52c174124a5fdf1884e572a0f', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (5, 1, 'f1a3f82dad264215864ebfc62b413ea2', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (6, 1, '2c6d9fb51d2e45dbaba4574472d9b252', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (7, 1, '5a86941f652b4c79b25ba6922823f098', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (8, 1, 'e849790fc83e40cd9fe05d5ac61a5ea3', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (9, 1, 'de0d9535890b4357b91253e0d426e025', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (10, 1, 'b5ad52581b4e4ebb9cbd4166453873b2', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (11, 1, '7a95da79256243f0baeb289b11eddc5b', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (12, 1, '9dbf169f6adc41f7a96f95e5926bbb04', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (13, 3, '9dbf169f6adc41f7a96f95e5926bbb04', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (14, 1, '108987c88fb847f8b88b3f8ac0dfbec2', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (15, 1, 'c8e7fa97c78f476783b98087bed755ba', NULL, NULL, NULL, NULL);
INSERT INTO `p_role_menu` VALUES (19, 2, 'a98d36d52c174124a5fdf1884e572a0f', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (20, 2, '38a64c087da742719c8543b554586529', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (21, 2, 'c1b3c57e13974ff7928f86ca1e58fa57', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (22, 2, 'c70427da2c934d7d9ae876360538ee63', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (23, 2, '9dbf169f6adc41f7a96f95e5926bbb04', '2024-06-17 10:46:30', NULL, 1, NULL);

-- ----------------------------
-- Table structure for p_site
-- ----------------------------
DROP TABLE IF EXISTS `p_site`;
CREATE TABLE `p_site`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `siteName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '站点名称',
  `siteDesc` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '站点描述',
  `siteSlug` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '站点访问标识',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `status` int NOT NULL DEFAULT 0 COMMENT '状态0:正常,1:禁用',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_site
-- ----------------------------
INSERT INTO `p_site` VALUES (2, '2222232321312', '2222', '2', '2024-05-31 09:40:07', '2024-05-31 09:44:21', 0, 0, NULL);

-- ----------------------------
-- Table structure for p_tag
-- ----------------------------
DROP TABLE IF EXISTS `p_tag`;
CREATE TABLE `p_tag`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标签名',
  `color` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '颜色',
  `thumbnail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '缩略图',
  `slug` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'slug',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `slug`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_tag
-- ----------------------------
INSERT INTO `p_tag` VALUES (7, '测试', '#AE2F2F', 'https://minio.5gmed.cn/shenjing/test/2024/05/31/285f7d47af604d43bc1d0c6db29c954f.jpg', '7', 1, 1, '2024-06-14 10:42:19', '2024-06-14 10:42:19');
INSERT INTO `p_tag` VALUES (8, '萨达', NULL, NULL, '8', 1, 1, '2024-06-20 15:30:47', '2024-06-20 15:30:47');

-- ----------------------------
-- Table structure for p_user
-- ----------------------------
DROP TABLE IF EXISTS `p_user`;
CREATE TABLE `p_user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账户',
  `userName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `salt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '盐值',
  `status` int NOT NULL DEFAULT 0 COMMENT '状态:0正常,1禁用',
  `avatar` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `website` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网站地址',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_user
-- ----------------------------
INSERT INTO `p_user` VALUES (1, 'perfree', 'perfree', 'dc7009ea8f8e42cc2b307931d05a4398', '8c98de00a1954e3c831afca323111189', 0, '//gravatar.webp.se/avatar/635e66d06c6c1ed34903fc3afca02dfa', 'perfree@126.com', '12321312', '2024-03-19 11:39:40', '2024-05-27 13:45:50', 0, NULL);
INSERT INTO `p_user` VALUES (2, 'testtest', '测试', 'a065ccab441f73140e878dc0e6151397', '0e569592735b43a4a2c3dc17f414a053', 0, NULL, '', '', '2024-06-14 17:55:24', NULL, 1, NULL);

-- ----------------------------
-- Table structure for p_user_role
-- ----------------------------
DROP TABLE IF EXISTS `p_user_role`;
CREATE TABLE `p_user_role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户id',
  `roleId` int NOT NULL COMMENT '角色id',
  `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_user_role
-- ----------------------------
INSERT INTO `p_user_role` VALUES (1, 60, 2, NULL, NULL, NULL, NULL);
INSERT INTO `p_user_role` VALUES (4, 1, 1, '2024-06-14 17:55:44', NULL, 1, NULL);
INSERT INTO `p_user_role` VALUES (5, 2, 2, '2024-06-14 17:55:52', NULL, 1, NULL);

SET FOREIGN_KEY_CHECKS = 1;

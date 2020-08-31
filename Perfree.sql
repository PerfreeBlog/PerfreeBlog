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

 Date: 31/08/2020 16:50:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for p_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_menu`;
CREATE TABLE `p_menu`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pid` int(0) NULL DEFAULT NULL COMMENT '父级id',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单名',
  `url` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单链接',
  `icon` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `seq` int(0) NULL DEFAULT NULL COMMENT '排序序号',
  `type` int(0) NOT NULL DEFAULT 0 COMMENT '菜单类型0:前台,1:后台',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT '菜单状态0:启用,1禁用',
  `createTime` datetime(0) NOT NULL COMMENT '创建时间',
  `updateTime` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_menu
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of p_user
-- ----------------------------
INSERT INTO `p_user` VALUES (1, 'admin', 'admin', '29f9569a1c59bf2731ea17cec7ca7534', 'ea75fdde081b49c0b654603250d49e5e', 0, NULL, 1, '2020-08-31 16:43:12', '2020-08-31 16:43:14');

SET FOREIGN_KEY_CHECKS = 1;

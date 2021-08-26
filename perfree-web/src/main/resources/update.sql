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
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (169, -1, '插件管理', '/admin/plugin', 'fa-leaf', 6, 1, 0, NULL, 0, '2021-08-13 14:02:27', NULL);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 169);


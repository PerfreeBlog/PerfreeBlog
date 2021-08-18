CREATE TABLE `p_plugin`  (
                             `id` integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                             `name` text(256) NOT NULL,
                             `path` text(256),
                             `desc` text(512),
                             `version` text(64),
                             `author` text(64),
                             "createTime" DATETIME NOT NULL,
                             "updateTime" DATETIME
);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `articleId`, `status`, `createTime`, `updateTime`) VALUES (169, -1, '插件管理', '/admin/plugin', 'fa-leaf', 6, 1, 0, NULL, 0, '2021-08-13 14:02:27', NULL);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (1, 169);


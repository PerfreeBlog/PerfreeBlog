--version-1.2.4
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (3, '文章编辑', '文章编辑', 'editor', '2021-09-15 13:59:43', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (4, '文章贡献', '文章贡献', 'contribute', '2021-09-15 14:00:21', NULL);
UPDATE `p_role` SET `name` = '普通用户', `description` = '网站用户', `code` = 'user', `createTime` = '2020-12-17 13:11:50', `updateTime` = NULL WHERE `id` = 2;

INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (2, 1);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 1);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 2);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 3);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 5);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 6);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 7);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 8);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (3, 9);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (4, 1);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (4, 2);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (4, 5);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (4, 6);
INSERT INTO `p_role_menu`(`roleId`, `menuId`) VALUES (4, 3);
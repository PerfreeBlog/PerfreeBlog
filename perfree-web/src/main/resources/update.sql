--PerfreeBlog
--v1.2.4;
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (3, '文章编辑', '文章编辑', 'editor', '2021-09-15 13:59:43', NULL);
INSERT INTO `p_role`(`id`, `name`, `description`, `code`, `createTime`, `updateTime`) VALUES (4, '文章贡献', '文章贡献', 'contribute', '2021-09-15 14:00:21', NULL);
UPDATE `p_role` SET `name` = '普通用户', `description` = '网站用户', `code` = 'user', `createTime` = '2020-12-17 13:11:50', `updateTime` = NULL WHERE `id` = 2;
--PerfreeBlog
--v1.2.8;
ALTER TABLE `p_menu` ADD COLUMN `pluginId` varchar(128) NULL COMMENT '插件id';
--PerfreeBlog
--v1.3.1;
ALTER TABLE `p_menu` MODIFY COLUMN `id` varchar(64) NOT NULL COMMENT '主键';
ALTER TABLE `p_menu` MODIFY COLUMN `pid` varchar(64) NULL COMMENT '父级id';
ALTER TABLE `p_menu` DROP COLUMN `pluginId`;
ALTER TABLE `p_role_menu` MODIFY COLUMN `menuId` varchar(64) NOT NULL COMMENT '菜单id';
--PerfreeBlog
--v1.3.2;
ALTER TABLE `p_option` MODIFY COLUMN `value` text NULL COMMENT 'value';
--PerfreeBlog
--v2.0.0;
ALTER TABLE `p_article` ADD COLUMN `slug` varchar(128) NULL COMMENT 'slug';
ALTER TABLE `p_menu` DROP COLUMN `articleId`;
UPDATE p_article set slug = id where slug is null;
ALTER TABLE `p_article` ADD INDEX `slug`(`slug`), ADD INDEX `type`(`type`), ADD INDEX `categoryId`(`categoryId`), ADD INDEX `commentCount`(`commentCount`), ADD INDEX `viewCount`(`viewCount`);
--PerfreeBlog
--v2.1.0;
ALTER TABLE `p_article` ADD COLUMN `contentModel` varchar(32) NULL COMMENT '内容类型:html/markdown' AFTER `updateTime`;
UPDATE p_article set contentModel = 'markdown' where contentModel is null;
--PerfreeBlog
--v2.2.0;
ALTER TABLE `p_plugin` ADD COLUMN `status` int NULL COMMENT '插件状态:0禁用,1启用';
UPDATE `p_plugin` set `status` = 1 where `status` is null;
--PerfreeBlog
--v2.2.2;
ALTER TABLE `p_article` ADD COLUMN `flag` varchar(256) NULL COMMENT '标识' , ADD COLUMN `template` varchar(256) NULL COMMENT '模板';
--PerfreeBlog
--v2.3.1;
ALTER TABLE `p_attach` ADD COLUMN `saveType` varchar(32) NULL COMMENT '存储方式', ADD COLUMN `fileKey` varchar(512) NULL COMMENT 'fileKey';
--PerfreeBlog
--v3.0.0;
ALTER TABLE `p_tag` ADD COLUMN `color` varchar(128) NULL COMMENT '颜色';
ALTER TABLE `p_tag` ADD COLUMN `thumbnail` varchar(256) NULL COMMENT '缩略图';
ALTER TABLE `p_tag` ADD COLUMN `slug` varchar(128) NULL COMMENT 'slug';
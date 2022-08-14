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
UPDATE p_tag set slug = id where slug is null;
ALTER TABLE `p_category` ADD COLUMN `thumbnail` varchar(256) NULL COMMENT '封面图';
ALTER TABLE `p_category` ADD COLUMN `slug` varchar(128) NULL COMMENT 'slug';
UPDATE p_category set slug = id where slug is null;
ALTER TABLE `p_article` ADD COLUMN `greatCount` int NULL DEFAULT 0 COMMENT '点赞数';
UPDATE p_article set greatCount = 0;
ALTER TABLE `p_article` ADD INDEX `isTop`(`isTop`);
ALTER TABLE `p_attach` ADD INDEX `type`(`type`), ADD INDEX `saveType`(`saveType`);
ALTER TABLE `p_category` ADD INDEX `status`(`status`),ADD INDEX `slug`(`slug`);
ALTER TABLE `p_tag` ADD INDEX `slug`(`slug`);
ALTER TABLE `p_comment` ADD INDEX `articleId`(`articleId`), ADD INDEX `status`(`status`);
ALTER TABLE `p_menu` ADD INDEX `type`(`type`), ADD INDEX `status`(`status`);
ALTER TABLE `p_user` ADD INDEX `account`(`account`), ADD INDEX `status`(`status`);
INSERT INTO `p_menu`(`id`, `pid`, `name`, `url`, `icon`, `seq`, `type`, `target`, `status`, `createTime`, `updateTime`) VALUES ('000000000000000000046b67a553452e','-1', '动态', '/journal', 'fa-newspaper-o', 99, 0, 0, 0, now(), now());

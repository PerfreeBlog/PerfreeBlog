CREATE TABLE `p_menu`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `pid` int NULL COMMENT '父级id',
  `name` varchar(128) NOT NULL COMMENT '菜单名',
  `url` varchar(128) NOT NULL COMMENT '菜单链接',
  `icon` varchar(64) NULL COMMENT '菜单图标',
  `seq` int NULL COMMENT '排序序号',
  `type` int(1) NOT NULL DEFAULT 0 COMMENT '菜单类型0:前台,1:后台',
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '菜单状态0:启用,1禁用',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
);

CREATE TABLE `p_role`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(32) NOT NULL COMMENT '角色名',
  `description` varchar(256) NULL COMMENT '角色描述',
  `code` varchar(32) NOT NULL COMMENT '角色码',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
);

CREATE TABLE `p_role_menu`  (
  `role_id` int NOT NULL COMMENT '角色id',
  `menu_id` int NOT NULL COMMENT '菜单id'
);

CREATE TABLE `p_user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `account` varchar(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '账户',
  `userName` varchar(32) NOT NULL COMMENT '账户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `salt` varchar(32) NOT NULL COMMENT '盐值',
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '状态:0正常,1禁用',
  `avatar` varchar(256) NULL COMMENT '头像',
  `role_id` int NOT NULL COMMENT '角色id',
  `ceateTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
);


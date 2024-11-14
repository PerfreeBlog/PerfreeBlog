SET NAMES utf8mb4;

-- ----------------------------
-- Table structure for p_article
-- ----------------------------
DROP TABLE IF EXISTS `p_article`;
CREATE TABLE `p_article`  (
                              `id` int NOT NULL AUTO_INCREMENT,
                              `title` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文章标题',
                              `content` longtext CHARACTER SET utf8mb4  NOT NULL COMMENT '文章内容',
                              `parseContent` longtext CHARACTER SET utf8mb4  NOT NULL COMMENT '解析后的文章内容',
                              `contentModel` varchar(32) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文章内容类型:html/markdown',
                              `type` varchar(32) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文章类型:article文章,page页面',
                              `summary` varchar(1024) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文章摘要',
                              `metaKeywords` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'SEO关键字',
                              `metaDescription` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'SEO描述',
                              `thumbnail` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '缩略图',
                              `slug` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'slug',
                              `isTop` int NULL DEFAULT 0 COMMENT '是否置顶0:否,1:是',
                              `status` int NULL DEFAULT 0 COMMENT '状态0:已发布,1:草稿',
                              `viewCount` int NULL DEFAULT 0 COMMENT '访问量',
                              `greatCount` int NULL DEFAULT 0 COMMENT '访问量',
                              `isComment` int NULL DEFAULT 1 COMMENT '是否允许评论0:否,1是',
                              `flag` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '标识',
                              `template` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '模板',
                              `createTime` datetime NOT NULL COMMENT '创建时间',
                              `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                              `createUserId` int NOT NULL COMMENT '添加人',
                              `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                              `visibility` int NOT NULL DEFAULT 0 COMMENT '是否可见, 0是, 1否',
                              PRIMARY KEY (`id`) USING BTREE,
                              INDEX `slug`(`slug`) USING BTREE,
                              INDEX `isTop`(`isTop`) USING BTREE,
                              INDEX `type`(`type`) USING BTREE,
                              INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 187 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_article
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_article_category
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_article_tag
-- ----------------------------

-- ----------------------------
-- Table structure for p_attach
-- ----------------------------
DROP TABLE IF EXISTS `p_attach`;
CREATE TABLE `p_attach`  (
                             `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                             `name` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '附件名',
                             `remark` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '附件描述',
                             `path` varchar(512) CHARACTER SET utf8mb4  NOT NULL COMMENT '附件路径',
                             `flag` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '标识',
                             `mineType` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文件类型mineType',
                             `type` varchar(32) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文件类型',
                             `createTime` datetime NOT NULL COMMENT '创建时间',
                             `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                             `configId` int NOT NULL COMMENT '存储策略id',
                             `url` varchar(512) CHARACTER SET utf8mb4  NOT NULL COMMENT '访问路径',
                             `attachGroup` varchar(256) CHARACTER SET utf8mb4  NOT NULL DEFAULT 'default' COMMENT '附件分组',
                             `storage` int NOT NULL COMMENT '存储器类型',
                             `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                             `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                             PRIMARY KEY (`id`) USING BTREE,
                             INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 250 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_attach
-- ----------------------------

-- ----------------------------
-- Table structure for p_attach_config
-- ----------------------------
DROP TABLE IF EXISTS `p_attach_config`;
CREATE TABLE `p_attach_config`  (
                                    `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                                    `name` varchar(64) CHARACTER SET utf8mb4  NOT NULL COMMENT '配置名',
                                    `storage` int NOT NULL COMMENT '存储器',
                                    `remark` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '备注',
                                    `config` varchar(4096) CHARACTER SET utf8mb4  NOT NULL COMMENT '存储配置',
                                    `createTime` datetime NOT NULL COMMENT '创建时间',
                                    `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                    `master` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否为主配置',
                                    `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                    `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4  COMMENT = '附件服务器配置' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_attach_config
-- ----------------------------
INSERT INTO `p_attach_config` VALUES (1, '默认配置', 0, '默认配置', '{\"basePath\":\"resources/upload\"}', '2024-08-01 09:08:19', '2024-08-26 16:20:50', b'1', 1, 1);

-- ----------------------------
-- Table structure for p_attach_library
-- ----------------------------
DROP TABLE IF EXISTS `p_attach_library`;
CREATE TABLE `p_attach_library`  (
                                     `id` int NOT NULL AUTO_INCREMENT,
                                     `name` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '附件库名称',
                                     `description` varchar(1024) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '描述',
                                     `type` varchar(64) CHARACTER SET utf8mb4  NOT NULL COMMENT '附件库类型: img: 图库, video视频库, audio音乐库,other其他',
                                     `visibility` int NOT NULL DEFAULT 0 COMMENT '是否可见, 0是, 1否',
                                     `thumbnail` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '封面图',
                                     `createTime` datetime NOT NULL COMMENT '创建时间',
                                     `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                     `createUserId` int NOT NULL COMMENT '添加人',
                                     `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                     PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4  COMMENT = '附件库' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_attach_library
-- ----------------------------

-- ----------------------------
-- Table structure for p_attach_library_items
-- ----------------------------
DROP TABLE IF EXISTS `p_attach_library_items`;
CREATE TABLE `p_attach_library_items`  (
                                           `id` int NOT NULL AUTO_INCREMENT,
                                           `attachLibraryId` int NOT NULL COMMENT '附件库id',
                                           `url` varchar(512) CHARACTER SET utf8mb4  NOT NULL COMMENT 'url',
                                           `createTime` datetime NOT NULL COMMENT '创建时间',
                                           `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                           `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                           `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                           `name` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文件名称',
                                           `description` varchar(1024) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '描述',
                                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4  COMMENT = '附件库数据' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_attach_library_items
-- ----------------------------

-- ----------------------------
-- Table structure for p_category
-- ----------------------------
DROP TABLE IF EXISTS `p_category`;
CREATE TABLE `p_category`  (
                               `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                               `name` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '分类名',
                               `pid` int NOT NULL DEFAULT -1 COMMENT '父级id',
                               `desc` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '描述',
                               `metaKeywords` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'SEO关键字',
                               `thumbnail` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '封面图',
                               `slug` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'slug',
                               `metaDescription` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'SEO描述内容',
                               `status` int NOT NULL DEFAULT 0 COMMENT '状态0:正常,1禁用',
                               `createTime` datetime NOT NULL COMMENT '创建时间',
                               `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                               `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                               `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                               PRIMARY KEY (`id`) USING BTREE,
                               INDEX `status`(`status`) USING BTREE,
                               INDEX `slug`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4  COMMENT = '分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_category
-- ----------------------------

-- ----------------------------
-- Table structure for p_codegen_column
-- ----------------------------
DROP TABLE IF EXISTS `p_codegen_column`;
CREATE TABLE `p_codegen_column`  (
                                     `id` int NOT NULL AUTO_INCREMENT,
                                     `tableId` int NOT NULL COMMENT '表编号',
                                     `columnName` varchar(200) CHARACTER SET utf8mb4  NOT NULL COMMENT '字段名',
                                     `dataType` varchar(100) CHARACTER SET utf8mb4  NOT NULL COMMENT '字段类型',
                                     `columnComment` varchar(500) CHARACTER SET utf8mb4  NOT NULL COMMENT '字段描述',
                                     `nullable` bit(1) NOT NULL COMMENT '是否允许为空',
                                     `primaryKey` bit(1) NOT NULL COMMENT '是否主键',
                                     `autoIncrement` bit(1) NOT NULL COMMENT '是否自增',
                                     `javaType` varchar(32) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'Java 属性类型',
                                     `javaField` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'Java 属性名',
                                     `insertOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为插入字段',
                                     `updateOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为更新字段',
                                     `listOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为列表展示字段',
                                     `listQueryOperation` bit(1) NULL DEFAULT NULL COMMENT '是否为列表查询关键字',
                                     `queryType` int NULL DEFAULT NULL COMMENT '查询类型',
                                     `formType` int NULL DEFAULT NULL COMMENT 'form表单类型',
                                     `dictType` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '数据字典',
                                     `createTime` datetime NOT NULL COMMENT '创建时间',
                                     `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                     `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                     `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                     PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 377 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_codegen_column
-- ----------------------------

-- ----------------------------
-- Table structure for p_codegen_table
-- ----------------------------
DROP TABLE IF EXISTS `p_codegen_table`;
CREATE TABLE `p_codegen_table`  (
                                    `id` int NOT NULL AUTO_INCREMENT,
                                    `scene` tinyint NOT NULL DEFAULT 1 COMMENT '生成场景0:后台代码,1: 插件代码',
                                    `tableName` varchar(200) CHARACTER SET utf8mb4  NOT NULL DEFAULT '' COMMENT '表名称',
                                    `tableComment` varchar(500) CHARACTER SET utf8mb4  NOT NULL DEFAULT '' COMMENT '表描述',
                                    `moduleName` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '后端模块名/插件名称',
                                    `frontModuleName` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '前端模块名',
                                    `packageName` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '包名称',
                                    `className` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT '' COMMENT '类名称',
                                    `classComment` varchar(50) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '类描述',
                                    `author` varchar(50) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '作者',
                                    `parentMenuId` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '父菜单编号',
                                    `createTime` datetime NOT NULL COMMENT '创建时间',
                                    `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                    `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                    `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                    `mapperLocation` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'mapperxml存放路径',
                                    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_codegen_table
-- ----------------------------

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
                              `content` varchar(2048) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '评论内容',
                              `status` int NULL DEFAULT 0 COMMENT '状态:0正常,1:待审核',
                              `avatar` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '头像',
                              `website` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '网站地址',
                              `email` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '邮箱',
                              `userName` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '评论人',
                              `ip` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'ip',
                              `device` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '设备类型',
                              `createTime` datetime NOT NULL COMMENT '创建时间',
                              `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                              `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                              `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                              PRIMARY KEY (`id`) USING BTREE,
                              INDEX `articleId`(`articleId`) USING BTREE,
                              INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 89 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_comment
-- ----------------------------

-- ----------------------------
-- Table structure for p_dict
-- ----------------------------
DROP TABLE IF EXISTS `p_dict`;
CREATE TABLE `p_dict`  (
                           `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `dictType` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '字典类型',
                           `status` tinyint NOT NULL DEFAULT 0 COMMENT '状态',
                           `remark` varchar(500) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '备注',
                           `dictName` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '字典名',
                           `seq` int NOT NULL DEFAULT 0 COMMENT '排序',
                           `createTime` datetime NOT NULL COMMENT '创建时间',
                           `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                           `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                           `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_dict
-- ----------------------------
INSERT INTO `p_dict` VALUES (20, 'SEX', 0, '', '性别', 0, '2024-08-01 16:57:02', '2024-08-01 17:33:59', 5, 5);
INSERT INTO `p_dict` VALUES (21, 'USER_STATUS', 0, '', '用户状态', 0, '2024-08-01 16:58:46', NULL, 5, NULL);

-- ----------------------------
-- Table structure for p_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `p_dict_data`;
CREATE TABLE `p_dict_data`  (
                                `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                                `dictLabel` varchar(512) CHARACTER SET utf8mb4  NOT NULL COMMENT '展示值',
                                `dictValue` varchar(512) CHARACTER SET utf8mb4  NOT NULL COMMENT '字典值',
                                `dictExtendValue` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '扩展值',
                                `status` tinyint NOT NULL DEFAULT 0 COMMENT '状态',
                                `seq` int NOT NULL DEFAULT 0 COMMENT '排序',
                                `dictType` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '字典类型',
                                `parentDictType` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '父级字典类型',
                                `createTime` datetime NOT NULL COMMENT '创建时间',
                                `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_dict_data
-- ----------------------------
INSERT INTO `p_dict_data` VALUES (16, '男', '1', '', 0, 0, 'SEX_MAN', 'SEX', '2024-08-01 16:58:00', NULL, 5, NULL);
INSERT INTO `p_dict_data` VALUES (17, '女', '0', '', 0, 0, 'SEX_WOMAN', 'SEX', '2024-08-01 16:58:21', '2024-08-01 17:04:36', 5, 5);
INSERT INTO `p_dict_data` VALUES (18, '启用', '0', '', 0, 0, 'USER_STATUS_ENABLE', 'USER_STATUS', '2024-08-01 17:01:27', NULL, 5, NULL);
INSERT INTO `p_dict_data` VALUES (19, '禁用', '1', '', 0, 0, 'USER_STATUS_DISABLE', 'USER_STATUS', '2024-08-01 17:01:41', NULL, 5, NULL);

-- ----------------------------
-- Table structure for p_extra
-- ----------------------------
DROP TABLE IF EXISTS `p_extra`;
CREATE TABLE `p_extra`  (
                            `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                            `extraName` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '名称',
                            `extraDescription` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '描述',
                            `extraKey` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT 'key',
                            `extraData` longtext CHARACTER SET utf8mb4  NULL COMMENT '附加数据',
                            `createTime` datetime NOT NULL COMMENT '创建时间',
                            `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                            `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                            `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                            PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_extra
-- ----------------------------
INSERT INTO `p_extra` VALUES (1, '系统设置', '系统设置项-动态表单生成', 'system_setting', '{\n  \"option\": {\n    \"form\": {\n      \"inline\": false,\n      \"hideRequiredAsterisk\": false,\n      \"labelPosition\": \"right\",\n      \"size\": \"default\",\n      \"labelWidth\": \"125px\",\n      \"labelSuffix\": \"\"\n    },\n    \"resetBtn\": {\n      \"show\": false,\n      \"innerText\": \"重置\"\n    },\n    \"submitBtn\": {\n      \"show\": true,\n      \"innerText\": \"提交\"\n    },\n    \"formName\": \"system_setting\"\n  },\n  \"rule\": [\n    {\n      \"type\": \"elTabs\",\n      \"style\": {\n        \"width\": \"100%\"\n      },\n      \"children\": [\n        {\n          \"type\": \"elTabPane\",\n          \"props\": {\n            \"label\": \"基础设置\"\n          },\n          \"children\": [\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_NAME\",\n              \"title\": \"网站名称\",\n              \"info\": \"网站名称\",\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"请输入网站名称\",\n                \"clearable\": true\n              },\n              \"_fc_id\": \"id_Fl38lyzg7xd3alc\",\n              \"name\": \"ref_F65wlyzgcpyub1c\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"input\"\n            },\n            {\n              \"type\": \"AttachSelectInput\",\n              \"field\": \"WEB_ICO\",\n              \"title\": \"网站ICO\",\n              \"info\": \"网站ICO\",\n              \"$required\": false,\n              \"props\": {\n                \"enableInput\": true,\n                \"attachType\": \"img\",\n                \"placeholder\": \"请选择网站ICO图片\"\n              },\n              \"_fc_id\": \"id_Fkoblyzg8ml4azc\",\n              \"name\": \"ref_Flwalyzg8ml4b0c\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"AttachSelectInput\"\n            },\n            {\n              \"type\": \"AttachSelectInput\",\n              \"field\": \"WEB_LOGO\",\n              \"title\": \"网站logo\",\n              \"info\": \"网站logo\",\n              \"$required\": false,\n              \"props\": {\n                \"attachType\": \"img\",\n                \"enableInput\": true,\n                \"placeholder\": \"请选择网站logo\"\n              },\n              \"_fc_id\": \"id_F7ism0aqef5pabc\",\n              \"name\": \"ref_Fkavm0aqef5pacc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"AttachSelectInput\"\n            },\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_TITLE\",\n              \"title\": \"网站标题\",\n              \"info\": \"网站标题\",\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"请输入网站标题\"\n              },\n              \"_fc_id\": \"id_Fk2hlyzg81lfarc\",\n              \"name\": \"ref_F5zblyzg81lfasc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"input\"\n            },\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_SITE\",\n              \"title\": \"网站域名\",\n              \"info\": \"网站域名\",\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"请输入网站域名\"\n              },\n              \"_fc_id\": \"id_Frfrm3glr8puacc\",\n              \"name\": \"ref_Fyskm3glr8puadc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"input\"\n            },\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_COPYRIGHT\",\n              \"title\": \"版权信息\",\n              \"info\": \"版权信息\",\n              \"$required\": false,\n              \"props\": {\n                \"type\": \"textarea\",\n                \"placeholder\": \"版权信息\",\n                \"rows\": 6,\n                \"autosize\": false,\n                \"showWordLimit\": false\n              },\n              \"_fc_id\": \"id_F7lcm1hb0464bcc\",\n              \"name\": \"ref_F0dbm1hb0464bdc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"textarea\"\n            }\n          ],\n          \"_fc_id\": \"id_Fplxlyzg6jfoadc\",\n          \"name\": \"ref_F8qdlyzg6jfoaec\",\n          \"display\": true,\n          \"hidden\": false,\n          \"_fc_drag_tag\": \"elTabPane\"\n        },\n        {\n          \"type\": \"elTabPane\",\n          \"props\": {\n            \"label\": \"SEO设置\"\n          },\n          \"children\": [\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_META_KEYWORD\",\n              \"title\": \"网站关键词\",\n              \"info\": \"网站关键词\",\n              \"$required\": false,\n              \"props\": {\n                \"type\": \"textarea\",\n                \"placeholder\": \"网站关键词\",\n                \"rows\": 4\n              },\n              \"_fc_id\": \"id_Fz8um1hb4e7ubkc\",\n              \"name\": \"ref_F6q5m1hb4e7ublc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"textarea\"\n            },\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_META_DESC\",\n              \"title\": \"网站描述\",\n              \"info\": \"网站描述\",\n              \"$required\": false,\n              \"props\": {\n                \"type\": \"textarea\",\n                \"placeholder\": \"网站描述\",\n                \"rows\": 6\n              },\n              \"_fc_id\": \"id_F2oxm1hb4v09bnc\",\n              \"name\": \"ref_F61dm1hb4v09boc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"textarea\"\n            },\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_IS_AUTO_PUSH_BAIDU\",\n              \"title\": \"自动推送百度\",\n              \"info\": \"自动推送百度\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"是否自动推送百度\",\n                \"filterable\": true,\n                \"multiple\": false\n              },\n              \"options\": [\n                {\n                  \"label\": \"开启\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"关闭\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_F9a5m1hb5e6ubqc\",\n              \"name\": \"ref_Fwlgm1hb5e6ubrc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            }\n          ],\n          \"_fc_id\": \"id_F2kelyzgu7gvboc\",\n          \"name\": \"ref_Fiyhlyzgu7gvbpc\",\n          \"display\": true,\n          \"hidden\": false,\n          \"_fc_drag_tag\": \"elTabPane\"\n        },\n        {\n          \"type\": \"elTabPane\",\n          \"props\": {\n            \"label\": \"文章设置\"\n          },\n          \"children\": [\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_AUTO_GEN_SUMMARY\",\n              \"title\": \"自动生成摘要\",\n              \"info\": \"自动生成摘要\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"是否自动生成摘要\"\n              },\n              \"options\": [\n                {\n                  \"label\": \"开启\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"关闭\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_Fnrum1hb7qkybvc\",\n              \"name\": \"ref_Fa82m1hb7qkybwc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            },\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_RSS_GEN_MODE\",\n              \"title\": \"RSS生成方式\",\n              \"info\": \"RSS生成方式\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"请选择RSS生成方式\"\n              },\n              \"options\": [\n                {\n                  \"label\": \"全文\",\n                  \"value\": \"0\"\n                },\n                {\n                  \"label\": \"摘要\",\n                  \"value\": \"1\"\n                }\n              ],\n              \"_fc_id\": \"id_F2omm1hb8n7hbyc\",\n              \"name\": \"ref_Fnzum1hb8n7hbzc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            },\n            {\n              \"type\": \"inputNumber\",\n              \"field\": \"WEB_RSS_GEN_NUM\",\n              \"title\": \"RSS生成条数\",\n              \"info\": \"RSS生成条数\",\n              \"$required\": false,\n              \"props\": {\n                \"min\": 0,\n                \"stepStrictly\": false,\n                \"placeholder\": \"生成条数\"\n              },\n              \"_fc_id\": \"id_F2u6m1hbaa1sc4c\",\n              \"name\": \"ref_F8l8m1hbaa1sc5c\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"inputNumber\"\n            }\n          ],\n          \"_fc_id\": \"id_Fyyem0afvt7magc\",\n          \"name\": \"ref_Fckam0afvt7mahc\",\n          \"display\": true,\n          \"hidden\": false,\n          \"_fc_drag_tag\": \"elTabPane\"\n        },\n        {\n          \"type\": \"elTabPane\",\n          \"props\": {\n            \"label\": \"登录注册\"\n          },\n          \"children\": [\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_IS_REGISTER\",\n              \"title\": \"允许注册新用户\",\n              \"info\": \"\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"是否允许注册新用户\"\n              },\n              \"options\": [\n                {\n                  \"label\": \"允许\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"不允许\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_Fk1rlyzh9kwsdmc\",\n              \"name\": \"ref_F91elyzh9kwsdnc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            },\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_OPEN_CAPTCHA\",\n              \"title\": \"登录验证码\",\n              \"info\": \"\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"是否开启登录验证码\"\n              },\n              \"options\": [\n                {\n                  \"label\": \"开启\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"关闭\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_Fu9hlyzh9q7udsc\",\n              \"name\": \"ref_F9milyzh9q7udtc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            },\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_REGISTER_DEFAULT_ROLE\",\n              \"title\": \"新用户默认角色\",\n              \"info\": \"\",\n              \"effect\": {\n                \"fetch\": {\n                  \"parse\": \"[[FORM-CREATE-PREFIX-function parse(res){let result = [];\\nres.data.forEach(r => {\\n\\tresult.push({label: r.name, value: r.id +\\\"\\\"})\\n})\\nreturn result}-FORM-CREATE-SUFFIX]]\",\n                  \"onError\": \"\",\n                  \"to\": \"options\",\n                  \"action\": \"/api/auth/role/listAll\",\n                  \"method\": \"GET\",\n                  \"headers\": {},\n                  \"data\": {}\n                }\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"新用户默认角色\",\n                \"_optionType\": 1,\n                \"noDataText\": \"请先创建角色\",\n                \"reserveKeyword\": false\n              },\n              \"_fc_id\": \"id_Fn7dlyzh9mwtdpc\",\n              \"name\": \"ref_F6xrlyzh9mwtdqc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            }\n          ],\n          \"_fc_id\": \"id_F0cfm1hb18w2bec\",\n          \"name\": \"ref_Fm3cm1hb18w2bfc\",\n          \"display\": true,\n          \"hidden\": false,\n          \"_fc_drag_tag\": \"elTabPane\"\n        },\n        {\n          \"type\": \"elTabPane\",\n          \"props\": {\n            \"label\": \"评论相关\"\n          },\n          \"children\": [\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_COMMENT_IS_REVIEW\",\n              \"title\": \"评论需审核\",\n              \"info\": \"评论需审核\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"评论是否需审核\",\n                \"multiple\": false\n              },\n              \"options\": [\n                {\n                  \"label\": \"开启\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"关闭\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_Faokm1hbc0dkc7c\",\n              \"name\": \"ref_Fzk4m1hbc0dkc8c\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            },\n            {\n              \"type\": \"select\",\n              \"field\": \"WEB_COMMENT_IS_STINT\",\n              \"title\": \"评论限制\",\n              \"info\": \"开启后同一IP地址30s内将不允许再次评论,限制评论频率\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"是否开启评论限制\"\n              },\n              \"options\": [\n                {\n                  \"label\": \"开启\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"关闭\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_Fulmm1hbd4ckccc\",\n              \"name\": \"ref_F2h4m1hbd4ckcdc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            },\n            {\n              \"type\": \"select\",\n              \"field\": \"COMMENT_IS_SEND_MAIL\",\n              \"title\": \"评论邮件通知\",\n              \"info\": \"评论邮件通知\",\n              \"effect\": {\n                \"fetch\": \"\"\n              },\n              \"$required\": false,\n              \"props\": {\n                \"placeholder\": \"是否开启评论邮件通知\"\n              },\n              \"options\": [\n                {\n                  \"label\": \"开启\",\n                  \"value\": \"ON\"\n                },\n                {\n                  \"label\": \"关闭\",\n                  \"value\": \"OFF\"\n                }\n              ],\n              \"_fc_id\": \"id_F2rjm1hbes2ucfc\",\n              \"name\": \"ref_Fexdm1hbes2ucgc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"select\"\n            }\n          ],\n          \"_fc_id\": \"id_Fgbfm1hb1kapbhc\",\n          \"name\": \"ref_Fsrxm1hb1kapbic\",\n          \"display\": true,\n          \"hidden\": false,\n          \"_fc_drag_tag\": \"elTabPane\"\n        },\n        {\n          \"type\": \"elTabPane\",\n          \"props\": {\n            \"label\": \"其他设置\"\n          },\n          \"_fc_id\": \"id_Fcj1m1hb1ifgbgc\",\n          \"name\": \"ref_Fm3cm1hb18w2bfc\",\n          \"display\": true,\n          \"hidden\": false,\n          \"_fc_drag_tag\": \"elTabPane\",\n          \"children\": [\n            {\n              \"type\": \"input\",\n              \"field\": \"WEB_CUSTOM_HEAD\",\n              \"title\": \"自定义head\",\n              \"info\": \"放置于前台每个页面的head标签中,通常可以用来添加第三方统计的代码,如百度统计,或者可以自定义css/js等\",\n              \"$required\": false,\n              \"props\": {\n                \"type\": \"textarea\",\n                \"placeholder\": \"自定义head\",\n                \"rows\": 8\n              },\n              \"_fc_id\": \"id_F9ppm1hbg0pkcic\",\n              \"name\": \"ref_F93um1hbg0pkcjc\",\n              \"display\": true,\n              \"hidden\": false,\n              \"_fc_drag_tag\": \"textarea\"\n            }\n          ]\n        }\n      ],\n      \"_fc_id\": \"id_F252lyzg6jfoabc\",\n      \"name\": \"ref_Fxaklyzg6jfoacc\",\n      \"display\": true,\n      \"hidden\": false,\n      \"_fc_drag_tag\": \"elTabs\",\n      \"props\": {\n        \"tabPosition\": \"top\",\n        \"stretch\": false\n      }\n    }\n  ]\n}', '2024-07-24 10:55:00', '2024-11-14 08:59:57', 1, 1);

-- ----------------------------
-- Table structure for p_journal_attach
-- ----------------------------
DROP TABLE IF EXISTS `p_journal_attach`;
CREATE TABLE `p_journal_attach`  (
                                     `id` int NOT NULL AUTO_INCREMENT,
                                     `articleId` int NOT NULL,
                                     `attachId` int NOT NULL,
                                     `url` varchar(512) CHARACTER SET utf8mb4  NOT NULL,
                                     `createTime` datetime NOT NULL COMMENT '创建时间',
                                     `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                     `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                     `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                     `mineType` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文件类型mineType',
                                     `type` varchar(32) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文件类型',
                                     `name` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '文件名称',
                                     PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4  COMMENT = '动态附件表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_journal_attach
-- ----------------------------

-- ----------------------------
-- Table structure for p_link
-- ----------------------------
DROP TABLE IF EXISTS `p_link`;
CREATE TABLE `p_link`  (
                           `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `name` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '网站名',
                           `logo` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '网站logo',
                           `desc` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '网站描述',
                           `address` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '网站地址',
                           `createTime` datetime NOT NULL COMMENT '创建时间',
                           `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                           `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                           `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_link
-- ----------------------------

-- ----------------------------
-- Table structure for p_mail_log
-- ----------------------------
DROP TABLE IF EXISTS `p_mail_log`;
CREATE TABLE `p_mail_log`  (
                               `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
                               `mailTemplateCode` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '模板编号',
                               `sendDate` datetime NOT NULL COMMENT '发送时间',
                               `receiveMail` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '接收邮箱',
                               `mailTitle` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '邮件标题',
                               `sendStatus` int NOT NULL DEFAULT 0 COMMENT '发送状态',
                               `sendMail` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '发件邮箱',
                               `content` longtext CHARACTER SET utf8mb4  NOT NULL COMMENT '邮件内容',
                               `createTime` datetime NOT NULL COMMENT '创建时间',
                               `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                               `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                               `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                               PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_mail_log
-- ----------------------------

-- ----------------------------
-- Table structure for p_mail_server
-- ----------------------------
DROP TABLE IF EXISTS `p_mail_server`;
CREATE TABLE `p_mail_server`  (
                                  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
                                  `name` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '邮箱服务名称',
                                  `account` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '邮箱服务账号',
                                  `userName` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '邮箱服务用户名',
                                  `password` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '邮箱服务密码',
                                  `address` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '邮箱服务SMTP域名',
                                  `port` int NOT NULL COMMENT '邮箱服务SMTP端口',
                                  `status` int NOT NULL DEFAULT 0 COMMENT '状态',
                                  `enableSSL` tinyint NOT NULL DEFAULT 0 COMMENT '是否开启SSL',
                                  `createTime` datetime NOT NULL COMMENT '创建时间',
                                  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_mail_server
-- ----------------------------
INSERT INTO `p_mail_server` VALUES (2, '测试', 'perfree@126.com', 'perfree@126.com', '123456', 'smtp.126.com', 465, 0, 0, '2024-08-07 08:58:39', '2024-10-12 15:43:58', 5, 1);

-- ----------------------------
-- Table structure for p_mail_template
-- ----------------------------
DROP TABLE IF EXISTS `p_mail_template`;
CREATE TABLE `p_mail_template`  (
                                    `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
                                    `name` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '模板名称',
                                    `code` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '模板编码',
                                    `mailServerId` int NOT NULL COMMENT '邮箱服务id',
                                    `nickname` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '发送人名称',
                                    `mailTitle` varchar(255) CHARACTER SET utf8mb4  NOT NULL COMMENT '邮件标题',
                                    `mailContent` longtext CHARACTER SET utf8mb4  NOT NULL COMMENT '邮件内容',
                                    `mailParams` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '参数',
                                    `status` int NOT NULL DEFAULT 0 COMMENT '状态',
                                    `remark` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '备注',
                                    `createTime` datetime NOT NULL COMMENT '创建时间',
                                    `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                    `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                    `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_mail_template
-- ----------------------------
INSERT INTO `p_mail_template` VALUES (3, '评论模板', 'COMMENT_EMAIL', 2, 'Perfree', '有新的评论或回复', '<p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">评论内容:</span> {content}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">评  论  人:</span> {userName}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">所属标题:</span> {articleTitle}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">访问地址:</span> {url}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">状      态:</span> {status}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">评论时间:</span> {commentTime}</p>', '[\"content\",\"userName\",\"articleTitle\",\"url\",\"status\",\"commentTime\"]', 0, NULL, '2024-09-29 17:14:40', '2024-09-30 08:49:02', 1, 1);
INSERT INTO `p_mail_template` VALUES (4, '找回密码', 'FIND_PASSWORD', 2, 'Perfree', '验证码', '<p> 您正在执行找回密码操作,验证码:{random},验证码将在2分钟后失效 </p>', '[\"random\"]', 0, NULL, '2024-09-29 17:19:22', NULL, 1, NULL);
INSERT INTO `p_mail_template` VALUES (5, '评论回复模板', 'COMMENT_REVERT_EMAIL', 2, 'Perfree', '您有新的评论回复', '<blockquote><p>{parentContent}</p></blockquote><hr><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">评论内容:</span> {content}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">评  论  人:</span> {userName}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">所属标题:</span> {articleTitle}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">访问地址:</span> {url}</p><p><span style=\"color: rgb(153, 153, 153); font-size: 15px\">评论时间:</span> {commentTime}</p>', '[\"parentContent\",\"content\",\"userName\",\"articleTitle\",\"url\",\"commentTime\"]', 0, NULL, '2024-09-30 08:35:26', '2024-09-30 08:49:42', 1, 1);

-- ----------------------------
-- Table structure for p_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_menu`;
CREATE TABLE `p_menu`  (
                           `id` varchar(64) CHARACTER SET utf8mb4  NOT NULL COMMENT '主键',
                           `pid` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT '-1' COMMENT '父级id',
                           `name` varchar(128) CHARACTER SET utf8mb4  NOT NULL COMMENT '菜单名',
                           `url` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '菜单链接',
                           `icon` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '菜单图标',
                           `seq` int NULL DEFAULT 0 COMMENT '排序序号',
                           `target` int NULL DEFAULT 0 COMMENT '菜单打开方式:0本页,1:新窗口',
                           `status` int NOT NULL DEFAULT 0 COMMENT '菜单状态0:启用,1禁用',
                           `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                           `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                           `menuType` int NULL DEFAULT NULL COMMENT '菜单类型（0目录1菜单2按钮）',
                           `pluginId` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '插件id',
                           `flag` int NULL DEFAULT NULL COMMENT '菜单标识:0:系统自带,1:用户创建,2:插件',
                           `component` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '组件路径',
                           `componentName` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '组件名称',
                           `moduleName` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '模块名称',
                           `perms` varchar(100) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '权限标识',
                           `isFrame` int NULL DEFAULT 1 COMMENT '是否为外链（0是 1否）',
                           `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                           `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                           `type` int NOT NULL DEFAULT 0 COMMENT '菜单类型0:前台,1:后台',
                           PRIMARY KEY (`id`) USING BTREE,
                           INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_menu
-- ----------------------------
INSERT INTO `p_menu` VALUES ('08ee5bd09d5d4906a46657eaecb13deb', '8523081cf49d4147bc7915c4a1dcc779', '菜单查询', '', '', 0, 0, 0, '2024-08-05 15:09:17', NULL, 2, NULL, NULL, '', '', '', 'admin:menu:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('0cccffbbfb0948cfb2fa02bd970473f8', '63b7b5c9448c46849006d9a70db7bf44', '导出用户', '', '', 0, 0, 0, '2024-07-31 14:40:21', NULL, 2, NULL, NULL, '', '', '', 'admin:user:export', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('0dcec81faa5144728e1ad03da91b969d', '90bbec779bcb4c5b9146c34939843fb3', '更新数据字典', '', '', 0, 0, 0, '2024-08-01 15:13:59', NULL, 2, NULL, NULL, '', '', '', 'admin:dict:update', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('0f1f2a0fc6c74716bf5fb18372c304da', 'cf0fc9ecb7a54b058a9a1804277b588d', '附件查询', '', '', 0, 0, 0, '2024-08-05 15:03:01', '2024-08-05 15:03:26', 2, NULL, NULL, '', '', '', 'admin:attach:query', 1, 5, 5, 1);
INSERT INTO `p_menu` VALUES ('1281393868be45129a02c264573b11a4', 'd5f2f94d387c4017b12be016461d901b', '修改配置', '', '', 0, 0, 0, '2024-07-29 10:34:56', NULL, 2, NULL, NULL, '', '', '', 'admin:attachConfig:update', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('12d078832e7742f7b5ea7b8dac5dfc43', '710f1bffd9fc4f689527da9c3b65d3de', '邮件模板编辑', NULL, NULL, 0, 0, 0, '2024-08-07 09:09:52', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailTemplate:update', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('197fde87b25942c1a51b275dbbb61826', '8523081cf49d4147bc7915c4a1dcc779', '添加菜单', '', '', 0, 0, 0, '2024-07-29 10:19:02', NULL, 2, NULL, NULL, '', '', '', 'admin:menu:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('1db423ede3e24ca78829d339e26bf49d', '761690b8556346c5a12878adb64a0aa6', '系统工具', '', 'fa-solid fa-tools', 11, 0, 0, '2024-07-19 08:19:30', '2024-09-20 08:08:27', 0, NULL, NULL, '', '', '', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('2223e0083f1d44a898881897ac5fcbcf', '61a5edcf0ee04e7e96f0e0331526bd13', '查询插件', '', '', 0, 0, 0, '2024-08-05 15:09:32', NULL, 2, NULL, NULL, '', '', '', 'admin:plugin:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('239e153a564a4c1f975b75137a840ead', '651e7efc87654772a02ae7c7d1657673', '更新附加数据', '', '', 0, 0, 0, '2024-07-29 11:26:59', NULL, 2, NULL, NULL, '', '', '', 'admin:extra:update', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('23ec025618f24da9aaf641be01a5ec3a', 'd5f2f94d387c4017b12be016461d901b', '修改默认配置', '', '', 0, 0, 0, '2024-07-29 10:35:13', NULL, 2, NULL, NULL, '', '', '', 'admin:attachConfig:master', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('250011c482c64fd3a5e8937b52432555', 'cf0fc9ecb7a54b058a9a1804277b588d', '附件上传', '', '', 0, 0, 0, '2024-07-29 10:38:54', NULL, 2, NULL, NULL, '', '', '', 'admin:attach:upload', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('26a524f4c6f9417094bc4799a6aa50e1', '710f1bffd9fc4f689527da9c3b65d3de', '邮件模板查询', NULL, NULL, 0, 0, 0, '2024-08-07 09:09:52', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailTemplate:query', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('2b06560aee7a46719c49252b07846a5d', '63b7b5c9448c46849006d9a70db7bf44', '修改头像', '', '', 0, 0, 0, '2024-08-06 14:35:37', NULL, 2, NULL, NULL, '', '', '', 'admin:user:uploadAvatar', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('2f4eeb7715474ce3921206be3240df94', '61a5edcf0ee04e7e96f0e0331526bd13', '插件禁用', '', '', 0, 0, 0, '2024-07-29 10:26:15', NULL, 2, NULL, NULL, '', '', '', 'admin:plugin:disable', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('37544c31dc704f5eb5222c85225acf75', '51b9c42f2ac7469485c90450b36c931e', '邮件日志', '/admin/mailLog', 'fa-solid fa-feather-alt', 3, 0, 0, '2024-08-07 09:25:14', '2024-08-07 09:25:58', 1, NULL, NULL, '/view/MailLogView', 'mailLog', 'mail', NULL, 1, NULL, 5, 1);
INSERT INTO `p_menu` VALUES ('380c8a9accab449caa445ddce784b960', '90bbec779bcb4c5b9146c34939843fb3', '根据id删除数据字典', '', '', 0, 0, 0, '2024-08-01 15:14:22', NULL, 2, NULL, NULL, '', '', '', 'admin:dict:delete', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('3a45dcea5e2e40c7931209c69e8aee95', 'd5f2f94d387c4017b12be016461d901b', '根据id删除配置', '', '', 0, 0, 0, '2024-07-29 10:35:34', NULL, 2, NULL, NULL, '', '', '', 'admin:attachConfig:delete', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('3bdeb73dddab4e4c914752fa3c85c11f', '710f1bffd9fc4f689527da9c3b65d3de', '邮件模板删除', NULL, NULL, 0, 0, 0, '2024-08-07 09:09:52', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailTemplate:delete', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('3d5b4c9656024838a0d46a15b8e8b14c', '63b7b5c9448c46849006d9a70db7bf44', '分配角色', '', '', 0, 0, 0, '2024-07-29 09:39:03', NULL, 2, NULL, NULL, '', '', '', 'admin:user:configRole', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('414c91ca406643d9bdf82f27e35a4040', 'cf0fc9ecb7a54b058a9a1804277b588d', '删除附件', '', '', 0, 0, 0, '2024-07-29 10:39:41', NULL, 2, NULL, NULL, '', '', '', 'admin:attach:delete', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('41d57f7fa6e04d64a2c1a7988e9672fe', '61a5edcf0ee04e7e96f0e0331526bd13', '插件安装', '', '', 0, 0, 0, '2024-07-29 10:26:04', NULL, 2, NULL, NULL, '', '', '', 'admin:plugin:install', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('468a4045660641dbbb5e84961b9adbc7', 'd5f2f94d387c4017b12be016461d901b', '查询存储策略', '', '', 0, 0, 0, '2024-08-05 15:10:42', NULL, 2, NULL, NULL, '', '', '', 'admin:attachConfig:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('4f934ea37a214b36a7b5f6c67ce16e92', '1db423ede3e24ca78829d339e26bf49d', '动态表单', '/admin/genSetting', 'fa-solid fa-cash-register', 0, 0, 0, '2024-07-19 08:20:31', NULL, 1, NULL, NULL, '/view/GenSettingView', 'genSetting', 'tools', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('51b9c42f2ac7469485c90450b36c931e', '761690b8556346c5a12878adb64a0aa6', '邮箱管理', '', 'fa-solid fa-envelope-open', 10, 0, 0, '2024-08-07 08:18:31', NULL, 0, NULL, NULL, '', '', '', '', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('530b27c9119e4f018f2ef1254af42a5d', 'cc82cb6786f44ed4839d00e34f497a1f', '设置角色菜单权限', '', '', 0, 0, 0, '2024-07-29 10:09:24', NULL, 2, NULL, NULL, '', '', '', 'admin:role:permission', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('5f8174149dbe47438edc2d06118f43b5', '651e7efc87654772a02ae7c7d1657673', '添加附加数据', '', '', 0, 0, 0, '2024-07-29 11:26:49', NULL, 2, NULL, NULL, '', '', '', 'admin:extra:create', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('61a5edcf0ee04e7e96f0e0331526bd13', 'adbbceb6f644a4e6adbbceb6f644a4e6', '插件列表', '/admin/plugin', 'fa-solid fa-swatchbook', 3, 0, 0, '2024-07-19 08:02:56', '2024-09-11 14:48:39', 1, NULL, NULL, '/view/PluginView', 'plugin', 'plugin', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('63b7b5c9448c46849006d9a70db7bf44', '761690b8556346c5a12878adb64a0aa6', '用户管理', '/admin/user', 'fa-solid fa-user', 0, 0, 0, '2024-07-18 18:10:32', NULL, 1, NULL, NULL, '/view/UserView', 'user', 'user', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('651e7efc87654772a02ae7c7d1657673', '761690b8556346c5a12878adb64a0aa6', '附加数据', '/admin/extra', 'fa-solid fa-gas-pump', 8, 0, 0, '2024-07-29 10:56:05', NULL, 1, NULL, NULL, '/view/ExtraView', 'extra', 'extra', '', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('6643852bca394c87873ca14b8ea8833f', '63b7b5c9448c46849006d9a70db7bf44', '删除用户', '', '', 0, 0, 0, '2024-07-29 09:39:35', NULL, 2, NULL, NULL, '', '', '', 'admin:user:delete', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('669bf09b456f435d904081d34a61f17c', '8523081cf49d4147bc7915c4a1dcc779', '更新菜单', '', '', 0, 0, 0, '2024-07-29 10:19:15', NULL, 2, NULL, NULL, '', '', '', 'admin:menu:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('66f4d437c964404bb5b4f4337a455985', '651e7efc87654772a02ae7c7d1657673', '获取附加数据', '', '', 0, 0, 0, '2024-07-29 11:26:38', NULL, 2, NULL, NULL, '', '', '', 'admin:extra:get', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('68a9843a901343d5bcf4816c45331ed0', 'cc82cb6786f44ed4839d00e34f497a1f', '更新角色', '', '', 0, 0, 0, '2024-07-29 10:09:49', NULL, 2, NULL, NULL, '', '', '', 'admin:role:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('698a3635577441cf98ec67c9137bedf4', '63b7b5c9448c46849006d9a70db7bf44', '修改个人信息', '', '', 0, 0, 0, '2024-08-06 15:41:30', NULL, 2, NULL, NULL, '', '', '', 'admin:user:updateProfile', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('6ac7818257124ee2aa7b427946ddad29', '90bbec779bcb4c5b9146c34939843fb3', '添加数据字典值', '', '', 0, 0, 0, '2024-08-01 15:12:32', NULL, 2, NULL, NULL, '', '', '', 'admin:dictData:create', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('6e1aee6dd951461eb056e1d89d57ed41', '90bbec779bcb4c5b9146c34939843fb3', '查询字典', '', '', 0, 0, 0, '2024-08-05 15:10:05', NULL, 2, NULL, NULL, '', '', '', 'admin:dict:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('6fd6e8d439664a189402962a6e3f0e27', '37544c31dc704f5eb5222c85225acf75', '邮件日志创建', NULL, NULL, 0, 0, 0, '2024-08-07 09:25:14', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailLog:create', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('710f1bffd9fc4f689527da9c3b65d3de', '51b9c42f2ac7469485c90450b36c931e', '邮件模板', '/admin/mailTemplate', 'fa-solid fa-book-reader', 1, 0, 0, '2024-08-07 09:09:52', '2024-08-07 09:26:05', 1, NULL, NULL, '/view/MailTemplateView', 'mailTemplate', 'mail', NULL, 1, NULL, 5, 1);
INSERT INTO `p_menu` VALUES ('72698a6b681c44d3b7f8df2a0bb00cbe', '61a5edcf0ee04e7e96f0e0331526bd13', '插件启用', '', '', 0, 0, 0, '2024-07-29 10:26:27', NULL, 2, NULL, NULL, '', '', '', 'admin:plugin:enable', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('727856ff2c0e4f2394ca0f61e612228a', '90bbec779bcb4c5b9146c34939843fb3', '添加数据字典', '', '', 0, 0, 0, '2024-08-01 15:13:48', NULL, 2, NULL, NULL, '', '', '', 'admin:dict:create', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('761690b8556346c5a12878adb64a0aa6', '-1', '系统管理', '', 'fa-solid fa-shield-alt', 6, 0, 0, '2024-07-18 18:03:41', '2024-07-22 15:16:06', 0, NULL, NULL, '', '', '', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('7f53578b36a34017b14046fa1bbfa3b9', '651e7efc87654772a02ae7c7d1657673', '删除附加数据', '', '', 0, 0, 0, '2024-07-29 11:27:11', NULL, 2, NULL, NULL, '', '', '', 'admin:extra:delete', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('80ed89e93dcf4c709d8140770c509163', '651e7efc87654772a02ae7c7d1657673', '查询附加数据', '', '', 0, 0, 0, '2024-08-05 15:10:24', NULL, 2, NULL, NULL, '', '', '', 'admin:extra:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('826ad4e022e169fc826ad4e022e169fc', 'b94a31113b739a83b94a31113b739a83', '删除分类', '', '', 0, 0, 0, '2024-10-14 08:47:45', NULL, 2, NULL, NULL, '', '', '', 'admin:category:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('827fc9ecdb7f33e9827fc9ecdb7f33e9', 'bc0f7fd0e99873cbbc0f7fd0e99873cb', '审核评论', '', '', 0, 0, 0, '2024-10-14 08:54:08', NULL, 2, NULL, NULL, '', '', '', 'admin:comment:audit', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('83e63cf35ce9f74e83e63cf35ce9f74e', '-1', '分类', '/categories', 'fa-solid fa-rectangle-list', 1, 0, 0, '2024-09-20 16:30:36', '2024-09-23 08:53:53', 1, NULL, NULL, '', '', '', '', 1, 1, 1, 0);
INSERT INTO `p_menu` VALUES ('8439294ab87f89be8439294ab87f89be', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '页面管理', '/admin/page', 'fa-solid fa-laptop', 1, 0, 0, '2024-09-20 08:07:24', '2024-09-29 17:05:54', 1, NULL, NULL, '/view/PageView', 'page', 'page', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('846572dd17d082e9846572dd17d082e9', 'a6493c36629994bea6493c36629994be', '修改主题设置', '', '', 0, 0, 0, '2024-10-14 09:07:28', NULL, 2, NULL, NULL, '', '', '', 'admin:theme:updateSetting', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('846a28729d1f23a3846a28729d1f23a3', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '文章管理', '/admin/article', 'fa-solid fa-file-alt', 0, 0, 0, '2024-09-11 09:55:56', NULL, 1, NULL, NULL, '/view/ArticleView', 'article', 'article', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('8523081cf49d4147bc7915c4a1dcc779', '761690b8556346c5a12878adb64a0aa6', '菜单管理', '/admin/menu', 'fa-solid fa-list-numeric', 2, 0, 0, '2024-07-18 18:04:47', '2024-07-22 15:55:21', 1, NULL, NULL, '/view/MenuView', 'menu', 'menu', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('8719f2ecf75b79728719f2ecf75b7972', '87d8e48951829daf87d8e48951829daf', '删除动态', '', '', 0, 0, 0, '2024-10-14 08:27:00', NULL, 2, NULL, NULL, '', '', '', 'admin:journal:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('87d8e48951829daf87d8e48951829daf', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '动态管理', '/admin/journal', 'fa-solid fa-golf-ball-tee', 2, 0, 0, '2024-09-19 09:56:06', '2024-09-29 17:05:58', 1, NULL, NULL, '/view/JournalView', 'journal', 'journal', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('8823eba087599c9c8823eba087599c9c', '846a28729d1f23a3846a28729d1f23a3', '发表文章', '', '', 0, 0, 0, '2024-10-12 16:13:48', '2024-10-14 08:31:42', 2, NULL, NULL, '', '', '', 'admin:article:create', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('89467371e0fef2d689467371e0fef2d6', 'a59f78ea3ae9bdc5a59f78ea3ae9bdc5', '主题管理', '/admin/theme', 'fa-solid fa-gauge-med', 0, 0, 0, '2024-09-11 14:36:37', '2024-09-11 14:46:07', 1, NULL, NULL, '/view/ThemeView', 'theme', 'theme', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('8a6f0f85cac5433a8a6f0f85cac5433a', '-1', '写文章', '/admin/article/create', 'fa-solid fa-pencil-alt', 1, 0, 0, '2024-09-11 08:47:50', '2024-09-11 10:06:05', 1, NULL, NULL, '/view/ArticleCreateView', 'articleCreate', 'article', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('8c37b6ec9b6f7cc48c37b6ec9b6f7cc4', '8d408e60c6bfe3a88d408e60c6bfe3a8', '删除附件库数据项', '', '', 0, 0, 0, '2024-10-14 09:01:28', NULL, 2, NULL, NULL, '', '', '', 'admin:attachLibraryItems:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('8c9f74d7f14f34808c9f74d7f14f3480', 'bc0f7fd0e99873cbbc0f7fd0e99873cb', '删除评论', '', '', 0, 0, 0, '2024-10-14 08:53:32', NULL, 2, NULL, NULL, '', '', '', 'admin:comment:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('8ccfded986f9bc068ccfded986f9bc06', '846a28729d1f23a3846a28729d1f23a3', '修改状态', '', '', 0, 0, 0, '2024-10-14 08:33:24', NULL, 2, NULL, NULL, '', '', '', 'admin:article:updateStatus', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('8d408e60c6bfe3a88d408e60c6bfe3a8', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '附件库管理', '/admin/attachLibrary', 'fa-solid fa-feather-alt', 8, 0, 0, '2024-09-29 08:55:32', '2024-09-29 17:06:37', 1, NULL, NULL, '/view/AttachLibraryView', 'attachLibrary', 'attachLibrary', NULL, 1, NULL, 1, 1);
INSERT INTO `p_menu` VALUES ('8d916e50770b47d5a7e351e5b4c7a04f', 'f624dfd78d0549c9a0978d837098123b', '邮箱服务创建', NULL, NULL, 0, 0, 0, '2024-08-07 08:43:12', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailServer:create', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('8d92598d6cd848ff88a0e7931ed75fbf', '63b7b5c9448c46849006d9a70db7bf44', '修改个人密码', '', '', 0, 0, 0, '2024-08-06 16:14:57', NULL, 2, NULL, NULL, '', '', '', 'admin:user:updatePassword', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('8e5b8cf04fda42ce8e5b8cf04fda42ce', '8d408e60c6bfe3a88d408e60c6bfe3a8', '批量导入附件', '', '', 0, 0, 0, '2024-10-14 09:00:51', NULL, 2, NULL, NULL, '', '', '', 'admin:attachLibraryItems:batchAdd', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('8fec82b531eee0408fec82b531eee040', '89467371e0fef2d689467371e0fef2d6', '主题设置', '', '', 0, 0, 0, '2024-10-14 09:05:45', NULL, 2, NULL, NULL, '', '', '', 'admin:theme:setting', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('907b4a4c20c086d9907b4a4c20c086d9', 'b94a31113b739a83b94a31113b739a83', '添加分类', '', '', 0, 0, 0, '2024-10-14 08:47:17', NULL, 2, NULL, NULL, '', '', '', 'admin:category:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9098d2a9b29bf1b39098d2a9b29bf1b3', '8d408e60c6bfe3a88d408e60c6bfe3a8', '附件库编辑', NULL, NULL, 0, 0, 0, '2024-09-29 08:55:32', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:attachLibrary:update', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('90bbec779bcb4c5b9146c34939843fb3', '761690b8556346c5a12878adb64a0aa6', '字典管理', '/admin/dict', 'fa-solid fa-clipboard', 7, 0, 0, '2024-08-01 08:39:07', '2024-08-01 08:39:49', 1, NULL, NULL, '/view/DictView', 'dict', 'dict', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('91a4d8bab0b1014891a4d8bab0b10148', '8d408e60c6bfe3a88d408e60c6bfe3a8', '附件库删除', NULL, NULL, 0, 0, 0, '2024-09-29 08:55:32', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:attachLibrary:delete', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('936e84e0c5a85e80936e84e0c5a85e80', '846a28729d1f23a3846a28729d1f23a3', '删除文章', '', '', 0, 0, 0, '2024-10-14 08:32:08', NULL, 2, NULL, NULL, '', '', '', 'admin:article:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('937470b5543f4a65834f81420290f165', '710f1bffd9fc4f689527da9c3b65d3de', '邮件模板创建', NULL, NULL, 0, 0, 0, '2024-08-07 09:09:52', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailTemplate:create', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('941c14534e92acd8941c14534e92acd8', '846a28729d1f23a3846a28729d1f23a3', '修改是否置顶', '', '', 0, 0, 0, '2024-10-14 08:32:54', NULL, 2, NULL, NULL, '', '', '', 'admin:article:updateIsTop', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('96fa134407395a5896fa134407395a58', '89467371e0fef2d689467371e0fef2d6', '卸载主题', '', '', 0, 0, 0, '2024-10-14 09:03:35', NULL, 2, NULL, NULL, '', '', '', 'admin:theme:uninstall', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9778b9d1fe60e4299778b9d1fe60e429', 'b94a31113b739a83b94a31113b739a83', '修改分类', '', '', 0, 0, 0, '2024-10-14 08:47:35', NULL, 2, NULL, NULL, '', '', '', 'admin:category:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9846230efec146ac88d17f4b18dbde75', '37544c31dc704f5eb5222c85225acf75', '邮件日志查询', NULL, NULL, 0, 0, 0, '2024-08-07 09:25:14', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailLog:query', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('98e414e57560315498e414e575603154', 'aacf5aa0c3751526aacf5aa0c3751526', '修改标签', '', '', 0, 0, 0, '2024-10-14 08:51:03', NULL, 2, NULL, NULL, '', '', '', 'admin:tag:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9a741d9bc83b4208b30d57120506cdf3', '63b7b5c9448c46849006d9a70db7bf44', '重置密码', '', '', 0, 0, 0, '2024-07-29 09:39:19', NULL, 2, NULL, NULL, '', '', '', 'admin:user:resetPassword', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('9a7c3f7e068447989fcdaad8c6ab451a', 'f624dfd78d0549c9a0978d837098123b', '邮箱服务查询', NULL, NULL, 0, 0, 0, '2024-08-07 08:43:12', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailServer:query', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('9bf42425eb245d469bf42425eb245d46', '8d408e60c6bfe3a88d408e60c6bfe3a8', '附件库创建', NULL, NULL, 0, 0, 0, '2024-09-29 08:55:32', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:attachLibrary:create', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('9d0c7bdeb0d674b59d0c7bdeb0d674b5', '89467371e0fef2d689467371e0fef2d6', '编辑主题', '', '', 0, 0, 0, '2024-10-14 09:05:05', NULL, 2, NULL, NULL, '', '', '', 'admin:theme:edit', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9d13b76791c244828d8666af2299378b', 'cc82cb6786f44ed4839d00e34f497a1f', '添加角色', '', '', 0, 0, 0, '2024-07-29 10:09:36', NULL, 2, NULL, NULL, '', '', '', 'admin:role:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9e5ea10ef164e07a9e5ea10ef164e07a', '8439294ab87f89be8439294ab87f89be', '修改是否置顶', '', '', 0, 0, 0, '2024-10-14 08:41:53', NULL, 2, NULL, NULL, '', '', '', 'admin:page:updateIsTop', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('9e8431afbc1f6a529e8431afbc1f6a52', 'a1045e533cda960da1045e533cda960d', '修改友链', '', '', 0, 0, 0, '2024-10-14 08:56:18', NULL, 2, NULL, NULL, '', '', '', 'admin:link:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a1045e533cda960da1045e533cda960d', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '友链管理', '/admin/link', 'fa-solid fa-chain', 6, 0, 0, '2024-09-11 10:00:47', '2024-09-29 17:06:26', 1, NULL, NULL, '/view/LinkView', 'link', 'link', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('a10f6a599716c868a10f6a599716c868', '846a28729d1f23a3846a28729d1f23a3', '修改是否可见', '', '', 0, 0, 0, '2024-10-14 10:01:40', NULL, 2, NULL, NULL, '', '', '', 'admin:article:updateVisibility', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a151742c04f74cbca151742c04f74cbc', '87d8e48951829daf87d8e48951829daf', '修改是否置顶', '', '', 0, 0, 0, '2024-10-14 08:36:09', NULL, 2, NULL, NULL, '', '', '', 'admin:journal:updateIsTop', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a2a62a7e0f30a1a6a2a62a7e0f30a1a6', '-1', '首页', '/', 'fa-solid fa-home-lg', 0, 0, 0, '2024-09-20 16:29:20', '2024-09-26 16:02:20', 1, NULL, NULL, '', '', '', '', 1, 1, 1, 0);
INSERT INTO `p_menu` VALUES ('a316f0ad858a32a3a316f0ad858a32a3', '87d8e48951829daf87d8e48951829daf', '修改动态', '', '', 0, 0, 0, '2024-10-14 08:20:22', NULL, 2, NULL, NULL, '', '', '', 'admin:journal:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a4b3ab65ab806409a4b3ab65ab806409', '8439294ab87f89be8439294ab87f89be', '删除页面', '', '', 0, 0, 0, '2024-10-14 08:40:50', NULL, 2, NULL, NULL, '', '', '', 'admin:page:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a4c7fb3617b0c7caa4c7fb3617b0c7ca', '8439294ab87f89be8439294ab87f89be', '修改页面', '', '', 0, 0, 0, '2024-10-14 08:40:34', NULL, 2, NULL, NULL, '', '', '', 'admin:page:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a59f78ea3ae9bdc5a59f78ea3ae9bdc5', '-1', '主题管理', '', 'fa-solid fa-tachometer-alt-average', 4, 0, 0, '2024-09-11 14:43:35', NULL, 0, NULL, NULL, '', '', '', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a63668a379e14651a2a70d32881fe978', 'cc82cb6786f44ed4839d00e34f497a1f', '获取所有角色', '', '', 0, 0, 0, '2024-07-29 10:12:55', NULL, 2, NULL, NULL, '', '', '', 'admin:role:listAll', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('a6493c36629994bea6493c36629994be', 'a59f78ea3ae9bdc5a59f78ea3ae9bdc5', '主题设置', '/admin/theme/setting', 'fa-solid fa-cog', 1, 0, 0, '2024-09-11 14:45:35', NULL, 1, NULL, NULL, '/view/ThemeSettingView', 'themeSetting', 'theme', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('a6d1c4bd6ae14381919da10e7235c8da', '37544c31dc704f5eb5222c85225acf75', '邮件日志删除', NULL, NULL, 0, 0, 0, '2024-08-07 09:25:14', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailLog:delete', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('a7ce84c35fc13cb0a7ce84c35fc13cb0', 'aacf5aa0c3751526aacf5aa0c3751526', '新增标签', '', '', 0, 0, 0, '2024-10-14 08:50:50', NULL, 2, NULL, NULL, '', '', '', 'admin:tag:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('aacf5aa0c3751526aacf5aa0c3751526', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '标签管理', '/admin/tag', 'fa-solid fa-bookmark', 4, 0, 0, '2024-09-11 09:59:31', '2024-09-29 17:06:14', 1, NULL, NULL, '/view/TagView', 'tag', 'tag', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('ab02e0cef77adde0ab02e0cef77adde0', 'a1045e533cda960da1045e533cda960d', '新增友链', '', '', 0, 0, 0, '2024-10-14 08:56:06', NULL, 2, NULL, NULL, '', '', '', 'admin:link:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('ab46accc83c8a9d1ab46accc83c8a9d1', '846a28729d1f23a3846a28729d1f23a3', '修改是否允许评论', '', '', 0, 0, 0, '2024-10-14 08:32:32', NULL, 2, NULL, NULL, '', '', '', 'admin:article:updateIsComment', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('ac4b85255d624274ae18510f1a078f47', 'cc82cb6786f44ed4839d00e34f497a1f', '删除角色', '', '', 0, 0, 0, '2024-07-29 10:10:00', NULL, 2, NULL, NULL, '', '', '', 'admin:role:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('adbbceb6f644a4e6adbbceb6f644a4e6', '-1', '插件管理', '', 'fa-solid fa-plug-circle-exclamation', 5, 0, 0, '2024-09-11 14:48:22', NULL, 0, NULL, NULL, '', '', '', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('adbc1ca8908347aeba5259055ade89c9', '90bbec779bcb4c5b9146c34939843fb3', '查询字典数据', '', '', 0, 0, 0, '2024-08-05 15:09:54', NULL, 2, NULL, NULL, '', '', '', 'admin:dictData:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('add655451e5cfa5cadd655451e5cfa5c', '87d8e48951829daf87d8e48951829daf', '发表动态', '', '', 0, 0, 0, '2024-10-14 08:20:00', NULL, 2, NULL, NULL, '', '', '', 'admin:journal:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('ae18dd4845aacef8ae18dd4845aacef8', '8439294ab87f89be8439294ab87f89be', '发表页面', '', '', 0, 0, 0, '2024-10-14 08:40:21', NULL, 2, NULL, NULL, '', '', '', 'admin:page:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('ae637b4c6e6dcc4eae637b4c6e6dcc4e', 'bc0f7fd0e99873cbbc0f7fd0e99873cb', '回复评论', '', '', 0, 0, 0, '2024-10-14 08:54:50', NULL, 2, NULL, NULL, '', '', '', 'admin:comment:reply', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('af4cb0b4a4c1807faf4cb0b4a4c1807f', '-1', '内容管理', '', 'fa-solid fa-chart-simple', 2, 0, 0, '2024-09-11 09:54:58', NULL, 0, NULL, NULL, '', '', '', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b0edea62c3d2402791cae086f5916ceb', '63b7b5c9448c46849006d9a70db7bf44', '用户查询', '', '', 0, 0, 0, '2024-08-05 15:08:45', NULL, 2, NULL, NULL, '', '', '', 'admin:user:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('b2477cd3874d2dbbb2477cd3874d2dbb', '-1', '标签', '/tags', 'fa-solid fa-tags', 2, 0, 0, '2024-09-24 14:04:59', '2024-09-24 14:05:14', 1, NULL, NULL, '', '', '', '', 1, 1, 1, 0);
INSERT INTO `p_menu` VALUES ('b30a24fb2739f3d0b30a24fb2739f3d0', '8d408e60c6bfe3a88d408e60c6bfe3a8', '添加附件库数据项', '', '', 0, 0, 0, '2024-10-14 09:00:31', NULL, 2, NULL, NULL, '', '', '', 'admin:attachLibraryItems:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b458cc83d9811393b458cc83d9811393', '846a28729d1f23a3846a28729d1f23a3', '修改文章', '', '', 0, 0, 0, '2024-10-14 08:31:56', NULL, 2, NULL, NULL, '', '', '', 'admin:article:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b468499f2c09e567b468499f2c09e567', '-1', '动态', '/journal', 'fa-solid fa-golf-ball-tee', 3, 0, 0, '2024-09-20 17:29:41', '2024-09-24 14:05:19', 1, NULL, NULL, '', '', '', '', 1, 1, 1, 0);
INSERT INTO `p_menu` VALUES ('b536e4fe1ca44947a8080f4bae6644a9', '90bbec779bcb4c5b9146c34939843fb3', '更新数据字典值', '', '', 0, 0, 0, '2024-08-01 15:12:43', NULL, 2, NULL, NULL, '', '', '', 'admin:dictData:update', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('b622a22f7a034e0db622a22f7a034e0d', '-1', '友链', '/page/link', 'fa-solid fa-link', 5, 0, 0, '2024-09-23 11:06:25', NULL, 1, NULL, NULL, '', '', '', '', 1, 1, NULL, 0);
INSERT INTO `p_menu` VALUES ('b6d28fa097924806b78a4fbe3e1b35dc', '37544c31dc704f5eb5222c85225acf75', '邮件日志编辑', NULL, NULL, 0, 0, 0, '2024-08-07 09:25:14', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailLog:update', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('b7d28f813460937cb7d28f813460937c', '87d8e48951829daf87d8e48951829daf', '修改是否允许评论', '', '', 0, 0, 0, '2024-10-14 08:35:58', NULL, 2, NULL, NULL, '', '', '', 'admin:journal:updateIsComment', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b84afefce4e60045b84afefce4e60045', '8439294ab87f89be8439294ab87f89be', '修改状态', '', '', 0, 0, 0, '2024-10-14 08:42:11', NULL, 2, NULL, NULL, '', '', '', 'admin:page:updateStatus', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b8e3f9fc79e75aaab8e3f9fc79e75aaa', 'aacf5aa0c3751526aacf5aa0c3751526', '删除标签', '', '', 0, 0, 0, '2024-10-14 08:51:33', NULL, 2, NULL, NULL, '', '', '', 'admin:tag:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b94a31113b739a83b94a31113b739a83', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '分类管理', '/admin/category', 'fa-solid fa-bars', 3, 0, 0, '2024-09-11 09:57:28', '2024-09-29 17:06:08', 1, NULL, NULL, '/view/CategoryView', 'category', 'category', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('b995018b44b14b05b5049633fe0824f9', '8523081cf49d4147bc7915c4a1dcc779', '删除菜单', '', '', 0, 0, 0, '2024-07-29 10:19:33', NULL, 2, NULL, NULL, '', '', '', 'admin:menu:del', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('b9a6351339647689b9a6351339647689', '8439294ab87f89be8439294ab87f89be', '修改是否允许评论', '', '', 0, 0, 0, '2024-10-14 08:41:09', NULL, 2, NULL, NULL, '', '', '', 'admin:page:updateIsComment', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('ba8cb1619a8cc77cba8cb1619a8cc77c', '8d408e60c6bfe3a88d408e60c6bfe3a8', '修改附件库数据项', '', '', 0, 0, 0, '2024-10-14 09:01:08', NULL, 2, NULL, NULL, '', '', '', 'admin:attachLibraryItems:update', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('baa91d3a624041e89fd3f65049119352', '63b7b5c9448c46849006d9a70db7bf44', '创建用户', '', '', 0, 0, 0, '2024-07-29 09:22:51', NULL, 2, NULL, NULL, '', '', '', 'admin:user:create', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('baaef8fce790d0cfbaaef8fce790d0cf', 'a1045e533cda960da1045e533cda960d', '删除友链', '', '', 0, 0, 0, '2024-10-14 08:56:32', NULL, 2, NULL, NULL, '', '', '', 'admin:link:delete', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('bb626f4c02de498f8b67af93ae4bbcbd', '37544c31dc704f5eb5222c85225acf75', '邮件日志导出', NULL, NULL, 0, 0, 0, '2024-08-07 09:25:14', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailLog:export', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('bc0f7fd0e99873cbbc0f7fd0e99873cb', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '评论管理', '/admin/comment', 'fa-solid fa-comment-alt', 5, 0, 0, '2024-09-11 10:02:50', '2024-09-29 17:06:21', 1, NULL, NULL, '/view/CommentView', 'comment', 'comment', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('bc393973512edd7abc393973512edd7a', '-1', '归档', '/archive', 'fa-solid fa-archive', 4, 0, 0, '2024-09-23 08:59:39', '2024-09-24 14:05:24', 1, NULL, NULL, '', '', '', '', 1, 1, 1, 0);
INSERT INTO `p_menu` VALUES ('bc473014a9ac0aafbc473014a9ac0aaf', '89467371e0fef2d689467371e0fef2d6', '安装主题', '', '', 0, 0, 0, '2024-10-14 09:03:19', NULL, 2, NULL, NULL, '', '', '', 'admin:theme:install', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('bcd395403b3586b4bcd395403b3586b4', '761690b8556346c5a12878adb64a0aa6', '关于系统', '/admin/about', 'fa-solid fa-fan', 12, 0, 0, '2024-10-18 13:56:37', '2024-10-18 14:00:07', 1, NULL, NULL, '/view/AboutView', 'about', 'about', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('bdc65690e1564309bf3599464be79c87', '761690b8556346c5a12878adb64a0aa6', '系统设置', '/admin/setting', 'fa-solid fa-tools', 6, 0, 0, '2024-07-24 10:46:44', NULL, 1, NULL, NULL, '/view/SettingView', 'setting', 'setting', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('bf6fa66804256db4bf6fa66804256db4', '89467371e0fef2d689467371e0fef2d6', '切换主题', '', '', 0, 0, 0, '2024-10-14 09:04:28', NULL, 2, NULL, NULL, '', '', '', 'admin:theme:swatchTheme', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('c19c0aa30b204da38e05b59df0d33f98', 'f624dfd78d0549c9a0978d837098123b', '邮箱服务删除', NULL, NULL, 0, 0, 0, '2024-08-07 08:43:12', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailServer:delete', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('c2841323ae404bb5931387daaebcc033', 'cf0fc9ecb7a54b058a9a1804277b588d', '修改附件', '', '', 0, 0, 0, '2024-07-29 10:39:30', NULL, 2, NULL, NULL, '', '', '', 'admin:attach:update', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('c669c1b7b2164c059cb2cd168593a7ae', 'd5f2f94d387c4017b12be016461d901b', '新增配置', '', '', 0, 0, 0, '2024-07-29 10:34:43', NULL, 2, NULL, NULL, '', '', '', 'admin:attachConfig:create', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('cc82cb6786f44ed4839d00e34f497a1f', '761690b8556346c5a12878adb64a0aa6', '角色管理', '/admin/role', 'fa-solid fa-male', 1, 0, 0, '2024-07-22 15:20:35', '2024-07-22 15:55:16', 1, NULL, NULL, '/view/RoleView', 'role', 'role', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('cd2d1878be064e259ac0a4778d075c1b', '710f1bffd9fc4f689527da9c3b65d3de', '邮件模板导出', NULL, NULL, 0, 0, 0, '2024-08-07 09:09:52', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailTemplate:export', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('cf0fc9ecb7a54b058a9a1804277b588d', 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '附件管理', '/admin/attach', 'fa-solid fa-file-alt', 7, 0, 0, '2024-07-22 15:42:07', '2024-09-29 17:06:32', 1, NULL, NULL, '/view/AttachView', 'attach', 'attach', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('cff9c2d2df054315a4ce80e93f2be26f', 'cf0fc9ecb7a54b058a9a1804277b588d', '附件下载', '', '', 0, 0, 0, '2024-07-29 10:40:35', NULL, 2, NULL, NULL, '', '', '', 'admin:attach:download', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('d07424941145449ab4cc297907f71a1a', '63b7b5c9448c46849006d9a70db7bf44', '修改状态', '', '', 0, 0, 0, '2024-08-02 14:16:58', NULL, 2, NULL, NULL, '', '', '', 'admin:user:updateStatus', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('d0c4dd04fcab4d699a0cc9aa335677c2', 'cc82cb6786f44ed4839d00e34f497a1f', '角色查询', '', '', 0, 0, 0, '2024-08-05 15:09:02', NULL, 2, NULL, NULL, '', '', '', 'admin:role:query', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('d5f2f94d387c4017b12be016461d901b', '761690b8556346c5a12878adb64a0aa6', '附件存储策略', '/admin/attachConfig', 'fa-solid fa-archive', 9, 0, 0, '2024-07-22 15:43:09', '2024-09-11 10:04:54', 1, NULL, NULL, '/view/AttachConfigView', 'attachConfig', 'attach', '', 1, 1, 1, 1);
INSERT INTO `p_menu` VALUES ('d905ce8ac56c4bd38dbaae495406b872', 'cf0fc9ecb7a54b058a9a1804277b588d', '附件详情', '', '', 0, 0, 0, '2024-07-29 10:40:24', NULL, 2, NULL, NULL, '', '', '', 'admin:attach:desc', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('d928b6485f544a83acd9e53bc8c33c2a', 'bdc65690e1564309bf3599464be79c87', '保存配置项', '', '', 0, 0, 0, '2024-07-29 10:29:49', NULL, 2, NULL, NULL, '', '', '', 'admin:option:saveOptionList', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('de3e6b083a5c464ba3f361977824f9fb', '90bbec779bcb4c5b9146c34939843fb3', '根据id删除数据字典值', '', '', 0, 0, 0, '2024-08-01 15:13:09', NULL, 2, NULL, NULL, '', '', '', 'admin:dictData:delete', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('e47290657b57452cb8fed36bb80a8139', '63b7b5c9448c46849006d9a70db7bf44', '修改用户', '', '', 0, 0, 0, '2024-07-29 09:38:49', NULL, 2, NULL, NULL, '', '', '', 'admin:user:update', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('e9ecec54791b4693b4e7f1ecfcdbe218', '1db423ede3e24ca78829d339e26bf49d', '代码生成', '/admin/codegen', 'fa-solid fa-legal', 0, 0, 0, '2024-07-22 15:48:30', NULL, 1, NULL, NULL, '/view/CodegenView', 'codegen', 'tools', '', 1, 1, NULL, 1);
INSERT INTO `p_menu` VALUES ('f4ae2637c1354ae3a61d44a870d3513a', '61a5edcf0ee04e7e96f0e0331526bd13', '卸载插件', '', '', 0, 0, 0, '2024-07-29 10:26:39', NULL, 2, NULL, NULL, '', '', '', 'admin:plugin:uninstall', 1, 5, NULL, 1);
INSERT INTO `p_menu` VALUES ('f624dfd78d0549c9a0978d837098123b', '51b9c42f2ac7469485c90450b36c931e', '邮箱服务', '/admin/mailServer', 'fa-solid fa-building-circle-arrow-right', 0, 0, 0, '2024-08-07 08:43:12', '2024-08-07 08:46:55', 1, NULL, NULL, '/view/MailServerView', 'mailServer', 'mail', NULL, 1, NULL, 5, 1);
INSERT INTO `p_menu` VALUES ('f7f0df50f45e494fa4f6613e141a2e98', 'f624dfd78d0549c9a0978d837098123b', '邮箱服务编辑', NULL, NULL, 0, 0, 0, '2024-08-07 08:43:12', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailServer:update', 1, NULL, NULL, 1);
INSERT INTO `p_menu` VALUES ('ff55eba3bf6b45618bc806e8108bd525', 'f624dfd78d0549c9a0978d837098123b', '邮箱服务导出', NULL, NULL, 0, 0, 0, '2024-08-07 08:43:12', NULL, 2, NULL, NULL, NULL, NULL, NULL, 'admin:mailServer:export', 1, NULL, NULL, 1);

-- ----------------------------
-- Table structure for p_option
-- ----------------------------
DROP TABLE IF EXISTS `p_option`;
CREATE TABLE `p_option`  (
                             `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                             `key` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT 'key',
                             `value` text CHARACTER SET utf8mb4  NULL COMMENT 'value',
                             `title` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '标题',
                             `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
                             `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                             `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                             `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                             `identification` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '标识',
                             PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3593 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_option
-- ----------------------------
INSERT INTO `p_option` VALUES (1, 'WEB_THEME', 'default', '默认主题', '2024-09-11 14:40:51', '2024-09-11 14:42:01', 1, 1, 'system');
INSERT INTO `p_option` VALUES (3479, 'WEB_ICO', '', '网站ICO', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3480, 'WEB_LOGO', '', '网站logo', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3482, 'WEB_COPYRIGHT', '', '版权信息', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3483, 'WEB_META_KEYWORD', '', '网站关键词', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3484, 'WEB_META_DESC', '', '网站描述', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3485, 'WEB_IS_AUTO_PUSH_BAIDU', NULL, '自动推送百度', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3486, 'WEB_AUTO_GEN_SUMMARY', '', '自动生成摘要', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3487, 'WEB_RSS_GEN_MODE', '', 'RSS生成方式', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3488, 'WEB_RSS_GEN_NUM', '', 'RSS生成条数', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3489, 'WEB_IS_REGISTER', 'ON', '允许注册新用户', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3490, 'WEB_OPEN_CAPTCHA', 'ON', '登录验证码', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3491, 'WEB_REGISTER_DEFAULT_ROLE', '2', '新用户默认角色', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3492, 'WEB_COMMENT_IS_REVIEW', 'OFF', '评论需审核', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3493, 'WEB_COMMENT_IS_STINT', 'OFF', '评论限制', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3494, 'COMMENT_IS_SEND_MAIL', 'OFF', '评论邮件通知', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');
INSERT INTO `p_option` VALUES (3495, 'WEB_CUSTOM_HEAD', '', '自定义head', '2024-10-12 16:00:33', NULL, 1, NULL, 'system_setting');

-- ----------------------------
-- Table structure for p_plugin
-- ----------------------------
DROP TABLE IF EXISTS `p_plugin`;
CREATE TABLE `p_plugin`  (
                             `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                             `name` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '插件名',
                             `pluginId` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '插件id',
                             `desc` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '插件描述',
                             `version` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '版本',
                             `author` varchar(64) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '作者',
                             `website` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '网址',
                             `email` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '邮箱',
                             `isDev` bit(1) NULL DEFAULT NULL COMMENT '是否为开发环境',
                             `frontDevAddress` varchar(255) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '开发环境前端地址',
                             `status` int NOT NULL DEFAULT 0 COMMENT '插件状态:0禁用,1启用',
                             `createTime` datetime NOT NULL COMMENT '创建时间',
                             `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                             `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                             `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                             PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1521 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_plugin
-- ----------------------------

-- ----------------------------
-- Table structure for p_role
-- ----------------------------
DROP TABLE IF EXISTS `p_role`;
CREATE TABLE `p_role`  (
                           `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `name` varchar(32) CHARACTER SET utf8mb4  NOT NULL COMMENT '角色名',
                           `description` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '角色描述',
                           `code` varchar(32) CHARACTER SET utf8mb4  NOT NULL COMMENT '角色码',
                           `createTime` datetime NOT NULL COMMENT '创建时间',
                           `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                           `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                           `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                           PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_role
-- ----------------------------
INSERT INTO `p_role` VALUES (1, '管理员', '网站管理员', 'admin', '2024-03-19 11:39:26', '2024-03-19 11:39:26', NULL, NULL);
INSERT INTO `p_role` VALUES (2, '普通用户', '网站用户', 'user', '2024-03-19 11:39:26', '2024-03-19 11:39:26', NULL, NULL);
INSERT INTO `p_role` VALUES (3, '文章编辑', '文章编辑', 'editor', '2024-03-19 11:39:26', '2024-03-19 11:39:26', NULL, NULL);

-- ----------------------------
-- Table structure for p_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `p_role_menu`;
CREATE TABLE `p_role_menu`  (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `roleId` int NOT NULL COMMENT '角色id',
                                `menuId` varchar(64) CHARACTER SET utf8mb4  NOT NULL COMMENT '菜单id',
                                `createTime` datetime NULL DEFAULT NULL COMMENT '创建时间',
                                `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                                `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                                `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3842 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_role_menu
-- ----------------------------
INSERT INTO `p_role_menu` VALUES (3788, 3, '8a6f0f85cac5433a8a6f0f85cac5433a', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3789, 3, 'af4cb0b4a4c1807faf4cb0b4a4c1807f', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3790, 3, '846a28729d1f23a3846a28729d1f23a3', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3791, 3, '8823eba087599c9c8823eba087599c9c', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3792, 3, '8ccfded986f9bc068ccfded986f9bc06', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3793, 3, '936e84e0c5a85e80936e84e0c5a85e80', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3794, 3, '941c14534e92acd8941c14534e92acd8', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3795, 3, 'a10f6a599716c868a10f6a599716c868', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3796, 3, 'ab46accc83c8a9d1ab46accc83c8a9d1', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3797, 3, 'b458cc83d9811393b458cc83d9811393', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3798, 3, '8439294ab87f89be8439294ab87f89be', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3799, 3, '9e5ea10ef164e07a9e5ea10ef164e07a', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3800, 3, 'a4b3ab65ab806409a4b3ab65ab806409', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3801, 3, 'a4c7fb3617b0c7caa4c7fb3617b0c7ca', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3802, 3, 'ae18dd4845aacef8ae18dd4845aacef8', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3803, 3, 'b84afefce4e60045b84afefce4e60045', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3804, 3, 'b9a6351339647689b9a6351339647689', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3805, 3, '87d8e48951829daf87d8e48951829daf', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3806, 3, '8719f2ecf75b79728719f2ecf75b7972', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3807, 3, 'a151742c04f74cbca151742c04f74cbc', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3808, 3, 'a316f0ad858a32a3a316f0ad858a32a3', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3809, 3, 'add655451e5cfa5cadd655451e5cfa5c', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3810, 3, 'b7d28f813460937cb7d28f813460937c', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3811, 3, 'b94a31113b739a83b94a31113b739a83', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3812, 3, '826ad4e022e169fc826ad4e022e169fc', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3813, 3, '907b4a4c20c086d9907b4a4c20c086d9', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3814, 3, '9778b9d1fe60e4299778b9d1fe60e429', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3815, 3, 'aacf5aa0c3751526aacf5aa0c3751526', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3816, 3, '98e414e57560315498e414e575603154', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3817, 3, 'a7ce84c35fc13cb0a7ce84c35fc13cb0', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3818, 3, 'b8e3f9fc79e75aaab8e3f9fc79e75aaa', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3819, 3, 'bc0f7fd0e99873cbbc0f7fd0e99873cb', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3820, 3, '827fc9ecdb7f33e9827fc9ecdb7f33e9', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3821, 3, '8c9f74d7f14f34808c9f74d7f14f3480', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3822, 3, 'ae637b4c6e6dcc4eae637b4c6e6dcc4e', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3823, 3, 'a1045e533cda960da1045e533cda960d', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3824, 3, '9e8431afbc1f6a529e8431afbc1f6a52', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3825, 3, 'ab02e0cef77adde0ab02e0cef77adde0', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3826, 3, 'baaef8fce790d0cfbaaef8fce790d0cf', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3827, 3, 'cf0fc9ecb7a54b058a9a1804277b588d', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3828, 3, '0f1f2a0fc6c74716bf5fb18372c304da', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3829, 3, '250011c482c64fd3a5e8937b52432555', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3830, 3, '414c91ca406643d9bdf82f27e35a4040', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3831, 3, 'c2841323ae404bb5931387daaebcc033', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3832, 3, 'cff9c2d2df054315a4ce80e93f2be26f', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3833, 3, 'd905ce8ac56c4bd38dbaae495406b872', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3834, 3, '8d408e60c6bfe3a88d408e60c6bfe3a8', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3835, 3, '8c37b6ec9b6f7cc48c37b6ec9b6f7cc4', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3836, 3, '8e5b8cf04fda42ce8e5b8cf04fda42ce', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3837, 3, '9098d2a9b29bf1b39098d2a9b29bf1b3', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3838, 3, '91a4d8bab0b1014891a4d8bab0b10148', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3839, 3, '9bf42425eb245d469bf42425eb245d46', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3840, 3, 'b30a24fb2739f3d0b30a24fb2739f3d0', '2024-10-14 10:24:34', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (3841, 3, 'ba8cb1619a8cc77cba8cb1619a8cc77c', '2024-10-14 10:24:34', NULL, 1, NULL);

-- ----------------------------
-- Table structure for p_tag
-- ----------------------------
DROP TABLE IF EXISTS `p_tag`;
CREATE TABLE `p_tag`  (
                          `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                          `name` varchar(256) CHARACTER SET utf8mb4  NOT NULL COMMENT '标签名',
                          `color` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '颜色',
                          `thumbnail` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '缩略图',
                          `slug` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT 'slug',
                          `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                          `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                          `createTime` datetime NOT NULL COMMENT '创建时间',
                          `updateTime` datetime NULL DEFAULT NULL COMMENT '修改时间',
                          PRIMARY KEY (`id`) USING BTREE,
                          INDEX `slug`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_tag
-- ----------------------------

-- ----------------------------
-- Table structure for p_user
-- ----------------------------
DROP TABLE IF EXISTS `p_user`;
CREATE TABLE `p_user`  (
                           `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
                           `account` varchar(32) CHARACTER SET utf8mb4  NOT NULL COMMENT '账户',
                           `userName` varchar(32) CHARACTER SET utf8mb4  NOT NULL COMMENT '账户名',
                           `password` varchar(32) CHARACTER SET utf8mb4  NOT NULL COMMENT '密码',
                           `salt` varchar(32) CHARACTER SET utf8mb4  NOT NULL COMMENT '盐值',
                           `status` int NOT NULL DEFAULT 0 COMMENT '状态:0正常,1禁用',
                           `avatar` varchar(512) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '头像',
                           `email` varchar(128) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '邮箱',
                           `website` varchar(256) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '网站地址',
                           `createTime` datetime NOT NULL COMMENT '创建时间',
                           `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
                           `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
                           `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
                           `remark` varchar(500) CHARACTER SET utf8mb4  NULL DEFAULT NULL COMMENT '备注',
                           `mobile` varchar(11) CHARACTER SET utf8mb4  NULL DEFAULT '' COMMENT '手机号码',
                           `sex` tinyint NULL DEFAULT NULL COMMENT '用户性别',
                           `loginIp` varchar(50) CHARACTER SET utf8mb4  NULL DEFAULT '' COMMENT '最后登录IP',
                           `loginDate` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
                           PRIMARY KEY (`id`) USING BTREE,
                           INDEX `account`(`account`) USING BTREE,
                           INDEX `status`(`status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_user
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4  ROW_FORMAT = DYNAMIC;

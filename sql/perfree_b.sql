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

 Date: 19/07/2024 14:45:27
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
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `p_article` VALUES (12, '2132133232', '写点什么?水电费水电费是的', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"5f935e23417cc178bc23241b832b86b31\" class=\"cherry-highlight-line\">写点什么?水电费水电费是的</p></div>', 'markdown', 'article', '写点什么?水电费水电费是的', '', '', '', '2132133232', 0, 1, 0, 0, 0, 1, '', NULL, '2024-06-20 11:59:51', '2024-06-21 17:51:56', 1, 1);
INSERT INTO `p_article` VALUES (13, '阿斯顿撒', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'ASDS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:55:51', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (14, '21323', '写点什么?323', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"30b8744ea568b0f09b16bd98a69067161\" class=\"cherry-highlight-line\">写点什么?323</p></div>', 'markdown', 'article', '写点什么?323', '', '', '', '21323', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:56:45', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (15, '32123', '写点什么?213', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"5751b76e92c888cb075184a41a701c881\" class=\"cherry-highlight-line\">写点什么?213</p></div>', 'markdown', 'article', '写点什么?213', '', '', '', '32123', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:58:24', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (17, '第三方第三方斯蒂芬', '写点什么?', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"3a1036641efd3e64c7528b7c914c490a1\" class=\"cherry-highlight-line\">写点什么?</p></div>', 'markdown', 'article', '写点什么?', '', '', '', 'DSFDSFSDF', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 13:58:46', '2024-06-20 14:14:27', 1, 1);
INSERT INTO `p_article` VALUES (20, '是的是的大萨达洒点水', '写点什么?撒打算', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"888135ef286ee7becddb69847a997d6b1\" class=\"cherry-highlight-line\">写点什么?撒打算</p></div>', 'markdown', 'article', '写点什么?撒打算', '', '', '', 'SDSDDSDSDS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 14:00:13', '2024-06-20 15:30:16', 1, 1);
INSERT INTO `p_article` VALUES (22, '侧耳啊实打实', '写点什么?额额为', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"a67bfa3603b720aa41f08b68f35073b51\" class=\"cherry-highlight-line\">写点什么?额额为</p></div>', 'markdown', 'article', '写点什么?额额为', '', '', '', 'CEASDS', 1, 0, 0, 0, 0, 1, '', NULL, '2024-06-20 15:30:47', '2024-06-21 10:30:13', 1, 1);
INSERT INTO `p_article` VALUES (23, '测试文章', '在写PerfreeBlog时,因为源码在gitee和github都放有一份,所以提交代码需要两边同时提交,在这里记录下操作方法~\n首先将github代码克隆至本地,然后进行以下操作:\n```\ngit remote rename origin github\n```\n之后添加gitee代码地址\n```\ngit remote add gitee https://gitee.com/perfree/PerfreeBlog.git\n```\n这样就可以啦,拉取代码可以使用以下命令分别拉取\n```\ngit pull github master\ngit pull gitee master\n```\n提交代码同理\n```\ngit push github master\ngit push gitee master\n```', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"2\" data-type=\"p\" data-sign=\"7bc62967c031c73e4f81199eebb63d992\" class=\"cherry-highlight-line\">在写PerfreeBlog时,因为源码在gitee和github都放有一份,所以提交代码需要两边同时提交,在这里记录下操作方法~\n首先将github代码克隆至本地,然后进行以下操作:</p><div data-sign=\"179afcf9f80e90358cac843f3d7a432d\" data-type=\"codeBlock\" data-lines=\"3\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"\">\n      <pre class=\"language-javascript\"><code class=\"language-javascript wrap\"><span class=\"code-line\">git remote rename origin github</span></code></pre>\n    </div><p data-lines=\"1\" data-type=\"p\" data-sign=\"0966ef04911505ac13110a88bd8d88661\">之后添加gitee代码地址</p><div data-sign=\"492b5c9075933147ba51ed3a330b6103\" data-type=\"codeBlock\" data-lines=\"3\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"\">\n      <pre class=\"language-javascript\"><code class=\"language-javascript wrap\"><span class=\"code-line\">git remote add gitee https<span class=\"token operator\">:</span><span class=\"token operator\">/</span><span class=\"token operator\">/</span>gitee<span class=\"token punctuation\">.</span>com<span class=\"token operator\">/</span>perfree<span class=\"token operator\">/</span>PerfreeBlog<span class=\"token punctuation\">.</span>git</span></code></pre>\n    </div><p data-lines=\"1\" data-type=\"p\" data-sign=\"c13e148dd5fc3f4b966d66846091bb6a1\">这样就可以啦,拉取代码可以使用以下命令分别拉取</p><div data-sign=\"e4fd418b74081837864ecc8af2da2b70\" data-type=\"codeBlock\" data-lines=\"4\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"\">\n      <pre class=\"language-javascript\"><code class=\"language-javascript wrap\"><span class=\"code-line\">git pull github master</span>\n<span class=\"code-line\">git pull gitee master</span></code></pre>\n    </div><p data-lines=\"1\" data-type=\"p\" data-sign=\"6b69d46414ddc24e6f4dab5f4dadbcd71\">提交代码同理</p><div data-sign=\"1d9d9802e45c93e98bd72e6f7d29a4ba\" data-type=\"codeBlock\" data-lines=\"4\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"\">\n      <pre class=\"language-javascript\"><code class=\"language-javascript wrap\"><span class=\"code-line\">git push github master</span>\n<span class=\"code-line\">git push gitee master</span></code></pre>\n    </div></div>', 'markdown', 'article', '在写PerfreeBlog时,因为源码在gitee和github都放有一份,所以提交代码需要两边同时提交,在这里记录下操作方法~\n首先将github代码克隆至本地,然后进行以下操作:\n      git remote rename origin github\n    之后添加gitee代码地址\n      git remote add gitee https://gitee.com/perfree', '', '', '', 'CSWZ', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-24 17:53:11', NULL, 1, NULL);
INSERT INTO `p_article` VALUES (24, '测试是是是', 'thymeleaf 跟 JSP 一样，就是运行之后，就得到纯 HTML了。 区别在与，不运行之前， Thymeleaf 也是 纯 html ...\n所以 Thymeleaf 不需要 服务端的支持，就能够被以 html 的方式打开，这样就方便前端人员独立设计与调试, jsp 就不行了， 不启动服务器 jsp 都没法运行出结果来。\n接下来将Thymeleaf和SpringBoot进行整合：\n## 新建项目\n本实例Github地址[03-Thymeleaf](https://github.com/perfree/SpringBoot-learning-Perfree/tree/master/03-thymeleaf \"03-Thymeleaf\")\n![](https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzDj2AHyEkAACW9NLuXHE944.jpg)\n\n勾选web\n![](https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzDmiAZH7zAADK-Y75wxA494.jpg)\n\n勾选Thymeleaf\n![](https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzDqOARqaSAACvx29sclo937.jpg)\n下一步，完成\n先来看下pom文件\n```xml\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n    <modelVersion>4.0.0</modelVersion>\n\n    <groupId>com.example</groupId>\n    <artifactId>demo</artifactId>\n    <version>0.0.1-SNAPSHOT</version>\n    <packaging>jar</packaging>\n\n    <name>demo</name>\n    <description>Demo project for Spring Boot</description>\n\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>2.0.5.RELEASE</version>\n        <relativePath/> <!-- lookup parent from repository -->\n    </parent>\n\n    <properties>\n        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>\n        <java.version>1.8</java.version>\n    </properties>\n\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-thymeleaf</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-test</artifactId>\n            <scope>test</scope>\n        </dependency>\n    </dependencies>\n\n    <build>\n        <plugins>\n            <plugin>\n                <groupId>org.springframework.boot</groupId>\n                <artifactId>spring-boot-maven-plugin</artifactId>\n            </plugin>\n        </plugins>\n    </build>\n\n\n</project>\n```\n其中Thymeleaf的依赖为：\n```xml\n<dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-thymeleaf</artifactId>\n        </dependency>\n```\n## 前端控制器Controller\n![](https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzEiGALYIvAADMDASxd-4807.jpg)\n## 页面\n创建hello.html\n![](https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzFDiANwxXAACw8RC5QdI048.jpg)\n其中<html xmlns:th=\"http://www.thymeleaf.org\">声明当前文件是 thymeleaf, 里面可以用th开头的属性\n<p th:text=\"${name}\" >name</p>把 name 的值显示在当前 p里，用的是th开头的属性: th:text, 而取值用的是 \"${name}\" 这种写法叫做 ognl，额。。。什么意思呢。。。就是跟EL表达式一样吧。 这样取出来放进p 里，从而替换到 原来p 标签里的 4个字符 \"name\" .\n\n用这种方式，就可以把服务端的数据，显示在当前html里了。 重要的是： 这种写法是完全合法的 html 语法，所以可以直接通过浏览器打开 hello.html,也是可以看到效果的， 只不过看到的是 \"name\", 而不是 服务端传过来的值 \"thymeleaf\"。\n## application.properties\n```bash\n#thymeleaf 配置\nspring.thymeleaf.mode=HTML5\nspring.thymeleaf.encoding=UTF-8\nspring.thymeleaf.servlet.content-type=text/html\n#缓存设置为false, 这样修改之后马上生效，便于调试\nspring.thymeleaf.cache=false\n```\n## 运行\n![](https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzFZuARgLPAABKBUOdyZI542.jpg)', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"3\" data-type=\"p\" data-sign=\"9de83603aaf4f70240a036d92f53bd873\" class=\"cherry-highlight-line\">thymeleaf 跟 JSP 一样，就是运行之后，就得到纯 HTML了。 区别在与，不运行之前， Thymeleaf 也是 纯 html ...\n所以 Thymeleaf 不需要 服务端的支持，就能够被以 html 的方式打开，这样就方便前端人员独立设计与调试, jsp 就不行了， 不启动服务器 jsp 都没法运行出结果来。\n接下来将Thymeleaf和SpringBoot进行整合：</p><h2 data-lines=\"1\" data-sign=\"a1ed0b6d9a8423f00a325f44f49845bd\" id=\"%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE\"><a href=\"#%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE\" class=\"anchor\"></a>新建项目</h2><p data-lines=\"2\" data-type=\"p\" data-sign=\"96c1402122aaa657fa29db0ac57ba53a2\">本实例Github地址<a title=\"03-Thymeleaf\" href=\"https://github.com/perfree/SpringBoot-learning-Perfree/tree/master/03-thymeleaf\">03-Thymeleaf</a>\n<img alt=\"\" src=\"https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzDj2AHyEkAACW9NLuXHE944.jpg\"></p><p data-lines=\"3\" data-type=\"p\" data-sign=\"7f179e82156086d2334f5861064f1efd3\">勾选web\n<img alt=\"\" src=\"https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzDmiAZH7zAADK-Y75wxA494.jpg\"></p><p data-lines=\"5\" data-type=\"p\" data-sign=\"7c233a474d1c219d9cf39d04a2a4b9055\">勾选Thymeleaf\n<img alt=\"\" src=\"https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzDqOARqaSAACvx29sclo937.jpg\">\n下一步，完成\n先来看下pom文件</p><div data-sign=\"a90fe471d8bc81ceb69acf0dbb4c7fce\" data-type=\"codeBlock\" data-lines=\"56\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"xml\">\n      <pre class=\"language-xml\"><code class=\"language-xml wrap\"><span class=\"code-line\"><span class=\"token prolog\">&lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt;</span></span>\n<span class=\"code-line\"><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>project</span> <span class=\"token attr-name\">xmlns</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>http://maven.apache.org/POM/4.0.0<span class=\"token punctuation\">\"</span></span> <span class=\"token attr-name\"><span class=\"token namespace\">xmlns:</span>xsi</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>http://www.w3.org/2001/XMLSchema-instance<span class=\"token punctuation\">\"</span></span></span></span>\n<span class=\"code-line\"><span class=\"token tag\">         <span class=\"token attr-name\"><span class=\"token namespace\">xsi:</span>schemaLocation</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>modelVersion</span><span class=\"token punctuation\">&gt;</span></span>4.0.0<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>modelVersion</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>com.example<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>demo<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>version</span><span class=\"token punctuation\">&gt;</span></span>0.0.1-SNAPSHOT<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>version</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>packaging</span><span class=\"token punctuation\">&gt;</span></span>jar<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>packaging</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>name</span><span class=\"token punctuation\">&gt;</span></span>demo<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>name</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>description</span><span class=\"token punctuation\">&gt;</span></span>Demo project for Spring Boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>description</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>parent</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>org.springframework.boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>spring-boot-starter-parent<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>version</span><span class=\"token punctuation\">&gt;</span></span>2.0.5.RELEASE<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>version</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>relativePath</span><span class=\"token punctuation\">/&gt;</span></span> <span class=\"token comment\">&lt;!-- lookup parent from repository --&gt;</span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>parent</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>properties</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>project.build.sourceEncoding</span><span class=\"token punctuation\">&gt;</span></span>UTF-8<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>project.build.sourceEncoding</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>project.reporting.outputEncoding</span><span class=\"token punctuation\">&gt;</span></span>UTF-8<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>project.reporting.outputEncoding</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>java.version</span><span class=\"token punctuation\">&gt;</span></span>1.8<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>java.version</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>properties</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>dependencies</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>org.springframework.boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>spring-boot-starter-thymeleaf<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>org.springframework.boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>spring-boot-starter-web<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>org.springframework.boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>spring-boot-starter-test<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>scope</span><span class=\"token punctuation\">&gt;</span></span>test<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>scope</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>dependencies</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>build</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>plugins</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>plugin</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">                <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>org.springframework.boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">                <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>spring-boot-maven-plugin<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>plugin</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>plugins</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>build</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\"></span>\n<span class=\"code-line\"><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>project</span><span class=\"token punctuation\">&gt;</span></span></span></code></pre>\n    </div><p data-lines=\"1\" data-type=\"p\" data-sign=\"8ec20e2d95e1f995d718bed163a397e01\">其中Thymeleaf的依赖为：</p><div data-sign=\"f9af5cc6e17a3d692e2e9f1bf14155cb\" data-type=\"codeBlock\" data-lines=\"6\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"xml\">\n      <pre class=\"language-xml\"><code class=\"language-xml wrap\"><span class=\"code-line\"><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>groupId</span><span class=\"token punctuation\">&gt;</span></span>org.springframework.boot<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>groupId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">            <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span>spring-boot-starter-thymeleaf<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>artifactId</span><span class=\"token punctuation\">&gt;</span></span></span>\n<span class=\"code-line\">        <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>dependency</span><span class=\"token punctuation\">&gt;</span></span></span></code></pre>\n    </div><h2 data-lines=\"1\" data-sign=\"504126590939fec69390cab91a90afc5\" id=\"%E5%89%8D%E7%AB%AF%E6%8E%A7%E5%88%B6%E5%99%A8controller\"><a href=\"#%E5%89%8D%E7%AB%AF%E6%8E%A7%E5%88%B6%E5%99%A8controller\" class=\"anchor\"></a>前端控制器Controller</h2><p data-lines=\"1\" data-type=\"p\" data-sign=\"447e1b716a236483eef5df6c18733f6d1\"><img alt=\"\" src=\"https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzEiGALYIvAADMDASxd-4807.jpg\"></p><h2 data-lines=\"1\" data-sign=\"b3d9ec5184c0a3edc7dd313a5ec557da\" id=\"%E9%A1%B5%E9%9D%A2\"><a href=\"#%E9%A1%B5%E9%9D%A2\" class=\"anchor\"></a>页面</h2><p data-lines=\"4\" data-type=\"p\" data-sign=\"1ded7ddea354358df82e802d89d2ceb54\">创建hello.html\n<img alt=\"\" src=\"https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzFDiANwxXAACw8RC5QdI048.jpg\">\n其中&lt;html xmlns:th=\"<a title=\"http://www.thymeleaf.org\" href=\"http://www.thymeleaf.org\">http://www.thymeleaf.org</a>\"&gt;声明当前文件是 thymeleaf, 里面可以用th开头的属性\n&lt;p th:text=\"<span class=\"Cherry-InlineMath\" data-type=\"mathBlock\" data-lines=\"2\">${name}\" &gt;name&lt;/p&gt;把 name 的值显示在当前 p里，用的是th开头的属性: th:text, 而取值用的是 \"$</span>{name}\" 这种写法叫做 ognl，额。。。什么意思呢。。。就是跟EL表达式一样吧。 这样取出来放进p 里，从而替换到 原来p 标签里的 4个字符 \"name\" .</p><p data-lines=\"2\" data-type=\"p\" data-sign=\"e2431088d6a0923dcdb62660becb84c12\">用这种方式，就可以把服务端的数据，显示在当前html里了。 重要的是： 这种写法是完全合法的 html 语法，所以可以直接通过浏览器打开 hello.html,也是可以看到效果的， 只不过看到的是 \"name\", 而不是 服务端传过来的值 \"thymeleaf\"。</p><h2 data-lines=\"1\" data-sign=\"a98de57f3cabb3d20e647052c14fb7c0\" id=\"applicationproperties\"><a href=\"#applicationproperties\" class=\"anchor\"></a>application.properties</h2><div data-sign=\"d0171d9edbe865080fbe5a8f55f83dd4\" data-type=\"codeBlock\" data-lines=\"8\" data-edit-code=\"true\" data-copy-code=\"true\" data-change-lang=\"true\" data-lang=\"bash\">\n      <pre class=\"language-bash\"><code class=\"language-bash wrap\"><span class=\"code-line\"><span class=\"token comment\">#thymeleaf 配置</span></span>\n<span class=\"code-line\">spring.thymeleaf.mode<span class=\"token operator\">=</span>HTML5</span>\n<span class=\"code-line\">spring.thymeleaf.encoding<span class=\"token operator\">=</span>UTF-8</span>\n<span class=\"code-line\">spring.thymeleaf.servlet.content-type<span class=\"token operator\">=</span>text/html</span>\n<span class=\"code-line\"><span class=\"token comment\">#缓存设置为false, 这样修改之后马上生效，便于调试</span></span>\n<span class=\"code-line\">spring.thymeleaf.cache<span class=\"token operator\">=</span>false</span></code></pre>\n    </div><h2 data-lines=\"1\" data-sign=\"8f6036bd196300d1d31a8e9b3bdbe316\" id=\"%E8%BF%90%E8%A1%8C\"><a href=\"#%E8%BF%90%E8%A1%8C\" class=\"anchor\"></a>运行</h2><p data-lines=\"1\" data-type=\"p\" data-sign=\"e03623fd35cdb3390a455beec768f86b1\"><img alt=\"\" src=\"https://www.img.yinpengfei.com/group1/M00/00/00/rB802luzFZuARgLPAABKBUOdyZI542.jpg\" ></p></div>', 'markdown', 'article', 'thymeleaf 跟 JSP 一样，就是运行之后，就得到纯 HTML了。 区别在与，不运行之前， Thymeleaf 也是 纯 html ...\n所以 Thymeleaf 不需要 服务端的支持，就能够被以 html 的方式打开，这样就方便前端人员独立设计与调试, jsp 就不行了， 不启动服务器 jsp 都没法运行出结果来。\n接下来将Thymeleaf和SpringBoot进行整合：新建项目本实', '', '', '', 'CSSSS', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-24 17:53:59', NULL, 1, NULL);
INSERT INTO `p_article` VALUES (25, '12321321321', 'PerfreeBlog是一款基于java开发的博客建站平台,后端采用[SpringBoot](https://spring.io/projects/spring-boot)、[Shiro](https://shiro.apache.org)、[Mybatis](https://mybatis.org/)、[Enjoy](https://jfinal.com/doc/6-1)模板引擎等技术进行开发,给您带来全新的创作体验💖\n> 目前PerfreeBlog的所有功能均为个人开发,因能力有限,其中很多技术都是边学习边使用的,所以有些地方可能有不足之处,欢迎各位共同交流,同时如若本项目对您有所帮助,请为它[点赞](https://github.com/perfree/PerfreeBlog)支持 \n\n> 🌍PerfreeBlog交流QQ群: 938402724\n## 站点\n📖文档: [http://perfree.org.cn/](http://perfree.org.cn/)<br>\n📖github: [https://github.com/perfree/PerfreeBlog](https://github.com/perfree/PerfreeBlog)<br>\n📖演示站点: [https://www.yinpengfei.com/](https://www.yinpengfei.com/)<br>\n## 特性\n* 设计简洁，界面美观\n* 采用[Markdown](https://www.markdownguide.org/)编辑器,支持一键插入视频、图片\n* 支持多主题自由切换\n* 主题在线编辑\n* 支持扩展插件\n* 友情链接管理\n* 支持附件管理\n* 主题开发简单快速\n* 安装部署简单\n* 支持[mysql](https://www.mysql.com)/[sqlite](https://www.sqlite.org)数据库\n## 截图\n写文章\n![](/static/attach/20210901/c0becc75efae4e2fa59ff53588ba828f.jpg)\n文章列表\n![](/static/attach/20210901/bf2c8cdb8d5d4100be12c2a98331be06.jpg)\n主题\n![](/static/attach/20210901/d07f5f9b068b4b59b93b8fc71b71a244.jpg)', '<div data-inline-code-theme=\"red\" data-code-block-theme=\"tomorrow-night\"><p data-lines=\"1\" data-type=\"p\" data-sign=\"c70cb959157dd65afa3c9a4a86b115061\" class=\"cherry-highlight-line\">PerfreeBlog是一款基于java开发的博客建站平台,后端采用<a href=\"https://spring.io/projects/spring-boot\">SpringBoot</a>、<a href=\"https://shiro.apache.org\">Shiro</a>、<a href=\"https://mybatis.org/\">Mybatis</a>、<a href=\"https://jfinal.com/doc/6-1\">Enjoy</a>模板引擎等技术进行开发,给您带来全新的创作体验💖</p><blockquote data-lines=\"1\" data-sign=\"68ab2ad041cd785fd18f604d4526300e_1\">目前PerfreeBlog的所有功能均为个人开发,因能力有限,其中很多技术都是边学习边使用的,所以有些地方可能有不足之处,欢迎各位共同交流,同时如若本项目对您有所帮助,请为它<a href=\"https://github.com/perfree/PerfreeBlog\">点赞</a>支持 </blockquote><blockquote data-lines=\"2\" data-sign=\"1805fa34c5f8145f64ec0c4515329188_2\">🌍PerfreeBlog交流QQ群: 938402724</blockquote><h2 data-lines=\"1\" data-sign=\"1ac4eba3cbdb3fb40788fe5eed5613ee\" id=\"%E7%AB%99%E7%82%B9\"><a href=\"#%E7%AB%99%E7%82%B9\" class=\"anchor\"></a>站点</h2><p data-lines=\"3\" data-type=\"p\" data-sign=\"665b4b1907d5fca2d2d7ada3740d44ec3\">📖文档: <a href=\"http://perfree.org.cn/\">http://perfree.org.cn/</a><br>\n📖github: <a href=\"https://github.com/perfree/PerfreeBlog\">https://github.com/perfree/PerfreeBlog</a><br>\n📖演示站点: <a href=\"https://www.yinpengfei.com/\">https://www.yinpengfei.com/</a><br></p><h2 data-lines=\"1\" data-sign=\"fc5c009e58d4ea242e4c48fa71938a2f\" id=\"%E7%89%B9%E6%80%A7\"><a href=\"#%E7%89%B9%E6%80%A7\" class=\"anchor\"></a>特性</h2><ul class=\"cherry-list__square\" data-sign=\"8ccce24c5b6da7f70a4b1c6e29edd6f2\" data-lines=\"10\"><li class=\"cherry-list-item\"><p>设计简洁，界面美观</p></li><li class=\"cherry-list-item\"><p>采用<a href=\"https://www.markdownguide.org/\">Markdown</a>编辑器,支持一键插入视频、图片</p></li><li class=\"cherry-list-item\"><p>支持多主题自由切换</p></li><li class=\"cherry-list-item\"><p>主题在线编辑</p></li><li class=\"cherry-list-item\"><p>支持扩展插件</p></li><li class=\"cherry-list-item\"><p>友情链接管理</p></li><li class=\"cherry-list-item\"><p>支持附件管理</p></li><li class=\"cherry-list-item\"><p>主题开发简单快速</p></li><li class=\"cherry-list-item\"><p>安装部署简单</p></li><li class=\"cherry-list-item\"><p>支持<a href=\"https://www.mysql.com\">mysql</a>/<a href=\"https://www.sqlite.org\">sqlite</a>数据库</p></li></ul><h2 data-lines=\"1\" data-sign=\"e0aba1273258165a0516f1b11015156a\" id=\"%E6%88%AA%E5%9B%BE\"><a href=\"#%E6%88%AA%E5%9B%BE\" class=\"anchor\"></a>截图</h2><p data-lines=\"6\" data-type=\"p\" data-sign=\"c3de1338257b4e5f7fcb756fa0fe327f6\">写文章\n<img alt=\"\" src=\"/static/attach/20210901/c0becc75efae4e2fa59ff53588ba828f.jpg\">\n文章列表\n<img alt=\"\" src=\"/static/attach/20210901/bf2c8cdb8d5d4100be12c2a98331be06.jpg\">\n主题\n<img alt=\"\" src=\"/static/attach/20210901/d07f5f9b068b4b59b93b8fc71b71a244.jpg\"></p></div>', 'markdown', 'article', 'PerfreeBlog是一款基于java开发的博客建站平台,后端采用SpringBoot、Shiro、Mybatis、Enjoy模板引擎等技术进行开发,给您带来全新的创作体验💖目前PerfreeBlog的所有功能均为个人开发,因能力有限,其中很多技术都是边学习边使用的,所以有些地方可能有不足之处,欢迎各位共同交流,同时如若本项目对您有所帮助,请为它点赞支持 🌍PerfreeBlog交流QQ群:', '', '', '', '12321321321', 0, 0, 0, 0, 0, 1, '', NULL, '2024-06-24 17:57:14', NULL, 1, NULL);

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
  `pluginId` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '插件id',
  `flag` int NULL DEFAULT NULL COMMENT '菜单标识:0:系统自带,1:用户创建,2:插件',
  `component` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件路径',
  `componentName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件名称',
  `moduleName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模块名称',
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
INSERT INTO `p_menu` VALUES ('0266af7c88624be3bfddc6cdfe3cf010', '-1', '动态', '/journal', 'fa-solid fa-grin-stars', 2, 0, 0, 0, '2024-03-19 11:39:26', '2024-05-27 11:14:05', 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('1db423ede3e24ca78829d339e26bf49d', '-1', '系统工具', '', 'fa-solid fa-tools', 3, 1, 0, 0, '2024-07-19 08:19:30', NULL, 0, NULL, NULL, '', '', '', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('4f934ea37a214b36a7b5f6c67ce16e92', '1db423ede3e24ca78829d339e26bf49d', '动态表单', '/admin/genSetting', 'fa-solid fa-cash-register', 0, 1, 0, 0, '2024-07-19 08:20:31', NULL, 1, NULL, NULL, '/view/GenSettingView', 'genSetting', 'tools', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('4fc79e77c46a4f2f91e7958f7bc1b4a4', '-1', '主题管理', '', 'fa-solid fa-tachometer-alt-average', 2, 1, 0, 0, '2024-07-19 08:05:31', NULL, 0, NULL, NULL, '', '', '', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('50508321af38403e833f6e4fef896c0e', '-1', '归档', '/archive', 'fa-calendar', 1, 0, 0, 0, '2024-03-19 11:39:26', '2024-05-27 11:13:05', 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('61a5edcf0ee04e7e96f0e0331526bd13', '761690b8556346c5a12878adb64a0aa6', '插件管理', '/admin/plugin', 'fa-solid fa-swatchbook', 0, 1, 0, 0, '2024-07-19 08:02:56', NULL, 1, NULL, NULL, '/view/PluginView', 'plugin', 'plugin', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('63b7b5c9448c46849006d9a70db7bf44', '761690b8556346c5a12878adb64a0aa6', '用户管理', '/admin/user', 'fa-solid fa-user', 0, 1, 0, 0, '2024-07-18 18:10:32', NULL, 1, NULL, NULL, '/view/UserView', 'user', 'user', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('761690b8556346c5a12878adb64a0aa6', '-1', '系统管理', '', 'fa-solid fa-shield-alt', 0, 1, 0, 0, '2024-07-18 18:03:41', NULL, 0, NULL, NULL, '', '', '', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('8523081cf49d4147bc7915c4a1dcc779', '761690b8556346c5a12878adb64a0aa6', '菜单管理', '/admin/menu', 'fa-solid fa-list-numeric', 0, 1, 0, 0, '2024-07-18 18:04:47', NULL, 1, NULL, NULL, '/view/MenuView', 'menu', 'menu', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('a87829de52a64edd8636b600f2600723', '4fc79e77c46a4f2f91e7958f7bc1b4a4', '主题设置', '/admin/themeSetting', 'fa-solid fa-cog', 0, 1, 0, 0, '2024-07-19 08:15:34', NULL, 1, NULL, NULL, '/view/ThemeSettingView', 'themeSetting', 'theme', '', 1, 1, NULL);
INSERT INTO `p_menu` VALUES ('ae3ed3795bdf4e32bafa9cf3bbc2ac2c', 'ef799ebb5f48425a9293327951c60f44', '测试菜单', '/admin/plugin/perfree-demo/demo', 'fa-solid fa-feather', 0, 1, 0, 0, '2024-07-19 11:46:36', NULL, 1, 'perfree-demo', NULL, '/view/DemoView', 'perfree-demo-demo', 'demo', NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('c8001d41c5264bf485e40b4dd6a55d33', '-1', '友链', '/page/link', 'fa-solid fa-person-cane', 3, 0, 0, 0, '2024-03-19 11:39:26', '2024-05-27 11:14:36', 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('ef799ebb5f48425a9293327951c60f44', '-1', '演示插件', NULL, 'fa-solid fa-feather', 99, 1, 0, 0, '2024-07-19 11:46:36', NULL, 0, 'perfree-demo', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `p_menu` VALUES ('fb719e11f2994a498e4db27ae31f32a7', '4fc79e77c46a4f2f91e7958f7bc1b4a4', '主题管理', '/admin/theme', 'fa-solid fa-hat-wizard', 0, 1, 0, 0, '2024-07-19 08:14:36', NULL, 1, NULL, NULL, '/view/ThemeView', 'theme', 'theme', '', 1, 1, NULL);

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
  `theme` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所属主题',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_option
-- ----------------------------
INSERT INTO `p_option` VALUES (1, 'WEB_THEME', 'Default', NULL, '2024-06-25 11:07:50', NULL, 1, NULL);
INSERT INTO `p_option` VALUES (2, 'WEB_IS_REGISTER', '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (3, 'WEB_COMMENT_IS_REVIEW', '0', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (4, 'LOGIN_CAPTCHA_ENABLE', '1', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (5, 'WEB_TITLE', '测试', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `p_option` VALUES (36, 'Ff0jly5mxxftbjc', '321312333', '2024-07-19 08:15:50', NULL, 1, NULL, 'Default');
INSERT INTO `p_option` VALUES (37, 'Fuhjly5mxy9dbmc', '123123', '2024-07-19 08:15:50', NULL, 1, NULL, 'Default');
INSERT INTO `p_option` VALUES (38, 'Fsywly5mxz7sbpc', '321312', '2024-07-19 08:15:50', NULL, 1, NULL, 'Default');
INSERT INTO `p_option` VALUES (39, 'F1kuly5my3yebsc', NULL, '2024-07-19 08:15:50', NULL, 1, NULL, 'Default');
INSERT INTO `p_option` VALUES (40, 'Fuyyly5my8gmbvc', NULL, '2024-07-19 08:15:50', NULL, 1, NULL, 'Default');

-- ----------------------------
-- Table structure for p_plugin
-- ----------------------------
DROP TABLE IF EXISTS `p_plugin`;
CREATE TABLE `p_plugin`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件名',
  `pluginId` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '插件id',
  `desc` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '插件描述',
  `version` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '版本',
  `author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作者',
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网址',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `isDev` bit(1) NULL DEFAULT NULL COMMENT '是否为开发环境',
  `frontDevAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '开发环境前端地址',
  `status` int NOT NULL DEFAULT 0 COMMENT '插件状态:0禁用,1启用',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 325 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_plugin
-- ----------------------------
INSERT INTO `p_plugin` VALUES (741, '示例插件', 'perfree-demo', '描述信息', '1.0.2', 'Perfree', 'http://111111', 'perfree@126.com', NULL, NULL, 1, '2024-07-19 14:44:40', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for p_plugin_demo
-- ----------------------------
DROP TABLE IF EXISTS `p_plugin_demo`;
CREATE TABLE `p_plugin_demo`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '信息',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `createUserId` int NULL DEFAULT NULL COMMENT '添加人',
  `updateUserId` int NULL DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of p_plugin_demo
-- ----------------------------
INSERT INTO `p_plugin_demo` VALUES (1, '测试数据1', '测试数据1', '2024-07-19 11:40:24', NULL, NULL, NULL);

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
INSERT INTO `p_role_menu` VALUES (19, 2, 'a98d36d52c174124a5fdf1884e572a0f', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (20, 2, '38a64c087da742719c8543b554586529', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (21, 2, 'c1b3c57e13974ff7928f86ca1e58fa57', '2024-06-17 10:46:30', NULL, 1, NULL);
INSERT INTO `p_role_menu` VALUES (22, 2, 'c70427da2c934d7d9ae876360538ee63', '2024-06-17 10:46:30', NULL, 1, NULL);

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

SET FOREIGN_KEY_CHECKS = 1;

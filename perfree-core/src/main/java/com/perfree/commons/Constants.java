package com.perfree.commons;

/**
 * 定义常量
 * @author Perfree
 */
public class Constants {

    /** option key - WEB_THEME(网站主题) */
    public static final String OPTION_WEB_THEME = "WEB_THEME";
    /** option key - OPTION_WEB_THEME_TYPE(网站主题类型) */
    public static final String OPTION_WEB_THEME_TYPE = "WEB_THEME_TYPE";

    /** option key - WEB_COMMENT_IS_REVIEW(评论是否审核) */
    public static final String OPTION_WEB_COMMENT_IS_REVIEW = "WEB_COMMENT_IS_REVIEW";

    /** option key - WEB_TITLE(网站标题) */
    public static final String OPTION_WEB_TITLE = "WEB_TITLE";

    /** option key- WEB_META_KEYWORD(网站关键字) */
    public static final String OPTION_WEB_META_KEYWORD = "WEB_META_KEYWORD";

    /** option key - WEB_META_DESC(网站描述) */
    public static final String OPTION_WEB_META_DESC = "WEB_META_DESC";

    /** option key - WEB_IS_REGISTER(是否允许注册新用户) */
    public static final String OPTION_WEB_IS_REGISTER = "WEB_IS_REGISTER";

    /** option key - SEO_TITLE(网站SEO标题) */
    public static final String SEO_TITLE = "SEO_TITLE";

    /** option key - SEO_KEYWORD(网站SEO关键字) */
    public static final String SEO_KEYWORD = "SEO_KEYWORD";

    /** option key - SEO_DESC(网站SEO描述) */
    public static final String SEO_DESC = "SEO_DESC";

    /** url - articleList(文章列表) */
    public static final String URL_ARTICLE_LIST = "/articleList/";

    /** url - journalList(动态列表) */
    public static final String URL_JOURNAL_LIST = "/journalList/";

    /** url - archive(文章归档) */
    public static final String URL_ARCHIVE = "/archive/";
    /** url - archive(分类) */
    public static final String URL_CATEGORIES = "/categories/";
    /** url - archive(标签) */
    public static final String URL_TAGS = "/tags/";

    /** url - link(友链) */
    public static final String URL_LINK = "/link/";

    /** url - tag(标签) */
    public static final String URL_ARTICLE_TAG = "/tag/";

    /** url - category(分类) */
    public static final String URL_ARTICLE_CATEGORY = "/category/";

    /** url - article(文章) */
    public static final String URL_ARTICLE = "/article/";
    /** url - journal(动态) */
    public static final String URL_JOURNAL = "/journal/";

    /** url - article/search(搜索) */
    public static final String URL_ARTICLE_SEARCH = "/article/search/";

    /** 评论不需要审核 */
    public static final int COMMENT_STATUS_NORMAL = 0;

    /** 评论需审核 */
    public static final int COMMENT_STATUS_REVIEW = 1;

    /** 允许注册新用户 */
    public static final int REGISTER_YES = 1;

    /** 不允许注册新用户 */
    public static final int REGISTER_NO = 0;

    /** 生产资源路径 */
    public static final String PROD_RESOURCES_PATH = "resources";

    /** 开发资源路径 */
    public static final String DEV_RESOURCES_PATH = "classpath:";

    /** 生产主题路径 */
    public static final String PROD_THEMES_PATH = "resources/static/themes";

    /** 主题资源路径 */
    public static final String PROD_THEMES_RESOURCES_PATH = "resources/static/themeResources";

    /** 开发主题路径 */
    public static final String DEV_THEMES_PATH = "classpath:static/themes";

    /** 插件目录 */
    public static final String PLUGIN_PATH = "resources/plugins";

    /** 临时目录 */
    public static final String UPLOAD_TEMP_PATH = "resources/temp";

    /** 路径 */
    public static final String SEPARATOR = "/";

    /** resources路径 */
    public static final String RESOURCES_DIR = "resources";

    /** 插件路径 */
    public static final String PLUGINS_DIR = "resources/plugins";

    /** 插件静态资源目录 */
    public static final String PLUGINS_RESOURCES_DIR = "resources/pluginResources";

    /** 数据库配置文件地址 */
    public static final String DB_PROPERTIES_PATH = "resources/db.properties";

    /** 文章类型:文章 */
    public static final String ARTICLE_TYPE_ARTICLE = "article";
    /** 文章类型:动态 */
    public static final String ARTICLE_TYPE_JOURNAL = "journal";

    /** 文章类型:页面 */
    public static final String ARTICLE_TYPE_PAGE = "page";

    /** 当前登陆用户key */
    public  static final String LOGIN_USER = "loginUser";

    public  static final int ARTICLE_STATUS_AUDIT = 2;

    public  static final int MENU_TARGET_BLANK = 1;

    public  static final int MENU_TARGET_SELF = 0;

    /** 角色：管理员 */
    public  static final String ROLE_ADMIN = "admin";

    /** 角色：用户 */
    public  static final String ROLE_USER = "user";

    /** 角色：编辑 */
    public  static final String ROLE_EDITOR = "editor";

    /** 角色：贡献者 */
    public  static final String ROLE_CONTRIBUTE = "contribute";

    public static final String ADMIN_MENU_GROUP_HOME = "home";
    public static final String ADMIN_MENU_GROUP_WRITE_ARTICLE = "writeArticle";
    public static final String ADMIN_MENU_GROUP_CONTENT = "content";
    public static final String ADMIN_MENU_GROUP_THEME = "theme";
    public static final String ADMIN_MENU_GROUP_SETTING = "setting";
    public static final String ADMIN_MENU_GROUP_PLUGIN = "plugin";

    /** 缓存：数据字典配置 */
    public static final String EHCACHE_KEY_OPTION_DATA = "optionData";

    /** 新用户默认角色 */
    public static final String EHCACHE_KEY_WEB_REGISTER_DEFAULT_ROLE = "WEB_REGISTER_DEFAULT_ROLE";

    /** 用户默认状态 */
    public static final int USER_STATUS_DEFAULT = 0;

    /** 父级菜单默认pid */
    public static final String MENU_PARENT_DEFAULT_PID = "-1";

    public static final String IS_DOCKER = "isDocker";

    /** option key - GRAVATAR_SOURCE(镜像源) */
    public static final String OPTION_GRAVATAR_SOURCE = "GRAVATAR_SOURCE";
    //WEB_SITE
    public static final String OPTION_WEB_SITE = "WEB_SITE";

    //WEB_RSS_GEN_MODE
    public static final String OPTION_WEB_RSS_GEN_MODE = "WEB_RSS_GEN_MODE";

    //WEB_RSS_GEN_NUM
    public static final String OPTION_WEB_RSS_GEN_NUM = "WEB_RSS_GEN_NUM";
    //WEB_AUTO_GEN_SUMMARY
    public static final String OPTION_WEB_AUTO_GEN_SUMMARY = "WEB_AUTO_GEN_SUMMARY";

    public static final String WEB_AUTO_GEN_SUMMARY_FALSE = "0";
    public static final String WEB_AUTO_GEN_SUMMARY_TRUE = "1";

    public static final String URL_PAGE = "/page/";

    public static final String WEB_SITE = "WEB_SITE";

    public static final String VERSION = "version";
    public static final String OPTION_WEB_CUSTOM_HEAD = "WEB_CUSTOM_HEAD";
    public static final String OPTION_WEB_IS_AUTO_PUSH_BAIDU = "WEB_IS_AUTO_PUSH_BAIDU";
    public static final String OPTION_WEB_OPEN_CAPTCHA = "WEB_OPEN_CAPTCHA";

    public static final String OPEN_CAPTCHA = "1";
    public static final String COMMENT_IS_STINT = "1";
    public static final String OPTION_WEB_COMMENT_IS_STINT = "WEB_COMMENT_IS_STINT";
    // 插件状态:禁用
    public static final int PLUGIN_STATUS_DISABLE = 0;
    // 插件状态:启用
    public static final int PLUGIN_STATUS_ENABLE = 1;

    // 插件事件类型: 安装
    public static final int PLUGIN_EVENT_INSTALL = 0;

    // 插件事件类型: 启动
    public static final int PLUGIN_EVENT_START = 1;

    // 插件事件类型: 停止
    public static final int PLUGIN_EVENT_STOP = 2;

    // 插件事件类型: 更新
    public static final int PLUGIN_EVENT_UPDATE = 3;

    // 插件事件类型: 卸载
    public static final int PLUGIN_EVENT_UNINSTALL = 4;

    // api 开放
    public static final String WEB_API_OPEN = "0";
    // api 关闭
    public static final String WEB_API_CLOSE = "1";

    // 文件存储方式
    public static final String WEB_FILE_SAVE_TYPE_ALI = "aliOss";
    public static final String WEB_FILE_SAVE_TYPE_TENCENT = "tencentCos";
    public static final String WEB_FILE_SAVE_TYPE_QINIU = "qiNiuOss";
    public static final String WEB_FILE_SAVE_TYPE_LOCAL = "local";

    // 文件存储方式
    public static final String WEB_FILE_SAVE_TYPE = "WEB_FILE_SAVE_TYPE";

    // oss相关
    public static final String WEB_OSS_ENDPOINT = "WEB_OSS_ENDPOINT";
    public static final String WEB_OSS_ACCESS_KEY = "WEB_OSS_ACCESS_KEY";
    public static final String WEB_OSS_SECRET = "WEB_OSS_SECRET";
    public static final String WEB_OSS_BUCKET_NAME = "WEB_OSS_BUCKET_NAME";
    public static final String WEB_OSS_DOMAIN = "WEB_OSS_DOMAIN";
    public static final String WEB_OSS_REGION = "WEB_OSS_REGION";
}

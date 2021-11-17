package com.perfree.commons;

/**
 * 定义常量
 * @author Perfrees
 */
public class Constants {

    /** option key - WEB_THEME(网站主题) */
    public static final String OPTION_WEB_THEME = "WEB_THEME";

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

    /** url - archive(文章归档) */
    public static final String URL_ARCHIVE = "/archive/";

    /** url - link(友链) */
    public static final String URL_LINK = "/link/";

    /** url - tag(标签) */
    public static final String URL_ARTICLE_TAG = "/tag/";

    /** url - category(分类) */
    public static final String URL_ARTICLE_CATEGORY = "/category/";

    /** url - article(文章) */
    public static final String URL_ARTICLE = "/article/";

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
    public static final String DEV_RESOURCES_PATH = "perfree-web/src/main/resources";

    /** 生产主题路径 */
    public static final String PROD_THEMES_PATH = "resources/static/themes";

    /** 开发主题路径 */
    public static final String DEV_THEMES_PATH = "perfree-web/src/main/resources/static/themes";

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

    /** 文章类型:页面 */
    public static final String ARTICLE_TYPE_PAGE = "page";

    /** 当前登陆用户key */
    public  static final String LOGIN_USER = "loginUser";

    public  static final int ARTICLE_STATUS_AUDIT = 2;

    public  static final int WEBSOCKET_TYPE_UPDATE = 1;

    public  static final int WEBSOCKET_UPDATE_TYPE_NORMAL = 1;

    public  static final int WEBSOCKET_UPDATE_TYPE_ERROR = 2;

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

}

package com.perfree.common;

public class Constants {
    // option
    public static final String OPTION_WEB_THEME = "WEB_THEME"; // 网站主题
    public static final String OPTION_WEB_COMMENT_IS_REVIEW = "WEB_COMMENT_IS_REVIEW"; // 评论审核
    public static final String OPTION_WEB_TITLE = "WEB_TITLE"; // 网站标题
    public static final String OPTION_WEB_META_KEYWORD = "WEB_META_KEYWORD";
    public static final String OPTION_WEB_META_DESC = "WEB_META_DESC";
    public static final String OPTION_WEB_IS_REGISTER = "WEB_IS_REGISTER";// 是否允许注册新用户


    public static final String SEO_TITLE = "SEO_TITLE"; // 网站标题
    public static final String SEO_KEYWORD = "SEO_KEYWORD"; // 网站关键字
    public static final String SEO_DESC = "SEO_DESC"; // 网站描述

    // url
    public static final String URL_ARTICLE_LIST = "/articleList/"; // 文章列表
    public static final String URL_ARTICLE_TAG = "/tag/"; // 标签
    public static final String URL_ARTICLE_CATEGORY = "/category/"; // 分类
    public static final String URL_ARTICLE = "/article/"; // 文章
    public static final String URL_ARTICLE_SEARCH = "/article/search/"; // 搜索

    public static final int COMMENT_STATUS_NORMAL = 0; // 评论不需要审核
    public static final int COMMENT_STATUS_REVIEW = 1; // 评论需审核

    public static final int REGISTER_YES = 1; // 允许注册新用户
    public static final int REGISTER_NO = 0; // 不允许注册新用户

    public static final String PROD_RESOURCES_PATH = "resources"; // 生产资源路径
    public static final String DEV_RESOURCES_PATH = "perfree-web/src/main/resources";// 开发资源路径
    public static final String PROD_THEMES_PATH = "resources/static/themes"; // 生产主题路径
    public static final String DEV_THEMES_PATH = "perfree-web/src/main/resources/static/themes";// 开发主题路径
    public static final String PLUGIN_PATH = "resources/plugins"; // 插件目录
    public static final String UPLOAD_TEMP_PATH = "resources/temp"; // 临时目录

    public static final String SEPARATOR = "/"; // 路径

    public static final String RESOURCES_DIR = "resources"; // resources路径
    public static final String PLUGINS_DIR = "resources/plugins"; // 插件

    public static final String DB_PROPERTIES_PATH = "resources/db.properties"; // 数据库配置文件地址

    public static final String ARTICLE_TYPE_ARTICLE = "article"; // 文章类型:文章
    public static final String ARTICLE_TYPE_PAGE = "page"; // 文章类型:页面

    public  static final String LOGIN_USER = "loginUser";

    public  static final int PLUGIN_TYPE_START = 1;
    public  static final int PLUGIN_TYPE_UPDATE = 2;
    public  static final int PLUGIN_TYPE_INSTALL = 3;
    public  static final int PLUGIN_TYPE_UNINSTALL = 4;

}

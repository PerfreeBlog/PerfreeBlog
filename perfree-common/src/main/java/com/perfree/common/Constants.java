package com.perfree.common;

public class Constants {
    // option
    public static final String OPTION_WEB_THEME = "WEB_THEME"; // 网站主题
    public static final String OPTION_WEB_COMMENT_IS_REVIEW = "WEB_COMMENT_IS_REVIEW"; // 评论审核


    // url
    public static final String URL_ARTICLE_LIST = "/articleList/"; // 文章列表
    public static final String URL_ARTICLE_TAG = "/tag/"; // 标签
    public static final String URL_ARTICLE_CATEGORY = "/category/"; // 分类
    public static final String URL_ARTICLE = "/article/"; // 文章
    public static final String URL_ARTICLE_SEARCH = "/article/search/"; // 搜索

    public static final int COMMENT_STATUS_NORMAL = 0; // 评论不需要审核
    public static final int COMMENT_STATUS_REVIEW = 1; // 评论需审核

    public static final String PROD_THEMES_PATH = "resources/static/themes"; // 生产主题路径
    public static final String DEV_THEMES_PATH = "perfree-web/src/main/resources/static/themes";// 开发主题路径

    public static final String SEPARATOR = "/"; // 路径

    public static final String RESOURCES_DIR = "resources"; // resources路径
    public static final String PLUGINS_DIR = "resources/plugins"; // 插件
}

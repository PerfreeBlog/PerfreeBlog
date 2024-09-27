package com.perfree.commons.constant;

public class SystemConstants {

    /** version */
    public static final String VERSION = "version";

    /** 默认数量 */
    public static final int DEFAULT_COUNT = 0;

    /** 验证码随机字符 */
    public static final String CAPTCHA_RANDOM = "0123456789";

    /** 验证码位数 */
    public static final int CAPTCHA_LENGTH = 4;

    /** 验证码图片宽度 */
    public static final int CAPTCHA_IMAGE_WIDTH = 115;

    /** 验证码图片高度 */
    public static final int CAPTCHA_IMAGE_HEIGHT = 38;

    /** 统一的文件分隔符 */
    public final static String FILE_SEPARATOR = "/";


    /** 附件上传到本地后,统一的访问url前缀 */
    public static final String DEFAULT_ATTACH_URL_PATTERNS = "/api/attach/**";


    /** 插件路径 */
    public static final String PLUGINS_DIR = "resources/plugins";


    /** 临时目录 */
    public static final String UPLOAD_TEMP_PATH = "resources/temp";

    /** 临时目录 */
    public static final String CODEGEN_TEMP_PATH = "resources/temp/codeGen";

    /** resources路径 */
    public static final String RESOURCES_DIR = "resources";


    /**数据库配置文件地址*/
    public static final String DB_PROPERTIES_PATH = "resources/db.properties";

    /** 统一的url分隔符 */
    public final static String URL_SEPARATOR = "/";

    /** url-  /articleList/ */
    public static final String ARTICLE_LIST_URL = " /articleList/";


    /** 生产主题路径 */
    public static final String PROD_THEMES_PATH = "resources/static/themes";

    /** 开发主题路径 */
    public static final String DEV_THEMES_PATH = "classpath:static/themes";

    public static final String THEME_OPTION_IDENT_PRE = "theme_";

    public static final String PLUGIN_OPTION_IDENT_PRE = "plugin_";

    /** 预览主题的前缀 */
    public static final String PREVIEW_THEME_URL = "previewTheme";

    /** 主题根目录 */
    public static final String THEME_BASE_DIR = "static/themes/";
    /** url - category(分类) */
    public static final String URL_ARTICLE_CATEGORY = "/category/";

    /** url - tag(标签) */
    public static final String URL_ARTICLE_TAG = "/tag/";

    /** url - categories(分类) */
    public static final String URL_CATEGORIES = "/categories/";
    /** url - tags(标签) */
    public static final String URL_TAGS = "/tags/";
    /** url - journalList(动态列表) */
    public static final String URL_JOURNAL_LIST = "/journalList/";
    /** url - archive(文章归档) */
    public static final String URL_ARCHIVE = "/archive/";

    /** url - page(通用页面) */
    public static final String URL_PAGE = "/page/";

    /** 页面渲染SEO_TITLE */
    public static final String RENDER_PAGE_SEO_TITLE = "SEO_TITLE";

    /** 页面渲染SEO_KEYWORD */
    public static final String RENDER_PAGE_SEO_KEYWORD = "SEO_KEYWORD";

    /** 页面渲染SEO_DESC*/
    public static final String RENDER_PAGE_SEO_DESC = "SEO_DESC";
    /** url - article/search(搜索) */
    public static final String URL_ARTICLE_SEARCH = "/article/search/";
    /** url - article(文章) */
    public static final String URL_ARTICLE = "/article/";

}

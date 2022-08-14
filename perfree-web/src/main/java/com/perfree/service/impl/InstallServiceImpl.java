package com.perfree.service.impl;

import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.db.Entity;
import cn.hutool.db.ds.druid.DruidDSFactory;
import cn.hutool.db.ds.simple.SimpleDataSource;
import cn.hutool.db.handler.EntityListHandler;
import cn.hutool.db.sql.SqlExecutor;
import cn.hutool.setting.dialect.Props;
import com.alibaba.druid.pool.DruidConnectionHolder;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceBuilder;
import com.alibaba.druid.util.DruidDataSourceUtils;
import com.perfree.commons.Constants;
import com.perfree.commons.DynamicDataSource;
import com.perfree.commons.GravatarUtil;
import com.perfree.controller.admin.InstallController;
import com.perfree.mapper.ArticleMapper;
import com.perfree.model.*;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuManager;
import com.perfree.plugin.PluginManagerService;
import com.perfree.service.*;
import org.apache.commons.collections.ListUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class InstallServiceImpl implements InstallService {
    private final static Logger LOGGER = LoggerFactory.getLogger(InstallServiceImpl.class);
    @Autowired
    private OptionService optionService;
    @Autowired
    private MenuService menuService;
    @Autowired
    private PluginService pluginService;

    @Value("${version}")
    private String version;

    @Autowired
    private PluginManagerService pluginManagerService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private TagService tagService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private LinkService linkService;
    @Autowired
    private RoleService roleService;
    private static final int INSTALL_DATABASE_RESULT_SUCCESS = 200;
    private static final int INSTALL_DATABASE_RESULT_EXIST = -1;
    private static final int INSTALL_DATABASE_RESULT_SKIP = -2;
    /** 初始化数据库类型:正常 */
    private static final int INIT_INSTALL_DATABASE_TYPE_NORMAL = 1;
    /** 初始化数据库类型:跳过 */
    private static final int INIT_INSTALL_DATABASE_TYPE_SKIP = 2;

    public int addDatabase(Database database) throws Exception{
        DruidDataSource druidDataSource = DynamicDataSource.getDataSource();
        if (druidDataSource.isInited()){
            druidDataSource.close();
            druidDataSource = new DruidDataSource();
        }
        File file = new File(Constants.DB_PROPERTIES_PATH);
        Props setting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
        File sqlFile = new File("resources/Perfree.sql");
        if (!sqlFile.exists()){
            sqlFile = FileUtil.file("Perfree.sql");
        }
        String url = "";
        // mysql
        if (database.getType().equals("mysql")) {
            String format = "jdbc:mysql://%s:%s/%s?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true";
            if (StringUtils.isBlank(database.getDataBaseName())) {
                database.setDataBaseName("perfree");
            }
            url = String.format(format, database.getAddress(), database.getPort(), database.getDataBaseName());
            druidDataSource.setUrl(url);
            druidDataSource.setUsername(database.getUserName());
            druidDataSource.setPassword(database.getPassword());
            druidDataSource.setDriverClassName("com.mysql.jdbc.Driver");
            setting.setProperty("url",url);
            setting.setProperty("username",database.getUserName());
            setting.setProperty("password",database.getPassword());
            setting.setProperty("driverClassName","com.mysql.jdbc.Driver");
            setting.setProperty("type","mysql");
        }
        // sqlite
        if (database.getType().equals("sqlite")){
            url = "jdbc:sqlite:resources/db/perfree.db?date_string_format=yyyy-MM-dd HH:mm:ss";
            druidDataSource.setUrl(url);
            druidDataSource.setDriverClassName("org.sqlite.JDBC");
            initSqliteFile("resources/db/perfree.db");
            sqlFile = new File("resources/Perfree-sqlite.sql");
            if (!sqlFile.exists()){
                sqlFile = FileUtil.file("Perfree-sqlite.sql");
            }
            setting.setProperty("url",url);
            setting.setProperty("driverClassName","org.sqlite.JDBC");
            setting.setProperty("type","sqlite");
        }

        SimpleDataSource ds = new SimpleDataSource(url, database.getUserName(), database.getPassword());
        Connection connection = null;
        try{
            connection = ds.getConnection();
            // 检测数据库是否存在
            if (database.getType().equals("mysql")) {
                List<Entity> entityList = SqlExecutor.query(connection, "select count(1) tableNumber from information_schema.TABLES WHERE table_schema = ?",
                        new EntityListHandler(), database.getDataBaseName());
                if (entityList != null && entityList.size() > 0 && entityList.get(0).getInt("tableNumber") > 0
                        && database.getInstallType() == INIT_INSTALL_DATABASE_TYPE_NORMAL){
                    return INSTALL_DATABASE_RESULT_EXIST;
                }
            }

            if(database.getInstallType() == INIT_INSTALL_DATABASE_TYPE_SKIP) {
                setting.setProperty("installStatus","dbSuccess");
                installInitOperate(setting, file);
                return INSTALL_DATABASE_RESULT_SKIP;
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("数据库连接失败:{}", e.getMessage());
            throw new Exception("数据库连接失败");
        } finally {
            if (connection != null) {
                connection.close();
            }
            ds.close();
        }
        DynamicDataSource.setDataSource(druidDataSource, setting.getStr("type"));
        initData(sqlFile);
        setting.setProperty("installStatus","dbSuccess");
        setting.setProperty("dataVersion", version);
        installInitOperate(setting, file);
        return INSTALL_DATABASE_RESULT_SUCCESS;
    }

    /**
     * 初始化数据
     * @param sqlFile sqlFile
     * @throws Exception e
     */
    private void initData(File sqlFile) throws Exception{
        Connection connection = DynamicDataSource.getDataSource().getConnection();
        FileReader fileReader = new FileReader(sqlFile);
        String createSql = fileReader.readString();
        String[] split = createSql.split(";");
        for (int i = 0; i < split.length - 1; i++){
            connection.prepareStatement(split[i]).execute();
        }
        connection.close();

        Tag tag = initTag();
        Category category = initCategory();
        Article article = initArticle(tag, category);
        initOption();
        initRole();
        initMenu();
        initPage();
        initJournal();
        initComment(article);
        initLink();
    }

    private void initOption() {
        List<Option> optionList = new ArrayList<>();
        Option themeOption = new Option();
        themeOption.setKey("WEB_THEME");
        themeOption.setValue("default");
        optionList.add(themeOption);

        Option isRegisterOption = new Option();
        isRegisterOption.setKey("WEB_IS_REGISTER");
        isRegisterOption.setValue("1");
        optionList.add(isRegisterOption);

        Option commentReviewOption = new Option();
        commentReviewOption.setKey("WEB_COMMENT_IS_REVIEW");
        commentReviewOption.setValue("0");
        optionList.add(commentReviewOption);

        optionService.addOrUpdateOptions(optionList);
    }

    private void initRole() {
        Role adminRole = new Role();
        adminRole.setCode("admin");
        adminRole.setName("管理员");
        adminRole.setDescription("网站管理员");
        roleService.add(adminRole);

        Role userRole = new Role();
        userRole.setCode("user");
        userRole.setName("普通用户");
        userRole.setDescription("网站用户");
        roleService.add(userRole);

        Role editorRole = new Role();
        editorRole.setCode("editor");
        editorRole.setName("文章编辑");
        editorRole.setDescription("文章编辑");
        roleService.add(editorRole);

        Role contributeRole = new Role();
        contributeRole.setCode("contribute");
        contributeRole.setName("文章贡献");
        contributeRole.setDescription("文章贡献");
        roleService.add(contributeRole);
    }

    private void initMenu() {
        Menu archiveMenu = new Menu();
        archiveMenu.setPid("-1");
        archiveMenu.setName("归档");
        archiveMenu.setUrl("/archive");
        archiveMenu.setIcon("fa-calendar");
        archiveMenu.setSeq(1);
        archiveMenu.setType(0);
        archiveMenu.setTarget(0);
        archiveMenu.setStatus(0);
        menuService.add(archiveMenu);

        Menu journalMenu = new Menu();
        journalMenu.setPid("-1");
        journalMenu.setName("动态");
        journalMenu.setUrl("/journal");
        journalMenu.setIcon("fa-newspaper-o");
        journalMenu.setSeq(2);
        journalMenu.setType(0);
        journalMenu.setTarget(0);
        journalMenu.setStatus(0);
        menuService.add(journalMenu);

        Menu linkMenu = new Menu();
        linkMenu.setPid("-1");
        linkMenu.setName("友链");
        linkMenu.setUrl("/page/link");
        linkMenu.setIcon("fa-user-o");
        linkMenu.setSeq(3);
        linkMenu.setType(0);
        linkMenu.setTarget(0);
        linkMenu.setStatus(0);
        menuService.add(linkMenu);
    }

    private Tag initTag() {
        Tag tag = new Tag();
        tag.setColor("#36b368");
        tag.setName("演示标签");
        tag.setUserId(1L);
        tagService.add(tag);
        return tag;
    }

    private Category initCategory() {
        Category category = new Category();
        category.setName("演示分类");
        category.setStatus(0);
        category.setPid(-1L);
        categoryService.add(category);
        return category;
    }

    /**
     * 初始化文章数据
     */
    private Article initArticle(Tag tag,Category category) {
        Article article = new Article();
        article.setType(Constants.ARTICLE_TYPE_ARTICLE);
        article.setCategoryId(category.getId());
        ArticleTag articleTag = new ArticleTag();
        articleTag.setTagId(tag.getId());
        article.setArticleTags(ListUtil.toLinkedList(articleTag));
        article.setTitle("HelloWorld");
        article.setContent("欢迎使用 Perfree，如果您看到这篇文章,表示Perfree 已经安装成功.");
        article.setContentModel("markdown");
        article.setIsTop(0);
        article.setStatus(0);
        article.setIsComment(1);
        article.setUserId(1L);
        articleService.add(article);
        return article;
    }

    private void initPage() {
        // 友链
        Article linkArticle = new Article();
        linkArticle.setType(Constants.ARTICLE_TYPE_PAGE);
        linkArticle.setTitle("友链");
        linkArticle.setContent("友链页面,您可直接访问填写的访问地址进行查看,或者在菜单管理配置该访问地址~");
        linkArticle.setSlug("link");
        linkArticle.setContentModel("markdown");
        linkArticle.setIsTop(0);
        linkArticle.setStatus(0);
        linkArticle.setIsComment(1);
        linkArticle.setUserId(1L);
        articleService.add(linkArticle);

        // 演示
        Article demoArticle = new Article();
        demoArticle.setType(Constants.ARTICLE_TYPE_PAGE);
        demoArticle.setTitle("演示页面");
        demoArticle.setContent("这是一个演示页面,您可直接访问填写的访问地址进行查看,或者在菜单管理配置该访问地址~");
        demoArticle.setSlug("demo");
        demoArticle.setContentModel("markdown");
        demoArticle.setIsTop(0);
        demoArticle.setStatus(0);
        demoArticle.setIsComment(1);
        demoArticle.setUserId(1L);
        articleService.add(demoArticle);
    }

    private void initJournal() {
        // 友链
        Article article = new Article();
        article.setType(Constants.ARTICLE_TYPE_JOURNAL);
        article.setTitle(DateUtil.format(new Date(), "yyyy-MM-dd hh:mm:ss"));
        article.setContent("第一条动态");
        article.setContentModel("markdown");
        article.setIsTop(0);
        article.setStatus(0);
        article.setIsComment(1);
        article.setUserId(1L);
        articleService.add(article);
    }

    private void initComment(Article article) {
        Comment comment = new Comment();
        comment.setArticleId(article.getId());
        comment.setEmail("perfree@126.com");
        comment.setStatus(0);
        comment.setUserName("Perfree");
        comment.setContent("第一条评论");
        comment.setWebsite("http://www.perfree.org.cn");
        comment.setAvatar(GravatarUtil.getGravatar(comment.getEmail()));
        commentService.add(comment);
    }

    private void initLink(){
        Link link = new Link();
        link.setAddress("http://www.perfree.org.cn");
        link.setDesc("一款Java开发的博客/CMS系统");
        link.setLogo("http://www.perfree.org.cn/static/public/images/logo.png");
        link.setName("Perfree官网");
        linkService.add(link);
    }

    /**
     * @description 初始化
     * @author Perfree
     */
    private void installInitOperate(Props setting, File file) throws Exception {
        setting.store(file.getAbsolutePath());
        optionService.initOptionCache();
        List<AdminMenuGroup> adminMenuGroups = MenuManager.initSystemMenu();
        menuService.initSystemMenu(adminMenuGroups);
        try{
            List<Plugin> plugins = pluginService.getAll();
            pluginManagerService.initPlugins(plugins);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void initSqliteFile(String filePath) throws Exception {
        File file = new File(filePath);

        File dir = file.getParentFile();
        if(!dir.exists()){
            if (!dir.mkdirs()) {
                throw new Exception("数据库目录创建失败");
            }
        }

        if(!file.exists()){
            try {
                if (!file.createNewFile()) {
                    throw new Exception("数据库文件创建失败");
                }
            } catch (IOException e) {
                throw new Exception("数据库文件创建失败" + e.getMessage());
            }
        }
    }
}

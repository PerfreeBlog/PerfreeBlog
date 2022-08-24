package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import com.alibaba.druid.pool.DruidDataSource;
import com.jfinal.template.Directive;
import com.perfree.commons.*;
import com.perfree.directive.TemplateDirective;
import com.perfree.model.Plugin;
import com.perfree.model.Theme;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuManager;
import com.perfree.plugin.PluginManagerService;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
import com.perfree.service.PluginService;
import com.perfree.service.ThemeService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.File;
import java.sql.Connection;
import java.util.List;
import java.util.Map;

/**
 * Execute after startup
 * @author Perfree
 */
@Component
public class PostAppRunner implements ApplicationRunner {
    private final static Logger LOGGER = LoggerFactory.getLogger(PostAppRunner.class);
    private static final CacheManager cacheManager = CacheManager.newInstance();

    @Value("${version}")
    private String version;

    private final OptionService optionService;
    private final MenuService menuService;
    private final PluginManagerService pluginManagerService;
    private final PluginService pluginService;
    private final ThemeService themeService;

    public PostAppRunner(PluginManagerService pluginManagerService,OptionService optionService,
                         MenuService menuService,PluginService pluginService, ThemeService themeService) {
        this.optionService = optionService;
        this.menuService = menuService;
        this.pluginManagerService = pluginManagerService;
        this.pluginService = pluginService;
        this.themeService = themeService;
    }

    @Override
    public void run(ApplicationArguments args) {
        PostAppRunner.loadDirective();
        File file = new File(Constants.DB_PROPERTIES_PATH);
        if (!file.exists()) {
            return;
        }
        Props dbSetting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
        String installStatus = dbSetting.getStr("installStatus");
        if (StringUtils.isNotBlank(installStatus)) {
            DruidDataSource druidDataSource = DynamicDataSource.getDataSource();
            if (druidDataSource.isInited()){
                druidDataSource.close();
                druidDataSource = new DruidDataSource();
            }
            druidDataSource.setUrl(dbSetting.getStr("url"));
            if (dbSetting.getStr("type").equals("mysql")){
                druidDataSource.setUsername(dbSetting.getStr("username"));
                druidDataSource.setPassword(dbSetting.getStr("password"));
            }
            druidDataSource.setDriverClassName(dbSetting.getStr("driverClassName"));
            DynamicDataSource.setDataSource(druidDataSource,dbSetting.getStr("type"));
        }
        dbSetting.autoLoad(true);
        // Load options and put into memory
        if (DynamicDataSource.getDataSource() != null && DynamicDataSource.dataSourceIsInit) {
            if (dbSetting.getStr("dataVersion") == null || !dbSetting.getStr("dataVersion").equals(version)) {
                updateSql(dbSetting);
            }
            optionService.initOptionCache();
            List<AdminMenuGroup> adminMenuGroups = MenuManager.initSystemMenu();
            menuService.initSystemMenu(adminMenuGroups);
            initTheme();
            initPlugins();
        }
    }

    /**
     * @description 如果存在update.sql则执行update,此处更新方式待修改
     * @author Perfree
     */
    private void updateSql(Props dbSetting) {
        try{
            File sqlFile;
            if (DynamicDataSource.dataSourceType.equals("mysql")) {
                sqlFile = new File("resources/update.sql");
                if(!sqlFile.exists()){
                    sqlFile = com.perfree.commons.FileUtil.getClassPathFile("classpath:update.sql");
                }
            } else {
                sqlFile = new File("resources/update-sqlite.sql");
                if(!sqlFile.exists()){
                    sqlFile = com.perfree.commons.FileUtil.getClassPathFile("classpath:update-sqlite.sql");
                }
            }
            if (sqlFile != null && sqlFile.exists()) {
                DataSource dataSource = SpringBeanUtils.getBean(DataSource.class);
                FileReader fileReader = new FileReader(sqlFile);
                String updateFileStr = fileReader.readString();
                String[] updateStrSplit = updateFileStr.split("--PerfreeBlog");
                String dbVersion = StringUtils.isBlank(dbSetting.getStr("dataVersion")) ? "v1.0.0" : dbSetting.getStr("dataVersion");
                Connection connection = dataSource.getConnection();
                for (int i = 1; i < updateStrSplit.length; i++) {
                    String[] split = updateStrSplit[i].split(";");
                    long currUpdateVersion = StringUtil.versionToLong(split[0]);
                    // 1. 更新sql版本等于最新项目版本
                    // 2. 更新sql版本 大于 dbVersion
                    // 3. 更新sql版本 小于等于最新项目版本
                    if ((currUpdateVersion == StringUtil.versionToLong(version) || currUpdateVersion > StringUtil.versionToLong(dbVersion)) &&
                            currUpdateVersion <= StringUtil.versionToLong(version)) {
                        for (int j = 1; j < split.length; j++){
                            try{
                                if(StringUtils.isNotBlank(split[j])){
                                    connection.prepareStatement(split[j]).execute();
                                    LOGGER.info("update: {}", split[j]);
                                }
                            }catch (Exception e) {
                                e.printStackTrace();
                                LOGGER.info("执行update sql出错，SQL语句: {}，错误信息：{}", split[j],e.getMessage());
                            }
                        }
                    }
                }

                File file = new File(Constants.DB_PROPERTIES_PATH);
                Props newDbSetting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
                newDbSetting.setProperty("dataVersion", version);
                newDbSetting.store(file.getAbsolutePath());
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.info("更新数据库出错,请手动执行update.sql, 错误信息: {}", e.getMessage());
        }
    }

    /**
     * @description 初始化插件
     * @author Perfree
     */
    private void initPlugins() {
        try {
            List<Plugin> plugins = pluginService.getAll();
            pluginManagerService.initPlugins(plugins);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Load Template Directive
     */
    public static void loadDirective() {
        Map<String, Object> beans = SpringBeanUtils.getApplicationContext().getBeansWithAnnotation(TemplateDirective.class);
        for (Map.Entry<String, Object> entry : beans.entrySet()) {
            Object bean = entry.getValue();
            TemplateDirective injectBean = bean.getClass().getAnnotation(TemplateDirective.class);
            Directive directive = (Directive) bean;
            Class<? extends Directive> directiveByName = EnjoyConfig.jfr.getEngine().getEngineConfig().getDirective(injectBean.value());
            if (directiveByName == null) {
                LOGGER.info("Add Directive: {}", injectBean.value());
                EnjoyConfig.jfr.addDirective(injectBean.value(), directive.getClass());
            }
        }
    }

    private void initTheme() {
        String currTheme = OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME);
        Theme themeByPath = themeService.getThemeByPath(currTheme);
        Ehcache cache = cacheManager.getEhcache("optionData");
        if (themeByPath != null && StringUtils.isNotBlank(themeByPath.getType())) {
            cache.put(new Element(Constants.OPTION_WEB_THEME_TYPE, themeByPath.getType()));
        }
    }
}

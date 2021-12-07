package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import com.jfinal.template.Directive;
import com.perfree.commons.Constants;
import com.perfree.commons.DynamicDataSource;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.directive.TemplateDirective;
import com.perfree.permission.AdminMenuGroup;
import com.perfree.permission.MenuManager;
import com.perfree.plugin.PluginManagerService;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
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

    @Value("${version}")
    private String version;

    private final OptionService optionService;
    private final MenuService menuService;
    private final PluginManagerService pluginManagerService;

    public PostAppRunner(PluginManagerService pluginManagerService,OptionService optionService, MenuService menuService) {
        this.optionService = optionService;
        this.menuService = menuService;
        this.pluginManagerService = pluginManagerService;
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
            DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
            dataSourceBuilder.url(dbSetting.getStr("url"));
            if (dbSetting.getStr("type").equals("mysql")){
                dataSourceBuilder.username(dbSetting.getStr("username"));
                dataSourceBuilder.password(dbSetting.getStr("password"));
            }
            dataSourceBuilder.driverClassName(dbSetting.getStr("driverClassName"));
            DataSource dataSource = dataSourceBuilder.build();
            DynamicDataSource.setDataSource(dataSource,dbSetting.getStr("type"));
        }
        dbSetting.autoLoad(true);
        // Load options and put into memory
        if (DynamicDataSource.getDataSource() != null) {
            if (dbSetting.getStr("dataVersion") == null || !dbSetting.getStr("dataVersion").equals(version)) {
                updateSql(dbSetting);
            }
            optionService.initOptionCache();
            List<AdminMenuGroup> adminMenuGroups = MenuManager.initSystemMenu();
            menuService.initSystemMenu(adminMenuGroups);
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
            } else {
                sqlFile = new File("resources/update-sqlite.sql");
            }
            if (sqlFile.exists()) {
                DataSource dataSource = SpringBeanUtils.getBean(DataSource.class);
                FileReader fileReader = new FileReader(sqlFile);
                String updateFileStr = fileReader.readString();
                String[] updateStrSplit = updateFileStr.split("--PerfreeBlog");
                String dbVersion = StringUtils.isBlank(dbSetting.getStr("dataVersion")) ? "v1.0.0" : dbSetting.getStr("dataVersion");
                Connection connection = dataSource.getConnection();
                for (int i = 1; i < updateStrSplit.length; i++) {
                    String[] split = updateStrSplit[i].split(";");
                    long currUpdateVersion = versionToLong(split[0]);
                    // 1. 更新sql版本等于最新项目版本
                    // 2. 更新sql版本 大于 dbVersion
                    // 3. 更新sql版本 小于等于最新项目版本
                    if ((currUpdateVersion == versionToLong(version) || currUpdateVersion > versionToLong(dbVersion)) &&
                            currUpdateVersion <= versionToLong(version)) {
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
                // 临时: 小于128版本,清除插件目录
                if (versionToLong(dbVersion) < 128) {
                    File pluginFile = new File(Constants.PLUGIN_PATH);
                    if (pluginFile.exists()){
                        FileUtil.clean(pluginFile.getAbsolutePath());
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
            pluginManagerService.initPlugins();
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

    public long versionToLong(String versionStr) {
       return Long.parseLong(versionStr.replaceAll("\r\n","").replaceAll("--","")
               .replaceAll("\\.","").replace("v",""));
    }
}

package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.db.sql.SqlExecutor;
import cn.hutool.setting.dialect.Props;
import com.jfinal.template.Directive;
import com.perfree.common.Constants;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.directive.DirectiveUtil;
import com.perfree.directive.TemplateDirective;
import com.perfree.model.Plugin;
import com.perfree.plugins.PluginsUtils;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
import com.perfree.service.PluginService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.File;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Execute after startup
 *
 * @author Perfree
 */
@Component
public class PostAppRunner implements ApplicationRunner {
    private final static Logger LOGGER = LoggerFactory.getLogger(PostAppRunner.class);

    private final OptionService optionService;
    private final MenuService menuService;
    private final PluginService pluginService;


    public PostAppRunner(OptionService optionService,MenuService menuService, PluginService pluginService) {
        this.optionService = optionService;
        this.menuService = menuService;
        this.pluginService = pluginService;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Load Template Directive
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
            updateSql();
            optionService.initOptionCache();
            menuService.registerMenuPage();
            initPlugins();
        }
    }

    /**
     * @description 如果存在update.sql则执行update
     * @author Perfree
     */
    private void updateSql() {
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
                String createSql = fileReader.readString();
                String[] split = createSql.split(";");
                Connection connection = dataSource.getConnection();
                for (int i = 0; i < split.length - 1; i++){
                   try{
                       SqlExecutor.execute(connection, split[i]);
                       LOGGER.info("update: {}", split[i]);
                   }catch (Exception e) {
                       e.printStackTrace();
                       LOGGER.info("执行update sql出错，SQL语句: {}，错误信息：{}", split[i],e.getMessage());
                   }
                }
                new File("resources/update.sql").delete();
                new File("resources/update-sqlite.sql").delete();
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
        List<Plugin> pluginList = pluginService.getAll();
        List<File> pluginFiles = new ArrayList<>();
        for (Plugin plugin : pluginList) {
            File file = new File(Constants.PLUGIN_PATH + File.separator + plugin.getPath());
            pluginFiles.add(file);
        }
        PluginsUtils.initPlugins(pluginFiles);
    }

    /**
     * Load Template Directive
     */
    public static void loadDirective() {
        Map<String, Object> beans = DirectiveUtil.getBean();
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
}

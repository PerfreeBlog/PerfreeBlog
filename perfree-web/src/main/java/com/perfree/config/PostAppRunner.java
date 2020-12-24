package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import com.jfinal.template.Directive;
import com.perfree.common.Constants;
import com.perfree.directive.DirectiveUtil;
import com.perfree.directive.TemplateDirective;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.io.File;
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

    public PostAppRunner(OptionService optionService,MenuService menuService) {
        this.optionService = optionService;
        this.menuService = menuService;
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
            DynamicDataSource.setDataSource(dataSource);
        }
        dbSetting.autoLoad(true);
        // Load options and put into memory
        if (DynamicDataSource.getDataSource() != null) {
            optionService.initOptionCache();
            menuService.registerMenuPage();

        }
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

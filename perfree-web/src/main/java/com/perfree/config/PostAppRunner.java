package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import com.alibaba.druid.pool.DruidDataSource;
import com.jfinal.template.Directive;
import com.perfree.commons.Constants;
import com.perfree.commons.DynamicDataSource;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.directive.TemplateDirective;
import com.perfree.enjoy.EnjoyConfig;
import com.perfree.service.option.OptionService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Map;

/**
 * Execute after startup
 * @author Perfree
 */
@Component
public class PostAppRunner implements ApplicationRunner {
    private final static Logger LOGGER = LoggerFactory.getLogger(PostAppRunner.class);
    private final OptionService optionService;

    public PostAppRunner(OptionService optionService) {
        this.optionService = optionService;
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
            druidDataSource.setUsername(dbSetting.getStr("username"));
            druidDataSource.setPassword(dbSetting.getStr("password"));
            druidDataSource.setDriverClassName(dbSetting.getStr("driverClassName"));
            DynamicDataSource.setDataSource(druidDataSource,dbSetting.getStr("type"));
        }
        dbSetting.autoLoad(true);
        // Load options and put into memory
        if (DynamicDataSource.getDataSource() != null && DynamicDataSource.dataSourceIsInit) {
            optionService.initOptionCache();
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
}

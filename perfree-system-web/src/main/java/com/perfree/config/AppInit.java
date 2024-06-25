package com.perfree.config;

import com.jfinal.template.Directive;
import com.perfree.cache.AttachConfigCacheService;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.convert.attachConfig.AttachConfigConvert;
import com.perfree.convert.option.OptionConvert;
import com.perfree.enjoy.EnjoyConfig;
import com.perfree.file.FileHandleStorageHolder;
import com.perfree.file.handle.local.FileLocalHandleImpl;
import com.perfree.file.handle.s3.FileS3HandleImpl;
import com.perfree.mapper.AttachConfigMapper;
import com.perfree.model.AttachConfig;
import com.perfree.model.Option;
import com.perfree.plugin.PluginDevManager;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.plugin.PluginManager;
import com.perfree.service.attachConfig.AttachConfigService;
import com.perfree.service.option.OptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import com.perfree.system.api.option.dto.OptionDTO;

import java.util.List;
import java.util.Map;

/**
 * @author Perfree
 * @description 初始化执行
 * @date 15:39 2023/9/28
 */
@Component
public class AppInit implements ApplicationRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationRunner.class);

    @Value("${server.port}")
    private String port;

    private final PluginManager pluginManager;

    private final PluginDevManager pluginDevManager;

    private final AttachConfigMapper attachConfigMapper;

    private final OptionService optionService;

    private final OptionCacheService optionCacheService;

    private final AttachConfigCacheService attachConfigCacheService;

    private final AttachConfigService attachConfigService;

    public AppInit(PluginManager pluginManager, PluginDevManager pluginDevManager, OptionService optionService,
                   OptionCacheService optionCacheService, AttachConfigMapper attachConfigMapper,
                   AttachConfigCacheService attachConfigCacheService, AttachConfigService attachConfigService) {
        this.pluginManager = pluginManager;
        this.pluginDevManager = pluginDevManager;
        this.optionService = optionService;
        this.optionCacheService = optionCacheService;
        this.attachConfigMapper = attachConfigMapper;
        this.attachConfigCacheService = attachConfigCacheService;
        this.attachConfigService = attachConfigService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        loadDirective();
        initFileHandle();
        initOptions();
        initAttachConfig();
        attachConfigService.initLocalResourcesPatterns();
        pluginManager.initPlugins();
        String command = System.getProperty("sun.java.command");
        if (command != null && !command.contains(".jar")) {
            // 源码运行,加载本地插件
            pluginDevManager.initPlugins();
        }
        List<PluginInfo> pluginInfoList = PluginInfoHolder.getAllPluginInfo();
        StringBuilder successPluginStr = new StringBuilder();
        pluginInfoList.forEach(pluginInfo -> successPluginStr.append("Success Load Plugin -> ").append(pluginInfo.getPluginPath()).append("\n"));
        String banner = """
                ----------------------------------------------------------------------------------
                                         __                     \s
                                        / _|                    \s
                  _ __     ___   _ __  | |_   _ __    ___    ___\s
                 | '_ \\   / _ \\ | '__| |  _| | '__|  / _ \\  / _ \\
                 | |_) | |  __/ | |    | |   | |    |  __/ |  __/
                 | .__/   \\___| |_|    |_|   |_|     \\___|  \\___|
                 | |                                            \s
                 |_|                                            \s
                 
                 %s
                 Successfully started!
                 access port: %s
                ----------------------------------------------------------------------------------
                """.formatted(successPluginStr, port);
        System.out.println(banner);
    }

    /**
     * 初始化文件上传处理类
     */
    private void initFileHandle() {
        FileHandleStorageHolder.putFileHandleStorage(0, new FileLocalHandleImpl());
        FileHandleStorageHolder.putFileHandleStorage(1, new FileS3HandleImpl());
    }

    /**
     * 初始化附件配置
     */
    private void initAttachConfig() throws Exception {
        List<AttachConfig> all = attachConfigMapper.getAll();
        List<AttachConfigCacheDTO> attachConfigCacheDTOS = AttachConfigConvert.INSTANCE.convertCacheListDTO(all);
        for (AttachConfigCacheDTO attachConfig : attachConfigCacheDTOS) {
            attachConfigCacheService.putAttachConfig(attachConfig.getId(), attachConfig);
        }
    }

    /**
     * 初始化配置
     */
    private void initOptions() {
        LOGGER.info("start init option cache");
        List<Option> optionList = optionService.getAllOption();
        List<OptionDTO> options = OptionConvert.INSTANCE.convertCacheDTO(optionList);
        for (OptionDTO option : options) {
            optionCacheService.putOption(option.getKey(), option);
        }
        LOGGER.info("init option cache success");
    }


    /**
     * Load Template Directive
     */
    public static void loadDirective() {
        Map<String, Object> beans = SpringBeanUtil.context.getBeansWithAnnotation(TemplateDirective.class);
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

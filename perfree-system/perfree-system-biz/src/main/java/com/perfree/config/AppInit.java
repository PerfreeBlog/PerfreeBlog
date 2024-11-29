package com.perfree.config;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.jfinal.template.Directive;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.ClassPathFileUtil;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.commons.utils.SqlExecUtils;
import com.perfree.commons.utils.VersionUtil;
import com.perfree.constant.OptionConstant;
import com.perfree.enjoy.EnjoyConfig;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.file.FileHandleStorageHolder;
import com.perfree.file.handle.local.FileLocalHandleImpl;
import com.perfree.file.handle.s3.FileS3HandleImpl;
import com.perfree.model.Option;
import com.perfree.service.attachConfig.AttachConfigService;
import com.perfree.service.dictData.DictDataService;
import com.perfree.service.option.OptionService;
import com.perfree.service.plugins.PluginsService;
import com.perfree.theme.ThemeManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.sql.SQLException;
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

    @Value("${version}")
    private String version;

    private final PluginsService pluginsService;

    private final OptionService optionService;

    private final AttachConfigService attachConfigService;

    private final DictDataService dictDataService;

    private final ThemeManager themeManager;


    public AppInit(OptionService optionService,  AttachConfigService attachConfigService,
                   PluginsService pluginsService, DictDataService dictDataService, ThemeManager themeManager) {
        this.optionService = optionService;
        this.attachConfigService = attachConfigService;
        this.pluginsService = pluginsService;
        this.dictDataService = dictDataService;
        this.themeManager = themeManager;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!datasourceIsExist()) {
            LOGGER.info("-> 数据库未初始化,正在执行初始化....");
            File sqlFile = ClassPathFileUtil.getClassPathFile("classpath:sql/perfree.sql");
            if(sqlFile == null || !sqlFile.exists()){
                throw new ServiceException(ErrorCode.DATASOURCE_INIT_SQL_NOT_EXIST);
            }
            SqlExecUtils.execSqlFile(sqlFile);
            optionService.handleWebVersion();
            LOGGER.info("-> 数据库初始化完毕....");
        }

        handleUpdate();
        handleInit();
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
                 
                 Successfully started!
                 access port: %s
                ----------------------------------------------------------------------------------
                """.formatted(port);
        System.out.println(banner);
    }

    private void handleUpdate() throws SQLException {
        Option optionByIdentificationAndKey = optionService.getOptionByIdentificationAndKey(OptionConstant.OPTION_IDENTIFICATION_SYSTEM, OptionEnum.WEB_VERSION.getKey());
        if (null == optionByIdentificationAndKey) {
            return;
        }

        if (VersionUtil.versionToLong(version) <= VersionUtil.versionToLong(optionByIdentificationAndKey.getValue())) {
            return;
        }

        File sqlDir =  ClassPathFileUtil.getClassPathFile("classpath:sql");
        if(sqlDir == null || !sqlDir.exists()){
            return;
        }
        // 获取要执行的更新sql文件
        List<File> updateSqlFiles = FileUtil.loopFiles(sqlDir)
                .stream()
                .filter(file -> file.isFile() && StrUtil.startWith(file.getName(), "update-") && file.getName().endsWith(".sql")
                        && VersionUtil.isWithinVersionRange(file, optionByIdentificationAndKey.getValue(), version))
                .toList();
        for (File updateSqlFile : updateSqlFiles) {
            SqlExecUtils.execSqlFile(updateSqlFile);
        }
        optionService.handleWebVersion();
        LOGGER.info("执行更新sql完毕");
    }

    private void handleInit() throws Exception {
        LOGGER.info("-> 初始化模板指令....");
        loadDirective();
        LOGGER.info("-> 初始化模板指令完成");

        LOGGER.info("-> 初始化存储策略配置缓存....");
        initFileHandleCache();
        attachConfigService.initAttachConfigCache();
        LOGGER.info("-> 初始化存储策略配置缓存完成");

        LOGGER.info("-> 初始化配置缓存....");
        optionService.initOptionCache();
        LOGGER.info("-> 初始化配置缓存完成");

        LOGGER.info("-> 初始化数据字典缓存....");
        dictDataService.initDictDataCache();
        LOGGER.info("-> 初始化数据字典缓存完成");

        LOGGER.info("-> 初始化静态资源映射规则....");
        attachConfigService.initLocalResourcesPatterns();
        LOGGER.info("-> 初始化静态资源映射规则完成");

        LOGGER.info("-> 初始化插件....");
        pluginsService.watchMonitorDevPlugins();
        pluginsService.initPlugins();
        LOGGER.info("-> 初始化插件完成");

        LOGGER.info("-> 初始化主题处理逻辑....");
        initThemeHandle();
        LOGGER.info("-> 初始化主题处理逻辑");
    }

    private void initThemeHandle() {
        themeManager.initThemeResourceHandle(null);
    }

    /**
     * 初始化文件上传处理类
     */
    private void initFileHandleCache() {
        FileHandleStorageHolder.putFileHandleStorage(0, new FileLocalHandleImpl());
        FileHandleStorageHolder.putFileHandleStorage(1, new FileS3HandleImpl());
    }

    /**
     * Load Template Directive
     */
    private static void loadDirective() {
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

    private Boolean datasourceIsExist() {
        try{
            Option optionByIdentificationAndKey = optionService.getOptionByIdentificationAndKey(OptionConstant.OPTION_IDENTIFICATION_SYSTEM, OptionEnum.WEB_VERSION.getKey());
            if (null == optionByIdentificationAndKey) {
                optionService.handleWebVersion();
            }
            return true;
        }catch (Exception e) {
            // 出现错误, 数据库未初始化
            return false;
        }
    }
}

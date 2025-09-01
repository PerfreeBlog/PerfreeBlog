package com.perfree.plugin.commons;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.template.TemplateConfig;
import cn.hutool.extra.template.TemplateEngine;
import cn.hutool.extra.template.engine.velocity.VelocityEngine;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;

public class PluginCreateEngine {

    private static final Map<String, String> PLUGIN_JAVA_TPL = MapUtil.<String, String>builder(new LinkedHashMap<>())
            .put("pluginTpl/pom.vm", "perfree-plugins/${pluginId}/pom.xml")
            .put("pluginTpl/src/main/resources/assembly.vm", "perfree-plugins/${pluginId}/src/main/resources/assembly.xml")
            .put("pluginTpl/src/main/resources/plugin.vm", "perfree-plugins/${pluginId}/src/main/resources/plugin.yaml")
            .put("pluginTpl/src/main/resources/sql/install.vm", "perfree-plugins/${pluginId}/src/main/resources/sql/install.sql")
            .put("pluginTpl/src/main/resources/sql/uninstall.vm", "perfree-plugins/${pluginId}/src/main/resources/sql/uninstall.sql")
            .put("pluginTpl/src/main/java/PluginEventService.vm", "perfree-plugins/${pluginId}/src/main/java/${package}/PluginEventService.java")
            .build();

    private static final Map<String, String> PLUGIN_UI_TPL = MapUtil.<String, String>builder(new LinkedHashMap<>())
            .put("pluginTpl/ui/package.vm", "perfree-plugins/${pluginId}/ui/package.json")
            .put("pluginTpl/ui/vite.config.vm", "perfree-plugins/${pluginId}/ui/vite.config.js")
            .put("pluginTpl/ui/vite.module.config.vm", "perfree-plugins/${pluginId}/ui/vite.module.config.js")
            .put("pluginTpl/ui/README.vm", "perfree-plugins/${pluginId}/ui/README.md")
            .put("pluginTpl/ui/jsconfig.vm", "perfree-plugins/${pluginId}/ui/jsconfig.json")
            .put("pluginTpl/ui/index.vm", "perfree-plugins/${pluginId}/ui/index.html")
            .put("pluginTpl/ui/build.vm", "perfree-plugins/${pluginId}/ui/build.js")
            .put("pluginTpl/ui/.gitignore.vm", "perfree-plugins/${pluginId}/ui/.gitignore")
            .put("pluginTpl/ui/src/App.vm", "perfree-plugins/${pluginId}/ui/src/App.vue")
            .put("pluginTpl/ui/src/main.vm", "perfree-plugins/${pluginId}/ui/src/main.js")
            .put("pluginTpl/ui/src/core/utils/dictUtils.vm", "perfree-plugins/${pluginId}/ui/src/core/utils/dictUtils.js")
            .put("pluginTpl/ui/src/core/utils/perfree.vm", "perfree-plugins/${pluginId}/ui/src/core/utils/perfree.js")
            .put("pluginTpl/ui/src/router/index.vm", "perfree-plugins/${pluginId}/ui/src/router/index.js")
            .put("pluginTpl/ui/src/modules/example/index.vm", "perfree-plugins/${pluginId}/ui/src/modules/example/index.js")
            .put("pluginTpl/ui/src/modules/example/api/example.vm", "perfree-plugins/${pluginId}/ui/src/modules/example/api/example.js")
            .put("pluginTpl/ui/src/modules/example/view/ExampleView.vm", "perfree-plugins/${pluginId}/ui/src/modules/example/view/ExampleView.vue")
            .build();


    public static void genPlugin(Map<String, Object> contextMap) {
        TemplateConfig config = new TemplateConfig();
        config.setResourceMode(TemplateConfig.ResourceMode.CLASSPATH);
        TemplateEngine templateEngine = new VelocityEngine(config);
        for (String key : PLUGIN_JAVA_TPL.keySet()) {
            String render = templateEngine.getTemplate(key).render(contextMap);
            FileUtil.writeString(render, new File(formatOutPath(PLUGIN_JAVA_TPL.get(key), contextMap)), StandardCharsets.UTF_8);
        }
        if (contextMap.get("hasSetting").equals(true)) {
            String render = templateEngine.getTemplate("pluginTpl/src/main/resources/setting.vm").render(contextMap);
            FileUtil.writeString(render, new File(formatOutPath("perfree-plugins/${pluginId}/src/main/resources/setting.json", contextMap)), StandardCharsets.UTF_8);
        }
        if (contextMap.get("hasAdminUi").equals(true)) {
            for (String key : PLUGIN_UI_TPL.keySet()) {
                String render = templateEngine.getTemplate(key).render(contextMap);
                FileUtil.writeString(render, new File(formatOutPath(PLUGIN_UI_TPL.get(key), contextMap)), StandardCharsets.UTF_8);
            }
        }
    }

    private static String formatOutPath( String filePath, Map<String, Object> contextMap) {
        filePath = StrUtil.replace(filePath, "${pluginId}", contextMap.get("pluginId").toString());
        filePath = StrUtil.replace(filePath, "${package}", contextMap.get("package").toString().replaceAll("\\.", "/"));
        return filePath;
    }
}


package com.perfree.plugin;

import com.perfree.plugin.commons.PluginCreateEngine;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * 快速创建插件工具类
 */
@Slf4j
public class CreatePlugin {

    public static void main(String[] args) {
        Map<String, Object> contextMap = new HashMap<>();

        // ---------------------填写插件信息--------------------------------------

        // 插件id
        contextMap.put("pluginId", "perfree-plugin-random-img");
        // 插件名称
        contextMap.put("pluginName", "随机图插件");
        // 插件描述
        contextMap.put("pluginDesc", "一款简易的随机图插件");
        // 插件最低支持版本,低于这个版本的系统不能安装
        contextMap.put("pluginMinimalVersion", "4.0.0");
        // 插件版本
        contextMap.put("pluginVersion", "1.0.0");
        // 包名
        contextMap.put("package", "com.random");
        // 是否有设置页面
        contextMap.put("hasSetting", false);
        // 是否有后台管理前端界面
        contextMap.put("hasAdminUi", true);

        // 作者
        contextMap.put("author", "perfree");
        // 作者邮箱
        contextMap.put("email", "perfree@126.com");
        // 作者网站
        contextMap.put("webSite", "https://yinpengfei.com");

        // ---------------------填写插件信息结束-----------------------------------
        log.info("开始生成插件模板...");
        PluginCreateEngine.genPlugin(contextMap);
        log.info("插件模板生成完毕,请在perfree-plugins模块中查看");
    }


}

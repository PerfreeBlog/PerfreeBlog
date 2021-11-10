package com.perfree.plugin;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @description plugin AnnotationConfigApplicationContext holder
 * @author Perfree
 * @date 2021/11/9 14:25
 */
public abstract class PluginApplicationContextHolder {

	private final static Map<String, AnnotationConfigApplicationContext> pluginApplicationMap = new ConcurrentHashMap<>();

	public static void addPluginApplicationContext(String pluginId, AnnotationConfigApplicationContext applicationContext) {
		pluginApplicationMap.put(pluginId, applicationContext);
	}

	public static void removePluginApplicationContext(String pluginId) {
		pluginApplicationMap.remove(pluginId);
	}

	public static AnnotationConfigApplicationContext getApplicationContext(String pluginId) {
		return pluginApplicationMap.get(pluginId);
	}

}

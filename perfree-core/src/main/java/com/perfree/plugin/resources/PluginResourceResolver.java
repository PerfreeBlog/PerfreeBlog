package com.perfree.plugin.resources;

import com.perfree.commons.Constants;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.AbstractResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;

/**
 * @description 插件静态资源渲染
 * @author Perfree
 * @date 2021/11/9 14:20
 */
public class PluginResourceResolver extends AbstractResourceResolver {
    private final static Logger LOGGER = LoggerFactory.getLogger(PluginResourceResolver.class);


    @Override
    protected Resource resolveResourceInternal(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        int startOffset = (requestPath.startsWith("/") ? 1 : 0);
        int endOffset = requestPath.indexOf('/', 1);
        if (endOffset != -1) {
            String pluginId = requestPath.substring(startOffset, endOffset);
            String partialPath = requestPath.substring(endOffset + 1);
            PluginInfo plugin = PluginHolder.getPlugin(pluginId);

            if (plugin == null){
                return null;
            }

            // 从插件内置文件路径获取资源
            Resource resource = resolveClassPathFile(plugin, partialPath);
            if(resource != null){
                return resource;
            }

            // 从外置文件路径获取资源
            resource = resolveFilePath(plugin, partialPath);
            if(resource != null){
                return resource;
            }
            return null;

        }
        return chain.resolveResource(request, requestPath, locations);
    }

    @Override
    protected String resolveUrlPathInternal(String resourceUrlPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return null;
    }


    /**
     * 解决插件中配置的绝对文件路径的文件资源。也就是插件中定义的  file:D://xx/xx/ 配置
     * @param plugin 插件配置Bean
     * @param partialPath 部分路径
     * @return 资源。没有发现则返回null
     */
    private Resource resolveFilePath(PluginInfo plugin, String partialPath) {
        Set<String> filePaths = plugin.getStaticFileLocations();
        if(filePaths == null || filePaths.isEmpty()){
            return null;
        }

        for (String filePath : filePaths) {
            Path fullPath = Paths.get(filePath + partialPath);
            if(!Files.exists(fullPath)){
                continue;
            }
            try {
                FileUrlResource fileUrlResource = new FileUrlResource(fullPath.toString());
                if(fileUrlResource.exists()){
                    return fileUrlResource;
                }
            } catch (Exception e) {
                LOGGER.debug("Get static resources of path '{}' error.", fullPath, e);
            }
        }
        return null;
    }

    /**
     * @description 从pluginResources获取插件文件(classpath原文件已解压至pluginResources文件夹)
     * @author Perfree
     * @date 2021/11/13 11:13
     */
    private Resource resolveClassPathFile(PluginInfo plugin, String partialPath) {
        Set<String> filePaths = plugin.getStaticClassPathLocations();
        if(filePaths == null || filePaths.isEmpty()){
            return null;
        }

        for (String filePath : filePaths) {
            Path fullPath = Paths.get(Constants.PLUGINS_RESOURCES_DIR+ File.separator + plugin.getPluginId() +
                    File.separator + filePath + partialPath);
            if(!Files.exists(fullPath)){
                continue;
            }
            try {
                FileUrlResource fileUrlResource = new FileUrlResource(fullPath.toString());
                if(fileUrlResource.exists()){
                    return fileUrlResource;
                }
            } catch (Exception e) {
                LOGGER.debug("Get static resources of path '{}' error.", fullPath, e);
            }
        }
        return null;
    }
}

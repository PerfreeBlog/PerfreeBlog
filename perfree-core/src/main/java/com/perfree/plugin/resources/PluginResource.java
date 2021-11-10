package com.perfree.plugin.resources;

import com.perfree.plugin.PluginInfo;
import org.springframework.core.NestedIOException;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;

/**
 * @description 自定义Resource
 * @author Perfree
 * @date 2021/11/9 14:21
 */
public class PluginResource implements Resource {
    private ClassLoader classLoader;
    private final PluginInfo plugin;

    private final String path;

    public PluginResource(String path, PluginInfo plugin) {
        this.classLoader = plugin.getPluginWrapper().getPluginClassLoader();
        this.plugin = plugin;
        String pathToUse = StringUtils.cleanPath(path);
        if (pathToUse.startsWith("/")) {
            pathToUse = pathToUse.substring(1);
        }
        this.path = pathToUse;
    }

    public void setClassLoader(ClassLoader classLoader) {
        this.classLoader = classLoader;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return classLoader.getResourceAsStream(path);
    }


    @Override
    public long contentLength() throws IOException {
        URL url = getURL();
        if (ResourceUtils.isFileURL(url)) {
            return getFile().length();
        }
        if(ResourceUtils.isJarURL(url)){
            URLConnection con = getURL().openConnection();
            return con.getContentLength();
        }
        return 0L;
    }

    @Override
    public long lastModified() throws IOException {
        return 0;
    }


    @Override
    public Resource createRelative(String relativePath) {
        throw new RuntimeException("This method is not supported");
    }

    @Override
    public String getFilename() {
        return StringUtils.getFilename(this.path);
    }

    @Override
    public String getDescription() {
        return plugin.getPluginWrapper().getDescriptor().getPluginDescription();
    }

    @Override
    public boolean exists() {
        try {
            URL url = getURL();
            if(url == null){
                return false;
            }
            if (ResourceUtils.isFileURL(url)) {
                return getFile().exists();
            }
            if (contentLength() >= 0) {
                return true;
            }
            InputStream is = getInputStream();
            is.close();
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean isReadable() {
        try {
            URL url = getURL();
            if (ResourceUtils.isFileURL(url)) {
                File file = getFile();
                return (file.canRead() && !file.isDirectory());
            } else {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean isOpen() {
        return false;
    }



    @Override
    public File getFile() throws IOException {
        URL url = getURL();
        if (ResourceUtils.isJarURL(url)) {
            URL actualUrl = ResourceUtils.extractArchiveURL(url);
            return ResourceUtils.getFile(actualUrl, "Jar URL");
        } else {
            return ResourceUtils.getFile(url, getDescription());
        }
    }

    @Override
    public URL getURL() throws IOException {
        return classLoader.getResource(path);
    }

    @Override
    public URI getURI() throws IOException {
        URL url = getURL();
        try {
            return ResourceUtils.toURI(url);
        } catch (URISyntaxException ex) {
            throw new NestedIOException("Invalid URI [" + url + "]", ex);
        }
    }

}

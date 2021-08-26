package com.perfree.config;

import com.jfinal.template.EngineConfig;
import com.jfinal.template.source.ISource;
import com.perfree.commons.SpringBeanUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

/**
 * 自定义模板资源ISource
 * Custom Template ISource
 *
 * @author Perfree
 */
public class CustomClassPathSource implements ISource {
    protected String finalFileName;
    protected String fileName;
    protected String encoding;

    protected boolean isInJar;
    protected long lastModified;
    protected ClassLoader classLoader;
    protected URL url;

    public CustomClassPathSource(String fileName) {
        this(null, fileName, EngineConfig.DEFAULT_ENCODING);
    }

    public CustomClassPathSource(String baseTemplatePath, String fileName) {
        this(baseTemplatePath, fileName, EngineConfig.DEFAULT_ENCODING);
    }

    public CustomClassPathSource(String baseTemplatePath, String fileName, String encoding) {
        try {
            HttpServletRequest request =((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            RequestMappingHandlerMapping handlerMapping = SpringBeanUtils.getBean(RequestMappingHandlerMapping.class);
            HandlerExecutionChain handlerChain = handlerMapping.getHandler(request);
            if (handlerChain == null) {
                throw new IllegalArgumentException("File not found in CLASSPATH or JAR : \"" + finalFileName + "\"");
            }
            HandlerMethod handler = (HandlerMethod) handlerChain.getHandler();
            Object bean = handler.getBean();
            this.finalFileName = buildFinalFileName(baseTemplatePath, fileName);
            this.fileName = fileName;
            this.encoding= encoding;
            this.classLoader = bean.getClass().getClassLoader();
            this.url = this.classLoader.getResource(finalFileName);
            if (url != null) {
                processIsInJarAndlastModified();
                return;
            }
            throw new IllegalArgumentException("File not found in CLASSPATH or JAR : \"" + finalFileName + "\"");
        } catch (Exception e) {
            throw new IllegalArgumentException("File not found in CLASSPATH or JAR : \"" + finalFileName + "\"");
        }
    }

    protected void processIsInJarAndlastModified() {
        if ("file".equalsIgnoreCase(url.getProtocol())) {
            isInJar = false;
            lastModified = new File(url.getFile()).lastModified();
        } else {
            isInJar = true;
            lastModified = -1;
        }
    }

    protected ClassLoader getClassLoader() {
        ClassLoader ret = Thread.currentThread().getContextClassLoader();
        return ret != null ? ret : getClass().getClassLoader();
    }

    protected String buildFinalFileName(String baseTemplatePath, String fileName) {
        String finalFileName;
        if (baseTemplatePath != null) {
            char firstChar = fileName.charAt(0);
            if (firstChar == '/' || firstChar == '\\') {
                finalFileName = baseTemplatePath + fileName;
            } else {
                finalFileName = baseTemplatePath + "/" + fileName;
            }
        } else {
            finalFileName = fileName;
        }

        if (finalFileName.charAt(0) == '/') {
            finalFileName = finalFileName.substring(1);
        }
        return finalFileName;
    }

    public String getCacheKey() {
        return fileName;
    }

    public String getEncoding() {
        return encoding;
    }

    protected long getLastModified() {
        return new File(url.getFile()).lastModified();
    }

    /**
     * 模板文件在 jar 包文件之内则不支持热加载
     */
    public boolean isModified() {
        return !isInJar && lastModified != getLastModified();
    }

    public StringBuilder getContent() {
        if (!isInJar) {
            lastModified = getLastModified();
        }
        InputStream inputStream = classLoader.getResourceAsStream(finalFileName);
        if (inputStream == null) {
            throw new RuntimeException("File not found : \"" + finalFileName + "\"");
        }
        return loadFile(inputStream, encoding);
    }

    public static StringBuilder loadFile(InputStream inputStream, String encoding) {
        StringBuilder ret = new StringBuilder();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, encoding))) {
            String line = br.readLine();
            if (line != null) {
                ret.append(line);
            } else {
                return ret;
            }

            while ((line=br.readLine()) != null) {
                ret.append('\n').append(line);
            }
            return ret;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String toString() {
        return "In Jar File: " + isInJar + "\n" +
                "File name: " + fileName + "\n" +
                "Final file name: " + finalFileName + "\n" +
                "Last modified: " + lastModified + "\n";
    }
}

package com.perfree;

import cn.hutool.core.io.FileUtil;
import com.perfree.commons.Constants;
import com.perfree.config.UniqueNameGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;

import java.io.File;
import java.util.Arrays;

@SpringBootApplication
@ComponentScan(nameGenerator = UniqueNameGenerator.class)
@EnableAsync
@EnableAspectJAutoProxy
public class Application implements CommandLineRunner {
    private final static Logger LOGGER = LoggerFactory.getLogger(Application.class);
    @Value("${server.port}")
    private int serverPort;

    public static void main(String[] args){
        boolean isDocker = Arrays.asList(args).contains(Constants.IS_DOCKER);
        if (isDocker) {
            updateDockerResources();
        }
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        LOGGER.info("--------------------启动成功------------------------");
        LOGGER.info("--------------------访问端口{}---------------------", serverPort);
    }

    /**
     * @description  更新docker资源文件
     * @author Perfree
     */
    private static void updateDockerResources(){
        File appFile = new File("/app");
        if (!appFile.exists() || !appFile.isDirectory()){
            return;
        }
        File[] files = appFile.listFiles();
        if (files == null || files.length <= 0) {
            return;
        }
        File resourcesFile = new File("/");
        for (File file : files) {
            if (!file.getName().equals("perfree-web.jar")) {
                FileUtil.copy(file.getAbsolutePath(), resourcesFile.getAbsolutePath(), true);
            }
        }
        FileUtil.del(appFile.getAbsolutePath());
    }
}

package com.perfree;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure;
import com.perfree.config.UniqueNameGenerator;
import com.perfree.plugins.PluginsUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = { DruidDataSourceAutoConfigure.class})
@ComponentScan(nameGenerator = UniqueNameGenerator.class)
public class Application{
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        /*new PluginsUtil().initPlugins();*/
    }
}

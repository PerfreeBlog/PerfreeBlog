package com.perfree.config;

import com.gitee.starblues.annotation.ConfigDefinition;
import com.gitee.starblues.extension.mybatis.SpringBootMybatisConfig;

import java.util.HashSet;
import java.util.Set;

/**
 * 扩展插件,mybatis配置示例
 * 提示: 插件mapper文件目录需采用插件id方式命名,避免重复,否则会出现问题
 */
@ConfigDefinition
public class MybatisConfig implements SpringBootMybatisConfig {
    @Override
    public Set<String> entityPackage() {
        Set<String> typeAliasesPackage = new HashSet<>();
        typeAliasesPackage.add("com.perfree.model");
        return typeAliasesPackage;
    }

    @Override
    public Set<String> xmlLocationsMatch() {
        Set<String> xmlLocationsMatch = new HashSet<>();
        xmlLocationsMatch.add("classpath:AccessLogMapper/*Mapper.xml");
        return xmlLocationsMatch;
    }
}

package com.exam.config;

import com.gitee.starblues.annotation.ConfigDefinition;
import com.gitee.starblues.extension.mybatis.SpringBootMybatisConfig;

import java.util.HashSet;
import java.util.Set;

@ConfigDefinition
public class MybatisConfig implements SpringBootMybatisConfig {
    @Override
    public Set<String> entityPackage() {
        Set<String> typeAliasesPackage = new HashSet<>();
        typeAliasesPackage.add("com.exam.model");
        return typeAliasesPackage;
    }

    @Override
    public Set<String> xmlLocationsMatch() {
        Set<String> xmlLocationsMatch = new HashSet<>();
        xmlLocationsMatch.add("classpath:examMapper/*Mapper.xml");
        return xmlLocationsMatch;
    }
}

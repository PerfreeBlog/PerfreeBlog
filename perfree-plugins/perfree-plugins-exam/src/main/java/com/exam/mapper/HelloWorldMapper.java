package com.exam.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

/**
 * @description 扩展插件: Mapper示例,tips: 暂时只支持注解方式写sql
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Mapper
@Component
public interface HelloWorldMapper{
    @Select("select count(1) from `p_article`")
    String test2();
}

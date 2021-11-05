package com.exam.mapper;

import com.exam.model.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @description 扩展插件: Mapper示例
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Mapper
public interface HelloWorldMapper{
    List<Article> test2();
}

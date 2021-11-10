package com.exam.mapper;

import com.exam.model.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @description 插件示例: Mapper
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Mapper
public interface HelloWorldMapper{

    /**
     * @description 查询所有文章
     * @return java.util.List<com.exam.model.Article>
     * @author Perfree
     */
    List<Article> testQueryArticle();
}

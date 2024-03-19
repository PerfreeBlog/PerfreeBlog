package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import com.exam.model.Article;
import com.perfree.commons.SpringBeanUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description 插件示例: Service
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Service
public class HelloWorldService{

    @Resource
    private HelloWorldMapper helloWorldMapper;

    /**
     * @description 查询所有文章
     * @return java.util.List<com.exam.model.Article>
     * @author Perfree
     */
    public List<Article> testQueryArticle() {
        return helloWorldMapper.testQueryArticle();
    }
}

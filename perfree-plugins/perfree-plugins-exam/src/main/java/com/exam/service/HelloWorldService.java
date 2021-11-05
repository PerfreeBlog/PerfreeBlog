package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import com.exam.model.Article;
import com.perfree.commons.SpringBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description 扩展插件: Service示例
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Service
public class HelloWorldService{

    @Autowired
    private HelloWorldMapper helloWorldMapper;

    public List<Article> test2() {
        return helloWorldMapper.test2();
    }

}

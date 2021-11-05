package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import com.exam.model.Article;
import com.perfree.commons.SpringBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description 扩展插件: Service示例,tips: 因个人能力有限,此处注入mapper的方式为手动
 * 获取bean,使用@Autowired会造成报错, 欢迎能帮忙解决的大佬提交pr
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

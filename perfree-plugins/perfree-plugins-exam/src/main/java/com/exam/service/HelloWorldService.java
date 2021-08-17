package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import com.perfree.commons.SpringBeanUtils;
import org.springframework.stereotype.Service;

/**
 * @description 扩展插件: Service示例,tips: 因个人能力有限,此处注入mapper的方式为手动
 * 获取bean,使用@Autowired会造成报错, 欢迎能帮忙解决的大佬提交pr
 * @author Perfree
 * @date 2021/8/17 15:08
 */
@Service
public class HelloWorldService{

    private final HelloWorldMapper helloWorldMapper;

    /**
     * @description 注入mapper
     * @author Perfree
     */
    HelloWorldService() {
        helloWorldMapper = SpringBeanUtils.getMapper(HelloWorldMapper.class);
    }

    public String test2() {
        return "插件测试-查询数据库文章数量结果: " + helloWorldMapper.test2();
    }

}

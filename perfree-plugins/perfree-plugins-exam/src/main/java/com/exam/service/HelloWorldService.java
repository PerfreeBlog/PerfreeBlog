package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import com.perfree.plugins.PluginService;
import org.springframework.beans.factory.annotation.Autowired;

public class HelloWorldService extends PluginService {

    @Autowired
    private HelloWorldMapper helloWorldMapper;

    public String index() {
        return helloWorldMapper.index();
    }

    public String index2() {
        return helloWorldMapper.index2();
    }

}

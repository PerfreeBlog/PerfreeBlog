package com.exam.service;

import com.exam.mapper.HelloWorldMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelloWorldService {

    @Autowired
    private HelloWorldMapper helloWorldMapper;

    public String index() {
        return helloWorldMapper.index();
    }
}

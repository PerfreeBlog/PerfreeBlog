package com.exam.service;

import org.springframework.stereotype.Service;

@Service
public class HelloWorldService{

 /*  @Autowired
   private HelloWorldMapper helloWorldMapper;*/


    public String index() {
        return "插件:helloWorld";
    }

    public String index2() {
        return "插件:helloWorld2";
    }

}

package com.access.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AccessLogsController {

    @RequestMapping("/plugin/access")
    public String index(){
        return "/static-access/index.html";
    }
}

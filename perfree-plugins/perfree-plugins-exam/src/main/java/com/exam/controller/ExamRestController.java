package com.exam.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description 示例插件: RestController
 * @author Perfree
 * @date 2021/11/10 9:47
 */
@RestController
public class ExamRestController {

    /**
     * @description rest接口演示
     * @return java.lang.String
     * @author Perfree
     */
    @GetMapping("/plugin/testRest")
    public String testRest () {
        return "success";
    }
}

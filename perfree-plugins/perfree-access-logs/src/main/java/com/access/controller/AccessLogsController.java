package com.access.controller;

import com.access.service.AccessLogsService;
import com.perfree.common.ResponseBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

@Controller
public class AccessLogsController {

    @Autowired
    private AccessLogsService accessLogsService;

    @RequestMapping("/plugin/access")
    public String index(){
        return "/static-access/index.html";
    }

    @RequestMapping("/plugin/access/getAccessCountByWeek")
    @ResponseBody
    public ResponseBean getAccessCountByWeek() {
        HashMap<String, List<Object>> result = accessLogsService.getAccessCountByWeek();
        return ResponseBean.success("", result);
    }
}

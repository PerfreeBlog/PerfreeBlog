package com.access.controller;

import com.access.model.AccessLogs;
import com.access.service.AccessLogsService;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AccessLogsController {

    @Resource
    private AccessLogsService accessLogsService;

    @RequestMapping("/plugin/access")
    public String index(){
        return "/access-static/index.html";
    }

    @RequestMapping("/plugin/access/getAccessCountByWeek")
    @ResponseBody
    public ResponseBean getAccessCountByWeek() {
        HashMap<String, List<Object>> result = accessLogsService.getAccessCountByWeek();
        return ResponseBean.success("", result);
    }

    @RequestMapping("/plugin/access/getAccessCountBySysGroup")
    @ResponseBody
    public ResponseBean getAccessCountBySysGroup() {
        return ResponseBean.success("", accessLogsService.getAccessCountBySysGroup());
    }

    @RequestMapping("/plugin/access/list")
    @ResponseBody
    public Pager<AccessLogs> list(@RequestBody Pager<AccessLogs> pager) {
        return accessLogsService.list(pager);
    }
}

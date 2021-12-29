package com.access.controller;

import com.access.model.AccessLogs;
import com.access.service.AccessLogsService;
import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.permission.AdminMenu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AccessLogsController {

    @Autowired
    private AccessLogsService accessLogsService;

    @RequestMapping("/plugin/access")
    @AdminMenu(groupId = Constants.ADMIN_MENU_GROUP_PLUGIN, name = "访问统计")
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

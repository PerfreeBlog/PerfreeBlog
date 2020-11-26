package com.perfree.controller.admin;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Option;
import com.perfree.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class SettingController extends BaseController {

    @Autowired
    private OptionService optionService;

    @GetMapping("/setting")
    public String index() {
        return "admin/pages/settings/setting";
    }


    @PostMapping("/setting/save")
    @ResponseBody
    public ResponseBean saveSetting(@RequestBody HashMap<String, String> param) {
        List<Option> options = new ArrayList<>();
        for(Map.Entry<String, String> entry : param.entrySet()){
            Option option = new Option();
            option.setKey(entry.getKey());
            option.setValue(entry.getValue());
            options.add(option);
        }
        if (optionService.addOrUpdateOptions(options) > 0) {
            return ResponseBean.success("保存成功", null);
        }
        return ResponseBean.fail("保存失败", null);
    }
}

package com.perfree.controller.admin;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.util.CharsetUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Option;
import com.perfree.permission.AdminMenu;
import com.perfree.service.MailService;
import com.perfree.service.OptionService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class SettingController extends BaseController {

    @Autowired
    private OptionService optionService;

    @Autowired
    private MailService mailService;

    @GetMapping("/setting")
    @AdminMenu(name = "网站设置", seq = 1, groupId = Constants.ADMIN_MENU_GROUP_SETTING)
    public String index(Model model) {
        model.addAttribute("findPasswordEmailTemplate",getEmailTpl("/static/admin/tpl/find_password.html"));
        model.addAttribute("commentEmailTemplate",getEmailTpl("/static/admin/tpl/comment_mail.html"));
        return view("static/admin/pages/settings/setting.html");
    }


    /**
     * 保存设置信息
     * @param param param
     * @return ResponseBean
     */
    @PostMapping("/setting/save")
    @ResponseBody
    public ResponseBean saveSetting(@RequestBody HashMap<String, String> param) {
        List<Option> options = new ArrayList<>();
        for(Map.Entry<String, String> entry : param.entrySet()){
            if (entry.getKey().equals("commentEmailTemplate")) {
                updateEmailTpl("/static/admin/tpl/comment_mail.html", entry.getValue());
                continue;
            }
            if (entry.getKey().equals("findPasswordEmailTemplate")) {
                updateEmailTpl("/static/admin/tpl/find_password.html", entry.getValue());
                continue;
            }
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

    /**
     * 发送测试邮件
     * @param mail mail
     * @return ResponseBean
     */
    @PostMapping("/setting/testMail")
    @ResponseBody
    public ResponseBean testMail(String mail) {
        try{
            if (mailService.sendMail(mail, "这是一封测试邮件~", "来自["+ OptionCacheUtil.getValue("WEB_NAME")+"]站点的新消息")) {
                return ResponseBean.success("发送成功", null);
            }
            return ResponseBean.fail("发送失败", null);
        }catch (Exception e) {
            return ResponseBean.fail("邮箱服务出错,发送失败:"+ e.getMessage(), null);
        }
    }

    private String getEmailTpl(String path){
        File file = new File(Constants.PROD_RESOURCES_PATH + path);
        if (!file.exists()) {
            file = FileUtil.getClassPathFile(Constants.DEV_RESOURCES_PATH + path);
        }
        assert file != null;
        FileReader fileReader = new FileReader(file.getAbsolutePath());
        return fileReader.readString();
    }

    private void updateEmailTpl(String path, String content){
        try{
            File file = new File(Constants.PROD_RESOURCES_PATH + path);
            if (!file.exists()) {
                file = FileUtil.getClassPathFile(Constants.DEV_RESOURCES_PATH + path);
            }
            assert file != null;
            OutputStreamWriter write = new OutputStreamWriter(new FileOutputStream(file.getAbsoluteFile()), StandardCharsets.UTF_8);
            BufferedWriter writer = new BufferedWriter(write);
            writer.write(content);
            writer.flush();
            writer.close();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}

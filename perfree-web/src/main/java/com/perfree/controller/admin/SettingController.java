package com.perfree.controller.admin;

import cn.hutool.core.io.file.FileReader;
import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Option;
import com.perfree.service.MailService;
import com.perfree.service.OptionService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
// @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class SettingController extends BaseController {

    @Resource
    private OptionService optionService;

    @Resource
    private MailService mailService;

    @GetMapping("/setting")
    public String index(Model model) {
        return view("static/admin/pages/settings/setting.html");
    }

    /**
     * 邮件模板设置
     */
    @GetMapping("/emailSetting")
    public String emailSetting(Model model) {
        List<HashMap<String, String>> param = new ArrayList<>();

        HashMap<String, String> comment = new HashMap<>();
        comment.put("path", "/static/admin/tpl/comment_mail.html");
        comment.put("name", "评论邮件模板");
        param.add(comment);

        HashMap<String, String> findPassword = new HashMap<>();
        findPassword.put("path", "/static/admin/tpl/find_password.html");
        findPassword.put("name", "找回密码邮件模板");
        param.add(findPassword);

        model.addAttribute("templates", param);
        return view("static/admin/pages/settings/email_setting.html");
    }

    /**
     * 获取邮件模板文件内容
     */
    @PostMapping("/emailSetting/getFileContent")
    @ResponseBody
    public ResponseBean getFileContent(@RequestParam("path") String path){
        return ResponseBean.success("数据加载成功", getEmailTpl(path));
    }

    /**
     * 保存邮件模板
     */
    @PostMapping("/emailSetting/saveFileContent")
    @ResponseBody
    public ResponseBean saveFileContent(@RequestParam("path") String path, @RequestParam("content") String content){
        updateEmailTpl(path, content);
        return ResponseBean.success("文件保存成功", null);
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

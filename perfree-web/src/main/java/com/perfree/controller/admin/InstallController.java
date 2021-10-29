package com.perfree.controller.admin;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.setting.dialect.Props;
import com.perfree.common.Constants;
import com.perfree.common.GravatarUtil;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Database;
import com.perfree.model.User;
import com.perfree.service.InstallService;
import com.perfree.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.io.File;

@Controller
public class InstallController extends BaseController {
    private final static Logger LOGGER = LoggerFactory.getLogger(InstallController.class);
    @Autowired
    private InstallService installService;

    @Autowired
    private UserService userService;

    @RequestMapping("/install")
    public String installPage() {
        String installStatus = getInstallStatus();
        if (StringUtils.isNotBlank(installStatus)) {
            return "redirect:/404";
        }
        return view("static/admin/pages/install/install.html");
    }

    @RequestMapping("/install/step2")
    public String installStep2Page() {
        String installStatus = getInstallStatus();
        if (StringUtils.isNotBlank(installStatus)) {
            return "redirect:/404";
        }
        return view("static/admin/pages/install/install-step2.html");
    }

    @RequestMapping("/install/step3")
    public String installStep3Page() {
        String installStatus = getInstallStatus();
        if (StringUtils.isNotBlank(installStatus) && installStatus.equals("success")) {
            return "redirect:/404";
        }
        return view("static/admin/pages/install/install-step3.html");
    }

    @RequestMapping("/install/addDatabase")
    @ResponseBody
    public ResponseBean addDatabase(@RequestBody @Valid Database database) {
        if (database.getType().equals("mysql")) {
            if (StringUtils.isBlank(database.getAddress()) || StringUtils.isBlank(database.getUserName()) ||
                StringUtils.isBlank(database.getPassword()) || StringUtils.isBlank(database.getPort())) {
                return ResponseBean.fail("请完整填写数据库信息", null);
            }
        }
        try {
            String installStatus = getInstallStatus();
            if (StringUtils.isNotBlank(installStatus)) {
                return ResponseBean.fail("数据库信息已配置,请勿重复配置", null);
            }
            if (installService.addDatabase(database)) {
                return ResponseBean.success("配置成功", null);
            }
            return ResponseBean.error(-1, "数据库已存在", null);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error(e.getMessage());
            return ResponseBean.fail("数据库连接或创建数据库失败", e.getMessage());
        }
    }

    @RequestMapping("/install/addAdminUser")
    @ResponseBody
    public ResponseBean addAdminUser(@RequestBody User user) {
        String installStatus = getInstallStatus();
        if (StringUtils.isNotBlank(installStatus) && installStatus.equals("success")) {
            return ResponseBean.fail("安装程序已完成,请在后台手动添加用户", null);
        }
        user.setUserName(user.getAccount());
        user.setRoleId(1L);
        user.setStatus(0);
        user.setAvatar(GravatarUtil.getGravatar(user.getEmail()));
        if (StringUtils.isBlank(user.getPassword()) || user.getPassword().length() < 6 || user.getPassword().length() > 18){
            return ResponseBean.fail("密码不能为空且在6-18字符之间", null);
        }
        if (userService.getUserByAccount(user.getAccount()) != null){
            return ResponseBean.fail("账户已存在", null);
        }
        if (userService.add(user) > 0) {
            File file = new File(Constants.DB_PROPERTIES_PATH);
            Props setting = new Props(FileUtil.touch(file), CharsetUtil.CHARSET_UTF_8);
            setting.setProperty("installStatus","success");
            setting.store(file.getAbsolutePath());
            return ResponseBean.success("账户创建成功", null);
        }
        return ResponseBean.fail("账户创建失败", null);
    }

}

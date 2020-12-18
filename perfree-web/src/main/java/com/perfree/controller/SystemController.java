package com.perfree.controller;

import com.perfree.common.Constants;
import com.perfree.common.ResponseBean;
import com.perfree.model.Menu;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;

/**
 * 控制首页地址
 */
@Controller
public class SystemController extends BaseController{
    private final Logger logger = LoggerFactory.getLogger(SystemController.class);
    @Autowired
    private UserService userService;

    /**
     * 后台首页
     * @return String
     */
    @RequestMapping("/admin")
    @RequiresRoles(value={"admin","superAdmin"}, logical= Logical.OR)
    public String adminIndex(Model model) {
        List<Menu> menus = getMenuByUserIdAndType();
        model.addAttribute("menus", menus);
        model.addAttribute("user", getUser());
        return view("static/admin/pages/index.html");
    }

    /**
     * 前台首页
     * @return String
     */
    @RequestMapping("/")
    public String index() {
        return view(currentThemePage() + "/index.html");
    }

    /**
     * 登陆页
     * @return String
     */
    @RequestMapping("/login")
    public String login() {
        return view("/login.html", "/login.html", "static/admin/pages/login/login.html");
    }

    /**
     * 注册页
     * @return String
     */
    @RequestMapping("/register")
    public String register() {
        return view("/register.html", "/register.html", "static/admin/pages/register/register.html");
    }

    /**
     * 登录
     * @return ResponseBean
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doLogin")
    @ResponseBody
    public ResponseBean doLogin(User user,Boolean rememberMe, HttpSession session) {
        ResponseBean responseBean;
        if(rememberMe == null) {
            rememberMe = false;
        }
        try {
            UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(user.getAccount(),user.getPassword(),rememberMe);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);
            responseBean = new ResponseBean(ResponseBean.SUCCESS_CODE, "登录成功", null);
        }catch (IncorrectCredentialsException e) {
            responseBean = new ResponseBean(ResponseBean.ERROR_CODE, "密码错误", e.getMessage());
        }catch (UnknownAccountException e) {
            responseBean = new ResponseBean(ResponseBean.ERROR_CODE, "账户不存在", e.getMessage());
        }catch (Exception e) {
            responseBean = new ResponseBean(ResponseBean.ERROR_CODE, "系统异常", e.getMessage());
        }
        return responseBean;
    }

    /**
     * 退出登录
     * @return ResponseBean
     */
    @RequestMapping(method = RequestMethod.GET, path = "/logout")
    public String logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return view(currentThemePage() + "/index.html");
    }

    /**
     * 注册
     * @return ResponseBean
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doRegister")
    @ResponseBody
    public ResponseBean doRegister(@RequestBody @Valid User user) {
        if (StringUtils.isBlank(user.getPassword()) || user.getPassword().length() < 6 || user.getPassword().length() > 12){
            logger.error("密码不能为空且在6-12字符之间: {}", user.toString());
            return ResponseBean.fail("密码不能为空且在6-12字符之间", null);
        }
        if (userService.getUserByAccount(user.getAccount()) != null){
            logger.error("账户已存在: {}", user.toString());
            return ResponseBean.fail("账户已存在", null);
        }
        user.setStatus(0);
        user.setRoleId(2L);
        if (userService.add(user) > 0) {
            return ResponseBean.success("注册成功", null);
        }
        logger.error("注册失败: {}", user.toString());
        return ResponseBean.fail("注册失败", null);
    }
}

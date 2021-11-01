package com.perfree.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.core.util.RandomUtil;
import com.perfree.common.Constants;
import com.perfree.common.GravatarUtil;
import com.perfree.common.ResponseBean;
import com.perfree.common.StringUtil;
import com.perfree.commons.JwtUtils;
import com.perfree.commons.Update;
import com.perfree.model.Menu;
import com.perfree.model.Option;
import com.perfree.model.User;
import com.perfree.plugins.PluginBeanRegister;
import com.perfree.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 控制首页地址
 */
@Controller
@Api(tags = "用户操作模块API")
public class SystemController extends BaseController{
    private final Logger logger = LoggerFactory.getLogger(SystemController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private OptionService optionService;
    @Autowired
    private SEOService seoService;
    @Autowired
    private MailService mailService;
    @Autowired
    private PluginBeanRegister pluginBeanRegister;

    @Autowired
    private UpdateService updateService;

    /**
     * 后台首页
     * @return String
     */
    @RequestMapping("/admin")
    @RequiresRoles(value={"admin","editor","contribute", "user"}, logical= Logical.OR)
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
    public String index(Model model) {
        model.addAttribute("url", Constants.URL_ARTICLE_LIST);
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
     * 忘记密码
     * @return String
     */
    @RequestMapping("/restPassword")
    public String restPassword() {
        return view("/restPassword.html", "/restPassword.html", "static/admin/pages/restPassword/restPassword.html");
    }

    /**
     * 忘记密码
     * @return String
     */
    @RequestMapping("/restPasswordStep2")
    public String restPasswordStep2() {
        return view("/restPassword-step2.html", "/restPassword-step2.html", "static/admin/pages/restPassword/restPassword-step2.html");
    }

    /**
     * 登录
     * @return ResponseBean
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doLogin")
    @ResponseBody
    @ApiOperation(value = "登录")
    public ResponseBean doLogin(@RequestBody User user,Boolean rememberMe, HttpSession session, HttpServletResponse response) {
        if(rememberMe == null) {
            rememberMe = false;
        }
        try {
            if (StringUtils.isBlank(user.getCaptcha()) ||
                    !user.getCaptcha().toUpperCase().equals(session.getAttribute("CAPTCHA_CODE").toString())){
                return ResponseBean.fail("验证码错误", null);
            }
            UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(user.getAccount(),user.getPassword(),rememberMe);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);
            User userByAccount = userService.getUserByAccount(user.getAccount());
            String md5Hash = new Md5Hash(userByAccount.getPassword(), user.getSalt()).toString();
            String token = JwtUtils.sign(userByAccount.getAccount(), md5Hash);
            userByAccount.setPassword(null);
            userByAccount.setSalt(null);
            HashMap<String, Object> result = new HashMap<>();
            result.put("user", userByAccount);
            result.put("token", token);
            return ResponseBean.success("登录成功", result);
        }catch (IncorrectCredentialsException e) {
            return ResponseBean.fail("密码错误", e.getMessage());
        }catch (UnknownAccountException e) {
            return ResponseBean.fail("账户不存在", e.getMessage());
        }catch (Exception e) {
            return ResponseBean.fail("系统异常", e.getMessage());
        }
    }

    /**
     * @description  重置密码 step1
     * @return com.perfree.common.ResponseBean
     * @author Perfree
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doRestPassword")
    @ResponseBody
    public ResponseBean doRestPassword(@RequestBody User user, HttpSession session) {
        if (StringUtils.isBlank(user.getCaptcha()) ||
                !user.getCaptcha().toUpperCase().equals(session.getAttribute("CAPTCHA_CODE").toString())){
            return ResponseBean.fail("验证码错误", null);
        }
        User queryUser = userService.getUserByAccountAndEmail(user.getAccount(), user.getEmail());
        if (queryUser == null) {
            return ResponseBean.fail("账户不存在", null);
        }
        Object sessionRestPassword = session.getAttribute("REST-CAPTCHA");
        if (sessionRestPassword != null) {
            return ResponseBean.fail("邮件重复发送,请两分钟后再试", null);
        }
        try {
            String random = RandomUtil.randomString(6);
            mailService.passwordMail(user, random);
            session.setAttribute("REST-CAPTCHA", random);
            session.setAttribute("REST-ID", queryUser.getId());
            session.setMaxInactiveInterval(120);
            return ResponseBean.success("验证码发送成功", null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseBean.fail("发送邮件出错", e.getMessage());
        }
    }

    /**
     * @description  重置密码 step2
     * @return com.perfree.common.ResponseBean
     * @author Perfree
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doRestPasswordStep2")
    @ResponseBody
    public ResponseBean doRestPasswordStep2(@RequestBody User user, HttpSession session) {
        Object sessionRestPassword = session.getAttribute("REST-CAPTCHA");
        Object sessionRestID = session.getAttribute("REST-ID");
        if (sessionRestPassword == null || sessionRestID == null) {
            return ResponseBean.fail("验证码已过期", null);
        }
        if (StringUtils.isBlank(user.getCaptcha()) ||
                !user.getCaptcha().equals(sessionRestPassword.toString())){
            return ResponseBean.fail("验证码错误", null);
        }
        User byId = userService.getById(sessionRestID.toString());
        byId.setSalt(StringUtil.getUUID());
        byId.setPassword(new Md5Hash(user.getPassword(), user.getSalt()).toString());
        byId.setUpdateTime(new Date());
        int update = userService.update(byId);
        if (update > 0) {
            return ResponseBean.success("密码修改成功", null);
        }
        return ResponseBean.fail("密码修改失败", null);
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
    public ResponseBean doRegister(@RequestBody @Valid User user, HttpSession session) {
        Option optionByKey = optionService.getOptionByKey(Constants.OPTION_WEB_IS_REGISTER);
        if (optionByKey != null && optionByKey.getValue().equals(String.valueOf(Constants.REGISTER_NO))) {
            return ResponseBean.fail("网站已关闭注册功能", null);
        }
        if (StringUtils.isBlank(user.getCaptcha()) ||
                !user.getCaptcha().toUpperCase().equals(session.getAttribute("CAPTCHA_CODE").toString())){
            return ResponseBean.fail("验证码错误", null);
        }
        if (StringUtils.isBlank(user.getPassword()) || user.getPassword().length() < 6 ||
                user.getPassword().length() > 18){
            logger.error("密码不能为空且在6-18字符之间: {}", user.toString());
            return ResponseBean.fail("密码不能为空且在6-18字符之间", null);
        }
        if (userService.getUserByAccount(user.getAccount()) != null){
            logger.error("账户已存在: {}", user.toString());
            return ResponseBean.fail("账户已存在", null);
        }
        user.setStatus(0);
        user.setRoleId(2L);
        user.setAvatar(GravatarUtil.getGravatar(user.getEmail()));
        if (userService.add(user) > 0) {
            return ResponseBean.success("注册成功", null);
        }
        logger.error("注册失败: {}", user.toString());
        return ResponseBean.fail("注册失败", null);
    }

    /**
     * 验证码
     */
    @RequestMapping(method = RequestMethod.GET, path = "/captcha")
    public void captcha(String d,HttpSession session, HttpServletResponse response) throws IOException {
        if (StringUtils.isBlank(d)){
            response.sendRedirect("/captcha?d="+ Math.random() );
            return;
        }
        LineCaptcha lineCaptcha = CaptchaUtil.createLineCaptcha(200, 100,4,4);
        try {
            session.setAttribute("CAPTCHA_CODE", lineCaptcha.getCode().toUpperCase());
            response.setContentType("image/png");
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            lineCaptcha.write(response.getOutputStream());
        }catch (Exception e){
            e.printStackTrace();
            logger.error("验证码生成失败: {}", e.getMessage());
        }
    }

    @GetMapping("/robots.txt")
    public void robotsTxt(HttpServletResponse response) throws IOException {
        Writer writer = response.getWriter();
        String lineSeparator = System.getProperty("line.separator", "\n");
        writer.append("User-agent: *").append(lineSeparator);
        writer.append("Disallow:").append("/admin/*").append(lineSeparator);
    }

    @GetMapping("/sitemap.xml")
    public void createSiteMapXml(HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.APPLICATION_XML_VALUE);
        Writer writer = response.getWriter();
        writer.append(seoService.createSiteMapXmlContent());
    }

    /**
     * @description 检查更新
     * @author Perfree
     * @date 2021/11/1 10:10
     */
    @GetMapping("/checkUpdate")
    @ResponseBody
    public ResponseBean checkUpdate() {
        try{
            Update update = updateService.checkUpdate();
            if (update != null) {
                return ResponseBean.success("检测到更新", update);
            }
            return ResponseBean.error(-1,"暂无更新", null);
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("检查更新出错:{}", e.getMessage());
            return ResponseBean.fail("检查更新出错", null);
        }
    }

    @GetMapping("/qwer")
    @ResponseBody
    public Update qwer() {
        Update update = updateService.checkUpdate();
        if (update != null) {
            updateService.backup();
            String filePath = updateService.downloadUpdate(update);
            if (StringUtils.isNotBlank(filePath)) {
                updateService.update(filePath);
            }
        }
        updateService.update("update/perfree-web-1.2.5.zip");
        return update;
    }
}

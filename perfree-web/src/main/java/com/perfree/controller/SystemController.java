package com.perfree.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.core.util.RandomUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.*;
import com.perfree.model.Menu;
import com.perfree.model.Option;
import com.perfree.model.Role;
import com.perfree.model.User;
import com.perfree.service.*;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.io.Writer;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 控制首页地址
 */
@Controller
public class SystemController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(SystemController.class);
    private static final CacheManager cacheManager = CacheManager.newInstance();
    @Autowired
    private UserService userService;
    @Autowired
    private SEOService seoService;
    @Autowired
    private MailService mailService;
    @Autowired
    private UpdateService updateService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private RssServices rssServices;
    @Value("${shiro.timeout}")
    private Long timeout;

    /**
     * 后台首页
     * @return String
     */
    @RequestMapping("/admin")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public String adminIndex(Model model) {
        model.addAttribute("user", getUser());
        return view("static/admin/pages/index.html");
    }

    @PostMapping("/admin/menu/getAdminMenu")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public ResponseBean getAdminMenu() {
        List<Menu> menus = getMenuByUserIdAndType(1);
        return ResponseBean.success("success", menus);
    }

    /**
     * 前台首页
     * @return String
     */
    @RequestMapping("/")
    @FrontViewNodeRender
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

    @RequestMapping("/html/{name}")
    @FrontViewNodeRender
    public String renderHtml(@PathVariable String name) {
        return view(currentThemePage() + "/html/" + name + ".html");
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
    @SuppressWarnings("all")
    @AccessCacheLock
    public ResponseBean doLogin(@RequestBody User user,Boolean rememberMe, HttpSession session, HttpServletResponse response) {
        if(rememberMe == null) {
            rememberMe = false;
        }
        int count = 1;
        Ehcache cache = cacheManager.getEhcache("loginCache");
        try {
            String isOpenCaptcha = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_OPEN_CAPTCHA, Constants.OPEN_CAPTCHA);
            if (Constants.OPEN_CAPTCHA.equals(isOpenCaptcha) && (StringUtils.isBlank(user.getCaptcha()) ||
                    !user.getCaptcha().toUpperCase().equals(session.getAttribute("CAPTCHA_CODE").toString()))){
                return ResponseBean.fail("验证码错误", null);
            }
            Element element = cache.get(user.getAccount());
            if(element == null){
                cache.put(new Element(user.getAccount(), 1));
            } else {
                count = Integer.parseInt(element.getObjectValue().toString());
            }
            if (count >= 8) {
                return ResponseBean.fail("账户已被锁定,请10分钟后再试", null);
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
            subject.getSession().setTimeout(timeout * 1000 * 60);
            return ResponseBean.success("登录成功", result);
        }catch (IncorrectCredentialsException e) {
            session.removeAttribute("CAPTCHA_CODE");
            if (count < 8) {
                cache.put(new Element(user.getAccount(), ++count));
                count--;
            }
            if (count >= 5 && count < 8) {
                return ResponseBean.fail("用户名或密码错误,还有" + (8 - count) + "次将锁定该账户10分钟", e.getMessage());
            }
            if (count >= 8) {
                return ResponseBean.fail("用户名或密码错误,账户已被锁定,请10分钟后再试", e.getMessage());
            }
            return ResponseBean.fail("用户名或密码错误", e.getMessage());
        }catch (UnknownAccountException e) {
            session.removeAttribute("CAPTCHA_CODE");
            return ResponseBean.fail("账户不存在", e.getMessage());
        }catch (Exception e) {
            session.removeAttribute("CAPTCHA_CODE");
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
    @AccessCacheLock
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
            return ResponseBean.fail("邮件重复发送,请稍后再试", null);
        }
        try {
            String random = RandomUtil.randomString(4);
            logger.error("重置密码-验证码:{}", random);
            mailService.passwordMail(user, random);
            session.setAttribute("REST-CAPTCHA", random);
            session.setAttribute("REST-ID", queryUser.getId());
            session.setMaxInactiveInterval(300);
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
    @AccessCacheLock
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
        byId.setReadAvatar(false);
        byId.setSalt(StringUtil.getUUID());
        byId.setPassword(new Md5Hash(user.getPassword(), byId.getSalt()).toString());
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
    public String logout(String path) {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        if (StringUtils.isNotBlank(path)){
            return "redirect:"+path;
        }
        return view(currentThemePage() + "/index.html");
    }

    /**
     * 注册
     * @return ResponseBean
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doRegister")
    @ResponseBody
    @AccessCacheLock
    public ResponseBean doRegister(@RequestBody @Valid User user, HttpSession session) {
        String isRegister = OptionCacheUtil.getValue(Constants.OPTION_WEB_IS_REGISTER);
        if (StringUtils.isNotBlank(isRegister) && isRegister.equals(String.valueOf(Constants.REGISTER_NO))) {
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
        user.setStatus(Constants.USER_STATUS_DEFAULT);

        // 设置默认角色
        String roleCode = OptionCacheUtil.getValue(Constants.EHCACHE_KEY_WEB_REGISTER_DEFAULT_ROLE);
        if (StringUtils.isBlank(roleCode)) {
            roleCode = Constants.ROLE_USER;
        }
        Role role = roleService.getRoleByCode(roleCode);
        user.setRoleId(role.getId());
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

    @GetMapping("/rss")
    public void rss(HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.APPLICATION_XML_VALUE);
        Writer writer = response.getWriter();
        writer.append(rssServices.genRss());
    }

    /**
     * @description 检查更新
     * @author Perfree
     * @date 2021/11/1 10:10
     */
    @GetMapping("/checkUpdate")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
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
}

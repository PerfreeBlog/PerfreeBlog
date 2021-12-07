package com.perfree.controller.api.pub;

import com.perfree.commons.*;
import com.perfree.model.Option;
import com.perfree.model.Role;
import com.perfree.model.User;
import com.perfree.service.OptionService;
import com.perfree.service.RoleService;
import com.perfree.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;

@RestController
@CrossOrigin
@Api(value = "系统相关",tags = "系统相关")
@RequestMapping("/api")
@SuppressWarnings("all")
public class SystemController {
    private final Logger logger = LoggerFactory.getLogger(com.perfree.controller.SystemController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private OptionService optionService;
    @Autowired
    private RoleService roleService;

    /**
     * 登录
     * @return ResponseBean
     */

    @ApiOperation(value = "登录", notes = "用户登录")
    @PostMapping("/doLogin")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "account", value = "账户", dataTypeClass = String.class,  required = true),
            @ApiImplicitParam(name = "password", value = "密码", dataTypeClass = String.class,  required = true)
    })
    public ResponseBean doLogin(String account, String password) {
        try {
            UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(account,password,true);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);
            User userByAccount = userService.getUserByAccount(account);
            String token = JwtUtils.sign(userByAccount.getAccount(), userByAccount.getPassword());
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
     * 退出登录
     * @return ResponseBean
     */
    @GetMapping("/logout")
    @ResponseBody
    @ApiOperation(value = "退出登录", notes = "退出登录")
    public ResponseBean logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return ResponseBean.success("success", null);
    }

    /**
     * 注册
     * @return ResponseBean
     */
    @RequestMapping(method = RequestMethod.POST, path = "/doRegister")
    @ResponseBody
    @ApiOperation(value = "注册", notes = "注册")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "account", value = "账户", dataTypeClass = String.class,  required = true),
            @ApiImplicitParam(name = "password", value = "密码", dataTypeClass = String.class,  required = true),
            @ApiImplicitParam(name = "userName", value = "昵称/用户名", dataTypeClass = String.class,  required = true),
            @ApiImplicitParam(name = "email", value = "邮箱", dataTypeClass = String.class,  required = true)
    })
    public ResponseBean doRegister(@ApiIgnore @Valid User user,@ApiIgnore  HttpSession session) {
        Option optionByKey = optionService.getOptionByKey(Constants.OPTION_WEB_IS_REGISTER);
        if (optionByKey != null && optionByKey.getValue().equals(String.valueOf(Constants.REGISTER_NO))) {
            return ResponseBean.fail("网站已关闭注册功能", null);
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
            return ResponseBean.success("注册成功", user);
        }
        logger.error("注册失败: {}", user.toString());
        return ResponseBean.fail("注册失败", null);
    }

}

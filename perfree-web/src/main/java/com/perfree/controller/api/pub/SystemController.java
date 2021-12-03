package com.perfree.controller.api.pub;

import com.perfree.commons.JwtUtils;
import com.perfree.commons.ResponseBean;
import com.perfree.model.User;
import com.perfree.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin
@Api(value = "系统相关",tags = "系统相关")
@RequestMapping("/api")
@SuppressWarnings("all")
public class SystemController {

    @Autowired
    private UserService userService;

    /**
     * 登录
     * @return ResponseBean
     */

    @ApiOperation(value = "登录", notes = "用户登录")
    @PostMapping("/doLogin")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "account", value = "账户",dataType = "string",  required = true),
            @ApiImplicitParam(name = "password", value = "密码",dataType = "string",  required = true)
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
}

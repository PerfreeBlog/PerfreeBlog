package com.perfree.config;

import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


/**
 * ShiroRealm
 */
@Component
public class ShiroRealm extends AuthorizingRealm {
    private static final Logger LOGGER = LogManager.getLogger(ShiroRealm.class);

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) throws AuthenticationException{
        User user = new User();
        try {
            BeanUtils.copyProperties(principals.getPrimaryPrincipal(), user);
        } catch (Exception e) {
            LOGGER.error("获取授权异常: {}",e.getMessage());
            throw new AuthenticationException("获取授权异常");
        }
        user = userService.getUserByAccount(user.getAccount());
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRole(user.getRole().getCode());
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException  {
        UsernamePasswordToken userToken = (UsernamePasswordToken) token;
        String account = userToken.getUsername();
        User user = userService.getUserByAccount(account);
        if(user == null) {
            LOGGER.error("账户不存在: {}",account);
            throw new UnknownAccountException("账户不存在");
        }
        if(user.getPassword() == null) {
            LOGGER.error("密码为空");
            throw new IncorrectCredentialsException("密码为空");
        }else {
            String md5Hash = new Md5Hash(userToken.getPassword(), user.getSalt()).toString();
            userToken.setPassword(md5Hash.toCharArray());
        }
        String password = user.getPassword();
        user.setPassword(null);
        return new SimpleAuthenticationInfo(user,password,getName());
    }
}

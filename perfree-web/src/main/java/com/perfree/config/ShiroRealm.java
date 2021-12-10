package com.perfree.config;

import com.perfree.Application;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


/**
 * Custom shiroRealm
 *
 * @author Perfree
 */
@Component
public class ShiroRealm extends AuthorizingRealm {
    private final static Logger LOGGER = LoggerFactory.getLogger(Application.class);

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) throws AuthenticationException {
        User user = new User();
        try {
            BeanUtils.copyProperties(principals.getPrimaryPrincipal(), user);
        } catch (Exception e) {
            LOGGER.error("Get authorization exception: {}", e.getMessage());
            throw new AuthenticationException("Get authorization exception");
        }
        user = userService.getUserByAccount(user.getAccount());
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRole(user.getRole().getCode());
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken userToken = (UsernamePasswordToken) token;
        String account = userToken.getUsername();
        User user = userService.getUserByAccount(account);
        if (user == null) {
            LOGGER.error("Account does not exist: {}", account);
            throw new UnknownAccountException("Account does not exist");
        }
        if (user.getPassword() == null) {
            LOGGER.error("Password is empty");
            throw new IncorrectCredentialsException("Password is empty");
        } else {
            String md5Hash = new Md5Hash(userToken.getPassword(), user.getSalt()).toString();
            userToken.setPassword(md5Hash.toCharArray());
        }
        String password = user.getPassword();
        user.setPassword(null);
        return new SimpleAuthenticationInfo(user, password, getName());
    }
}

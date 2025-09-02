package com.perfree.security.util;

import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.stp.parameter.SaLoginParameter;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.system.api.user.UserApi;
import com.perfree.system.api.user.dto.UserRespDTO;
import lombok.RequiredArgsConstructor;
import org.noear.solon.annotation.Component;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Perfree
 * @description Sa-Token工具类，替代JWT工具类
 * @date 15:14 2023/9/28
 */
@Component
@RequiredArgsConstructor
public class SaTokenUtil {

    private static UserApi userApi;
    
    @Autowired
    public SaTokenUtil(UserApi userApi) {
        SaTokenUtil.userApi = userApi;
    }

    /**
     * 用户登录
     * @param userId 用户Id
     * @param isRemember 是否记住账户
     * @return token
     */
    public static String login(Integer userId, Boolean isRemember) {
        // 登录，参数为用户id，也可以是其它唯一标识
        StpUtil.login(userId,
                new SaLoginParameter().setTimeout(isRemember ? 60 * 60 * 24 * 7 : 60 * 60 * 2));
        
        // 获取用户信息并存储到session
        UserRespDTO userRespDTO = userApi.findById(userId);
        if (userRespDTO != null) {
            LoginUserVO loginUser = new LoginUserVO();
            loginUser.setId(userRespDTO.getId());
            loginUser.setAccount(userRespDTO.getAccount());
            StpUtil.getSession().set("loginUser", loginUser);
        }
        
        // 返回token
        return StpUtil.getTokenValue();
    }

    /**
     * 用户登出
     */
    public static void logout() {
        StpUtil.logout();
    }

    /**
     * 检查token是否有效
     * @param token token
     * @return boolean
     */
    public static boolean verifyToken(String token) {
        try {
            return StpUtil.getLoginIdByToken(token) != null;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 根据token获取登录账号
     * @param token token
     * @return 登录账号
     */
    public static String getAccountByToken(String token) {
        try {
            return (String) StpUtil.getLoginIdByToken(token);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 获取当前登录用户信息
     * @return LoginUserVO
     */
    public static LoginUserVO getLoginUser() {
        if (!StpUtil.isLogin()) {
            return null;
        }
        
        // 从session中获取用户信息
        LoginUserVO loginUser = (LoginUserVO) StpUtil.getSession().get("loginUser");
        if (loginUser != null) {
            return loginUser;
        }
        
        // 如果session中没有，则根据loginId查询用户信息
        String account = (String) StpUtil.getLoginId();
        UserRespDTO userRespDTO = userApi.findByAccount(account);
        if (userRespDTO != null) {
            loginUser = new LoginUserVO();
            loginUser.setId(userRespDTO.getId());
            loginUser.setAccount(userRespDTO.getAccount());
            // 缓存到session中
            StpUtil.getSession().set("loginUser", loginUser);
            return loginUser;
        }
        
        return null;
    }

    /**
     * 刷新token
     * @return 新的token
     */
    public static String refreshToken() {
        if (!StpUtil.isLogin()) {
            return null;
        }
        // sa-token会自动刷新token，这里直接返回当前token
        return StpUtil.getTokenValue();
    }
}
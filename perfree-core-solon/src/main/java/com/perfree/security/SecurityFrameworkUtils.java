package com.perfree.security;

import cn.dev33.satoken.stp.StpUtil;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.system.api.user.UserApi;
import com.perfree.system.api.user.dto.UserRespDTO;
import org.noear.solon.Solon;
import org.springframework.lang.Nullable;

/**
 * @author Perfree
 * @description Security工具类 - 基于sa-token实现
 * @date 15:39 2023/9/28
 */
public class SecurityFrameworkUtils {

    /**
     * 获取当前登录用户
     *
     * @return User
     */
    @Nullable
    public static LoginUserVO getLoginUser() {
        if (!StpUtil.isLogin()) {
            return null;
        }
        
        // 从sa-token session中获取用户信息
        LoginUserVO loginUser = (LoginUserVO) StpUtil.getSession().get("loginUser");
        if (loginUser != null) {
            return loginUser;
        }
        
        // 如果session中没有，则根据loginId查询用户信息
        String account = (String) StpUtil.getLoginId();
        UserApi userApi = Solon.context().getBean(UserApi.class);
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

    public static Integer getLoginUserId() {
        LoginUserVO loginUser = getLoginUser();
        return null == loginUser ? null : loginUser.getId();
    }

    /**
     * 检查是否已登录
     */
    public static boolean isLogin() {
        return StpUtil.isLogin();
    }

    /**
     * 获取当前登录账号
     */
    public static String getLoginAccount() {
        if (!StpUtil.isLogin()) {
            return null;
        }
        return (String) StpUtil.getLoginId();
    }
}

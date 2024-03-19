package com.perfree.base;

import com.perfree.commons.JwtUtils;
import com.perfree.shared.api.user.UserApi;
import com.perfree.shared.api.user.dto.UserDTO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Api controller基类
 */
@RestController
@CrossOrigin
@RequestMapping("/api")
public class BaseApiController extends BaseController{

    @Resource
    private UserApi userApi;

    /**
     * 获取当前的登录用户
     * @return UserForm   当前的登录用户
     */
    public UserDTO getLoginUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (StringUtils.isNotBlank(token)) {
            String account = JwtUtils.getUsername(token);
            UserDTO userByAccount = userApi.getUserByAccount(account);
            if (userByAccount != null) {
                userByAccount.setPassword(null);
                userByAccount.setSalt(null);
                return userByAccount;
            }
        }
        return getUser();
    }
}

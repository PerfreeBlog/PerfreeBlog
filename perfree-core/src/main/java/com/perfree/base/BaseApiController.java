package com.perfree.base;

import com.perfree.security.vo.LoginUserVO;
import com.perfree.shared.api.user.UserApi;
import jakarta.annotation.Resource;
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

    public LoginUserVO getLoginUser() {
        return getUser();
    }
}

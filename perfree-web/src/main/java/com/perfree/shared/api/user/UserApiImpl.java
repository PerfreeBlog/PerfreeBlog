package com.perfree.shared.api.user;

import com.perfree.convert.UserConvert;
import com.perfree.model.User;
import com.perfree.service.UserService;
import com.perfree.shared.api.user.dto.UserDTO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * 用户相关共享接口实现类
 */
@Service
public class UserApiImpl implements UserApi{

    @Resource
    private UserService userService;

    @Override
    public UserDTO getUserByAccount(String account) {
        User userByAccount = userService.getUserByAccount(account);
        return UserConvert.INSTANCE.convertUserDTO(userByAccount);
    }
}

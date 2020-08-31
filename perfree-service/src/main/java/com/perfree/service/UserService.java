package com.perfree.service;

import com.perfree.mapper.UserMapper;
import com.perfree.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;


    /**
     * 根据账户获取用户信息
     * @param account 账号
     * @return User 用户信息
     */
    public User getUserByAccount(String account) {
        return userMapper.getUserByAccount(account);
    }
}

package com.perfree.mapper;

import com.perfree.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserMapper {
    /**
     * 根据账号获取账户信息
     * @param account 账号
     * @return User 用户信息
     */
    User getUserByAccount(String account);
}

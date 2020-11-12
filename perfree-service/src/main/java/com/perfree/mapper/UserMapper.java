package com.perfree.mapper;

import com.perfree.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {
    /**
     * 根据账号获取账户信息
     * @param account 账号
     * @return User 用户信息
     */
    User getUserByAccount(String account);

    /**
     * 用户列表
     * @param user 数据
     * @return List<User>
     */
    List<User> getList(User user);

    /**
     * 添加用户
     * @param user
     * @return int
     */
    int add(User user);

    /**
     * 删除用户
     * @param idArr id数组
     * @return int
     */
    int del(String[] idArr);

    /**
     * 根据id获取信息
     * @param id id
     * @return User
     */
    User getById(String id);
}

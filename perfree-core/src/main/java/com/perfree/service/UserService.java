package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.model.User;

import java.util.List;

/**
 * @description UserService
 * @author Perfree
 * @date 2021/11/15 10:32
 */
public interface UserService {

    /**
     * 根据账户获取用户信息
     * @param account 账号
     * @return User 用户信息
     */
    User getUserByAccount(String account);

    /**
     * 用户列表
     * @param pager 分页数据
     * @return Pager<User>
     */
    Pager<User> list(Pager<User> pager);

    /**
     * 添加用户
     * @param user user
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

    /**
     * 更新用户
     * @param user 用户
     * @return int
     */
    int update(User user);

    /**
     * 重置密码为123456
     * @param user user
     * @return int
     */
    int resetPassword(User user);

    /**
     * 更改状态
     * @param user user
     * @return int
     */
    int changeStatus(User user);

    /**
     * 获取用户数量
     * @return Long
     */
    Long getUserCount();

    /**
     * 修改密码
     * @param user user
     * @return int
     */
    int updatePassword(User user);

    /**
     * @description 根据邮箱和账户查找
     * @return com.perfree.model.User
     * @author Perfree
     */
    User getUserByAccountAndEmail(String account, String email);

    /**
     * @description  获取所有用户
     * @return java.util.List<com.perfree.model.User>
     * @author Perfree
     */
    List<User> allList();

    void installInitAllUser(User user);

}

package com.perfree.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Pager;
import com.perfree.commons.StringUtil;
import com.perfree.mapper.UserMapper;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    /**
     * 根据账户获取用户信息
     * @param account 账号
     * @return User 用户信息
     */
    @Transactional(readOnly = true)
    public User getUserByAccount(String account) {
        return userMapper.getUserByAccount(account);
    }

    /**
     * 用户列表
     * @param pager 分页数据
     * @return Pager<User>
     */
    @Transactional(readOnly = true)
    public Pager<User> list(Pager<User> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<User> users = userMapper.getList(pager.getForm());
        PageInfo<User> pageInfo = new PageInfo<>(users);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 添加用户
     * @param user user
     * @return int
     */
    public int add(User user) {
        user.setSalt(StringUtil.getUUID());
        user.setPassword(new Md5Hash(user.getPassword(), user.getSalt()).toString());
        user.setCreateTime(new Date());
        return userMapper.add(user);
    }

    /**
     * 删除用户
     * @param idArr id数组
     * @return int
     */
    public int del(String[] idArr) {
        return userMapper.del(idArr);
    }

    /**
     * 根据id获取信息
     * @param id id
     * @return User
     */
    @Transactional(readOnly = true)
    public User getById(String id) {
        return userMapper.getById(id);
    }

    /**
     * 更新用户
     * @param user 用户
     * @return int
     */
    public int update(User user) {
        user.setUpdateTime(new Date());
        return userMapper.update(user);
    }

    /**
     * 重置密码为123456
     * @param user user
     * @return int
     */
    public int resetPassword(User user) {
        user.setSalt(StringUtil.getUUID());
        user.setPassword(new Md5Hash("123456", user.getSalt()).toString());
        user.setUpdateTime(new Date());
        return userMapper.resetPassword(user);
    }

    /**
     * 更改状态
     * @param user user
     * @return int
     */
    public int changeStatus(User user) {
        user.setUpdateTime(new Date());
        return userMapper.changeStatus(user);
    }

    /**
     * 获取用户数量
     * @return Long
     */
    public Long getUserCount() {
        return userMapper.getUserCount();
    }

    /**
     * 修改密码
     * @param user user
     * @return int
     */
    public int updatePassword(User user) {
        user.setUpdateTime(new Date());
        return userMapper.updatePassword(user);
    }

    /**
     * @description 根据邮箱和账户查找
     * @return com.perfree.model.User
     * @author Perfree
     */
    public User getUserByAccountAndEmail(String account, String email) {
        return userMapper.getUserByAccountAndEmail(account, email);
    }

    @Override
    public List<User> allList() {
        return userMapper.getList(null);
    }

    @Override
    public void installInitAllUser(User user) {
        userMapper.installInitArticleUserId(user);
        userMapper.installInitTagUserId(user);
    }
}

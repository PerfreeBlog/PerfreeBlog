package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.mapper.UserMapper;
import com.perfree.model.Tag;
import com.perfree.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    /**
     * 用户列表
     * @param pager 分页数据
     * @return Pager<User>
     */
    public Pager<User> list(Pager<User> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<User> users = userMapper.getList(pager.getForm());
        PageInfo<User> pageInfo = new PageInfo<>(users);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }
}

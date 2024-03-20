package com.perfree.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.Pager;
import com.perfree.model.Option;
import com.perfree.model.User;
import com.perfree.vo.system.UserLoginReqVO;
import com.perfree.vo.system.UserLoginRespVO;
import jakarta.servlet.http.HttpSession;

import java.util.List;

/**
 * @description UserService
 * @author Perfree
 * @date 2021/11/15 10:32
 */
public interface UserService extends IService<User> {

    /**
     * 根据账户获取用户信息
     * @param account 账号
     * @return User 用户信息
     */
    User getUserByAccount(String account);


    /**
     * 登录逻辑
     * @param userLoginReqVO userLoginReqVO
     * @return UserLoginRespVO
     */
    UserLoginRespVO login(UserLoginReqVO userLoginReqVO, HttpSession session);
}

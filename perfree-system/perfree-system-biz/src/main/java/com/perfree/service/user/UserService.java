package com.perfree.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.user.vo.*;
import com.perfree.model.User;
import com.perfree.controller.system.vo.LoginUserInfoRespVO;
import com.perfree.controller.system.vo.LoginUserReqVO;
import com.perfree.controller.system.vo.LoginUserRespVO;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface UserService extends IService<User> {

    /**
     * @author Perfree
     * @description 账号密码登录
     * @date 15:42 2023/9/28
     * @param loginUserVO LoginUserReqVO
     * @return com.perfree.vo.LoginUserRespVO
     */
    LoginUserRespVO login(LoginUserReqVO loginUserVO);

    /**
     * @author Perfree
     * @description 根据账号查询用户信息
     * @date 15:42 2023/9/28
     * @param account 账号
     * @return com.perfree.model.User
     */
   User findByAccount(String account);

    /**
     * 获取当前登录的用户信息
     * @return LoginUserInfoRespVO
     */
    LoginUserInfoRespVO userInfo();

    /**
     * 用户分页列表
     * @param pageVO pageVO
     * @return PageResult<User>
     */
    PageResult<User> userPage(UserPageReqVO pageVO);

    /**
     * 获取用户
     * @param id id
     * @return User
     */
    User get(Integer id);

    /**
     * 删除用户
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 添加用户
     * @param userAddReqVO userAddReqVO
     * @return User
     */
    User addUser(UserAddReqVO userAddReqVO);

    /**
     * 更新用户
     * @param userUpdateReqVO userUpdateReqVO
     * @return User
     */
    User updateUser(UserUpdateReqVO userUpdateReqVO);

    /**
     * 获取用户角色id集合
     * @param id id
     * @return UserRoleRespVO
     */
    UserRoleRespVO getUserRole(Integer id);

    /**
     * 设置用户角色
     * @param userRoleReqVO userRoleReqVO
     * @return Boolean
     */
    Boolean updateUserRole(UserRoleReqVO userRoleReqVO);

    /**
     * 重置密码
     * @param resetPasswordReqVO resetPasswordReqVO
     * @return Boolean
     */
    Boolean resetPassword(UserResetPasswordReqVO resetPasswordReqVO);

}

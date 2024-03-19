package com.perfree.shared.api.user;

import com.perfree.shared.api.user.dto.UserDTO;

/**
 * 用户相关
 */
public interface UserApi {

    /**
     * 根据账号获取用户信息
     * @param account 账户
     * @return UserRespDTO
     */
    UserDTO getUserByAccount(String account);
}

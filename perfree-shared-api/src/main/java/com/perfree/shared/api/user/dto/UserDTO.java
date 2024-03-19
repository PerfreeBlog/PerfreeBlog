package com.perfree.shared.api.user.dto;

import lombok.Data;

import java.util.Date;

/**
 * 用户 DTO
 */
@Data
public class UserDTO {
    /**
     * 主键
     */
    private Long id;

    /**
     * 用户账号
     */
    private String account;

    /**
     * 用户名
     */
    private String userName;

    /**
     * 用户登录密码
     */
    private String password;

    /**
     * 盐值
     */
    private String salt;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 网站
     */
    private String website;

    private Date createTime;

    private Date updateTime;

}

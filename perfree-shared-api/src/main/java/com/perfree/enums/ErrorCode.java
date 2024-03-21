package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 定义错误编码枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum ErrorCode {
    CAPTCHA_IMAGE_ERROR(100000001,"验证码生成失败!"),
    CAPTCHA_IS_NOT_EMPTY(10000002,"请输入验证码!"),
    CAPTCHA_EXPIRE(100000003,"验证码已过期!"),
    CAPTCHA_VALID_ERROR(100000004,"验证码错误!"),
    ACCOUNT_NOT_FOUNT(100000005,"账号不存在!"),
    ACCOUNT_PASSWORD_ERROR(100000006,"账号或密码错误!"),
    CHECK_UPDATE_ERROR(100000007,"检查更新失败!"),

    SITE_FLAG_EXIST(100000008,"标识已存在!"),
    ;

    private final Integer code;

    private final String msg;

    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

}

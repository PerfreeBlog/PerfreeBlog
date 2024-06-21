package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 配置枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum OptionEnum {
    WEB_THEME("WEB_THEME","当前使用的主题"),
    LOGIN_CAPTCHA_ENABLE("LOGIN_CAPTCHA_ENABLE","是否开启登录验证码"),
    DEFAULT_ADMIN_FRAME("DEFAULT_ADMIN_FRAME","默认的管理后台基础界面"),
    WEB_AUTO_GEN_SUMMARY("WEB_AUTO_GEN_SUMMARY","是否自动生成文章摘要"),
    ;
    private final String key;

    private final String msg;

    OptionEnum(String key, String msg) {
        this.key = key;
        this.msg = msg;
    }

}

package com.perfree.enums;

import lombok.Getter;

/**
 * @author Perfree
 * @description 配置枚举
 * @date 15:12 2023/9/28
 */
@Getter
public enum OptionEnum {
    LOGIN_CAPTCHA_ENABLE("OPTION_WEB_OPEN_CAPTCHA","是否开启登录验证码"),
    WEB_THEME("WEB_THEME","当前主题"),
    ;
    private final String key;

    private final String msg;

    OptionEnum(String key, String msg) {
        this.key = key;
        this.msg = msg;
    }

}

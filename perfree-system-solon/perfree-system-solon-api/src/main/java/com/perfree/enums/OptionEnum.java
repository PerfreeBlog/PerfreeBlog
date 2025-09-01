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
    WEB_NAME("WEB_NAME", "网站名称"),
    WEB_OPEN_CAPTCHA("WEB_OPEN_CAPTCHA","是否开启登录验证码"),
    WEB_AUTO_GEN_SUMMARY("WEB_AUTO_GEN_SUMMARY","是否自动生成文章摘要"),
    WEB_IS_REGISTER("WEB_IS_REGISTER", "是否允许注册新用户"),
    WEB_REGISTER_DEFAULT_ROLE("WEB_REGISTER_DEFAULT_ROLE", "注册账户默认角色"),
    WEB_VERSION("WEB_VERSION",  "版本"),
    WEB_RSS_GEN_MODE("WEB_RSS_GEN_MODE", ""),
    WEB_SITE("WEB_SITE",""),
    WEB_RSS_GEN_NUM("WEB_RSS_GEN_NUM",""),
    WEB_TITLE("WEB_TITLE", ""),
    WEB_META_DESC("WEB_META_DESC", ""),
    WEB_META_KEYWORD("WEB_META_KEYWORD", ""),
    WEB_CUSTOM_HEAD("WEB_CUSTOM_HEAD", ""),
    WEB_IS_AUTO_PUSH_BAIDU("WEB_IS_AUTO_PUSH_BAIDU", ""),
    WEB_COMMENT_IS_REVIEW("WEB_COMMENT_IS_REVIEW", ""),
    COMMENT_IS_SEND_MAIL("COMMENT_IS_SEND_MAIL", ""),
    WEB_COMMENT_IS_STINT("WEB_COMMENT_IS_STINT", ""),
    WEB_INIT("WEB_INIT",""),
    ENABLE_CACHE_VIEW("ENABLE_CACHE_VIEW","")
    ;
    private final String key;

    private final String msg;

    OptionEnum(String key, String msg) {
        this.key = key;
        this.msg = msg;
    }

}

package com.perfree.security;

/**
 * @author Perfree
 * @description 定义Security常量配置 - 基于sa-token
 * @date 15:11 2023/9/28
 */
public class SecurityConstants {

    /**
     * token前缀,用在请求头里Authorization
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 请求头
     */
    public static final String TOKEN_HEADER = "Authorization";

    /**
     * token有效期2小时（当remember为false时）
     */
    public static final Long TOKEN_EXPIRATION_TIME = 60 * 60 * 2L;

    /**
     * token有效期为7天（当remember为true时）
     */
    public static final Long TOKEN_EXPIRATION_REMEMBER_TIME = 60 * 60 * 24 * 7L;

    /**
     * 刷新token有效期
     */
   public static final Long REFRESH_TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 7L;
}

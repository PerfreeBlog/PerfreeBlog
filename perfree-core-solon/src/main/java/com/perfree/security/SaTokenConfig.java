package com.perfree.security;

import cn.dev33.satoken.context.SaHolder;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.solon.integration.SaTokenInterceptor;
import cn.dev33.satoken.stp.StpUtil;
import lombok.extern.slf4j.Slf4j;
import org.noear.solon.annotation.Bean;
import org.noear.solon.annotation.Configuration;
import org.noear.solon.annotation.Inject;

/**
 * Sa-Token 基础配置类
 * 
 * @author Majz
 */
@Configuration
@Slf4j
public class SaTokenConfig {


    @Bean(index = -100)
    public SaTokenInterceptor saTokenInterceptor() {
        SaTokenInterceptor interceptor = new SaTokenInterceptor();

        String[] excludes = new String[]{
                "/api/auth/login",
                "/api/auth/register",
                "/api/auth/captcha",
                "/api/auth/refresh"
        };

        // 指定 [拦截路由] 与 [放行路由]
        interceptor.addInclude("/api/auth/**");
        for (String url : excludes) {
            log.info("[saTokenInterceptor]放行接口：{}", url);
            interceptor.addExclude(url);
        }

        // 认证函数: 每次请求执行
        interceptor.setAuth(req -> SaRouter.match("/api/auth/**", StpUtil::checkLogin));

        // 前置函数：在每次认证函数之前执行
        interceptor.setBeforeAuth(req -> {
            // ---------- 设置一些安全响应头 ----------
            SaHolder.getResponse()
                    // 服务器名称
                    .setServer("perfreeBlog")
                    // 是否可以在iframe显示视图： DENY=不可以 | SAMEORIGIN=同域下可以 | ALLOW-FROM uri=指定域名下可以
                    .setHeader("X-Frame-Options", "SAMEORIGIN")
                    // 是否启用浏览器默认XSS防护： 0=禁用 | 1=启用 | 1; mode=block 启用, 并在检查到XSS攻击时，停止渲染页面
                    .setHeader("X-XSS-Protection", "1; mode=block")
                    // 禁用浏览器内容嗅探
                    .setHeader("X-Content-Type-Options", "nosniff");
        });

        return interceptor;
    }
} 
package com.perfree.security.interceptor;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.http.ContentType;
import cn.hutool.json.JSONUtil;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.commons.utils.WebUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.noear.solon.annotation.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * @author Perfree
 * @description Sa-Token认证拦截器，替代JWT过滤器
 * @date 15:40 2023/9/28
 */
@Component
public class SaTokenInterceptor implements HandlerInterceptor {
    private static final Logger LOGGER = LoggerFactory.getLogger(SaTokenInterceptor.class);

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull Object handler) throws Exception {
        try {
            // 只对/api/auth路径进行认证检查
            if (!request.getRequestURI().startsWith("/api/auth")) {
                return true;
            }
            
            // 排除登录、注册等不需要认证的接口
            String uri = request.getRequestURI();
            if (uri.equals("/api/auth/login") || uri.equals("/api/auth/register") || 
                uri.equals("/api/auth/captcha") || uri.equals("/api/auth/refresh")) {
                return true;
            }
            
            // 检查登录状态
            StpUtil.checkLogin();
            return true;
            
        } catch (NotLoginException e) {
            // 根据不同的异常类型返回不同的错误信息
            String message = switch (e.getType()) {
                case NotLoginException.NOT_TOKEN -> "未提供token";
                case NotLoginException.INVALID_TOKEN -> "token无效";
                case NotLoginException.TOKEN_TIMEOUT -> "token已过期";
                case NotLoginException.BE_REPLACED -> "token已被顶下线";
                case NotLoginException.KICK_OUT -> "token已被踢下线";
                default -> "当前会话未登录";
            };
            
            WebUtils.renderString(HttpServletResponse.SC_OK, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.SC_UNAUTHORIZED.getCode(), message)));
            return false;
        } catch (Exception e) {
            LOGGER.error("Sa-Token认证异常", e);
            WebUtils.renderString(HttpServletResponse.SC_OK, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.SC_UNAUTHORIZED.getCode(), "认证失败")));
            return false;
        }
    }
}
package com.perfree.interceptor;

import cn.hutool.http.ContentType;
import cn.hutool.json.JSONUtil;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.commons.utils.WebUtils;
import com.perfree.constant.OptionConstant;
import com.perfree.enums.OptionEnum;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class WebInitInterceptor implements HandlerInterceptor {

    @Resource
    private OptionCacheService optionCacheService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_INIT.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM);
        if (request.getRequestURI().equals("/api/initWeb") || request.getRequestURI().equals("/init")) {
            if (null != option && option.getValue().equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
                response.sendRedirect("/404");
                return false;
            }
            return true;
        }
        if (null == option || option.getValue().equals(OptionConstant.OPTION_PUBLIC_FALSE)) {
            // 获取请求的 Accept 头
            String acceptHeader = request.getHeader("Accept");

            // 如果请求的是 HTML 页面，则重定向
            if (acceptHeader != null && acceptHeader.contains("text/html")) {
                response.sendRedirect("/init");
                return false;
            }else if (acceptHeader != null && acceptHeader.contains("application/json")) {
                WebUtils.renderString(HttpServletResponse.SC_OK, ContentType.JSON.getValue(), response,
                        JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.WEB_NOT_INIT.getCode(), ResultCodeEnum.WEB_NOT_INIT.getMsg())));
                return false;
            }
            return false;
        }
        String path = request.getRequestURI();
        return !path.equals("/init");
    }
}

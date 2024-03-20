package com.perfree.security.handle;

import cn.hutool.http.ContentType;
import cn.hutool.json.JSONUtil;
import com.perfree.commons.CommonResult;
import com.perfree.commons.WebUtils;
import com.perfree.enums.ResultCodeEnum;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        String requestURI = request.getRequestURI();
        if (StringUtils.isNotBlank(requestURI) && requestURI.startsWith("/api")) {
            WebUtils.renderString(HttpServletResponse.SC_FORBIDDEN, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.AUTH_FORBIDDEN.getCode(), ResultCodeEnum.AUTH_FORBIDDEN.getMsg())));
            return;
        }
        response.sendRedirect("/login");

    }
}

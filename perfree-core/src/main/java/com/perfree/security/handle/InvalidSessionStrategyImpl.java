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
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class InvalidSessionStrategyImpl implements InvalidSessionStrategy {
    @Override
    public void onInvalidSessionDetected(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String requestURI = request.getRequestURI();
        if (StringUtils.isNotBlank(requestURI) && requestURI.startsWith("/api")) {
            WebUtils.renderString(HttpServletResponse.SC_UNAUTHORIZED, ContentType.JSON.getValue(), response,
                    JSONUtil.toJsonStr(CommonResult.error(ResultCodeEnum.AUTH_UNAUTHORIZED.getCode(), ResultCodeEnum.AUTH_UNAUTHORIZED.getMsg())));
            return;
        }
        response.sendRedirect("/login");
    }
}

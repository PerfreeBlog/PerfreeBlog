package com.perfree.interceptor;

import com.perfree.commons.Constants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ApiInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
     /*   String webOpenApi = OptionCacheUtil.getDefaultValue("WEB_OPEN_API", Constants.WEB_API_OPEN);
        if (Constants.WEB_API_CLOSE.equals(webOpenApi)) {
            return false;
        }
        String webApiAccessKey = OptionCacheUtil.getDefaultValue("WEB_API_ACCESS_KEY", "");
        if (StringUtils.isBlank(webApiAccessKey)) {
            return true;
        }

        String accessKey = request.getParameter("access_key");
        if (webApiAccessKey.equals(accessKey)) {
            return true;
        }
        String headerAccessKey = request.getHeader("AccessKey");
        if (webApiAccessKey.equals(headerAccessKey)) {
            return true;
        }
        response.sendRedirect("/403");*/
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}

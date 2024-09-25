package com.perfree.interceptor;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.utils.WebUtils;
import com.perfree.enums.OptionEnum;
import com.perfree.security.annotation.PluginPreAuthorize;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.lang.reflect.Method;
import java.util.Map;

@Component
public class FrontViewInterceptor implements HandlerInterceptor {

    @Value("${server.port}")
    private int serverPort;

    @Resource
    private OptionCacheService optionCacheService;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (handler instanceof HandlerMethod handlerMethod) {
            Method method = handlerMethod.getMethod();
            FrontViewNodeRender annotation = method.getAnnotation(FrontViewNodeRender.class);
            if (annotation != null) {
                Map<String, Object> model = modelAndView.getModel();
                model.putIfAbsent(OptionEnum.WEB_TITLE.getKey(), optionCacheService.getDefaultValue(OptionEnum.WEB_TITLE.getKey(), null));
                model.putIfAbsent(OptionEnum.WEB_META_KEYWORD.getKey(), optionCacheService.getDefaultValue(OptionEnum.WEB_META_KEYWORD.getKey(), null));
                model.putIfAbsent(OptionEnum.WEB_META_DESC.getKey(), optionCacheService.getDefaultValue(OptionEnum.WEB_META_DESC.getKey(), null));
                model.putIfAbsent(OptionEnum.WEB_SITE.getKey(), optionCacheService.getDefaultValue(OptionEnum.WEB_META_DESC.getKey(), WebUtils.getUrl(serverPort)));
            }
        }
    }
}

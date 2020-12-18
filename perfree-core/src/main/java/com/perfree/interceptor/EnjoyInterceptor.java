package com.perfree.interceptor;

import com.perfree.common.Constants;
import com.perfree.common.OptionCache;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class EnjoyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (modelAndView != null) {
            Map<String, Object> model = modelAndView.getModel();
            model.putIfAbsent(Constants.OPTION_WEB_TITLE, OptionCache.getOption(Constants.OPTION_WEB_TITLE));
            model.putIfAbsent(Constants.OPTION_WEB_META_KEYWORD, OptionCache.getOption(Constants.OPTION_WEB_META_KEYWORD));
            model.putIfAbsent(Constants.OPTION_WEB_META_DESC, OptionCache.getOption(Constants.OPTION_WEB_META_DESC));
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

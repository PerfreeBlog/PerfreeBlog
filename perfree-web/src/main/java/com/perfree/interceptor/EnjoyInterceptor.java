package com.perfree.interceptor;

import com.perfree.common.Constants;
import com.perfree.common.OptionCache;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
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
            setUser(model);
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    private void setUser(Map<String, Object> model){
        UserService userService = SpringBeanUtils.getBean(UserService.class);
        Subject subject = SecurityUtils.getSubject();
        User user = new User();
        PrincipalCollection principals = subject.getPrincipals();
        if (principals != null) {
            BeanUtils.copyProperties(principals.getPrimaryPrincipal(), user);
            user = userService.getById(user.getId().toString());
            user.setPassword(null);
            user.setSalt(null);
            model.put(Constants.LOGIN_USER, user);
        }
    }
}

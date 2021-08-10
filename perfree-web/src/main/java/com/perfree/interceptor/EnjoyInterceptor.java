package com.perfree.interceptor;

import com.perfree.common.Constants;
import com.perfree.common.OptionCacheUtil;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class EnjoyInterceptor implements HandlerInterceptor {
    private final Logger logger = LoggerFactory.getLogger(EnjoyInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (modelAndView != null) {
            Map<String, Object> model = modelAndView.getModel();
            model.putIfAbsent(Constants.OPTION_WEB_TITLE, OptionCacheUtil.getValue(Constants.OPTION_WEB_TITLE));
            model.putIfAbsent(Constants.OPTION_WEB_META_KEYWORD, OptionCacheUtil.getValue(Constants.OPTION_WEB_META_KEYWORD));
            model.putIfAbsent(Constants.OPTION_WEB_META_DESC, OptionCacheUtil.getValue(Constants.OPTION_WEB_META_DESC));
            setUser(model);
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    private void setUser(Map<String, Object> model){
       try{
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
       } catch (Exception e){
           logger.error(e.getMessage());
       }
    }
}

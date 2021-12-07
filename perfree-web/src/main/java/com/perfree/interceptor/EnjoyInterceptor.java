package com.perfree.interceptor;

import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Component
public class EnjoyInterceptor implements HandlerInterceptor {

    @Value("${server.port}")
    private int serverPort;

    private final Logger logger = LoggerFactory.getLogger(EnjoyInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (modelAndView != null) {
            Map<String, Object> model = modelAndView.getModel();
            String webTitle = OptionCacheUtil.getValue(Constants.OPTION_WEB_TITLE);
            String webKeyWord = OptionCacheUtil.getValue(Constants.OPTION_WEB_META_KEYWORD);
            String webDesc = OptionCacheUtil.getValue(Constants.OPTION_WEB_META_DESC);
            model.putIfAbsent(Constants.OPTION_WEB_TITLE, StringUtils.isBlank(webTitle) ? null : webTitle.trim());
            model.putIfAbsent(Constants.OPTION_WEB_META_KEYWORD, StringUtils.isBlank(webKeyWord) ? null : webKeyWord.trim());
            model.putIfAbsent(Constants.OPTION_WEB_META_DESC, StringUtils.isBlank(webDesc) ? null : webDesc.trim());
            model.putIfAbsent(Constants.WEB_SITE, OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_SITE, IpUtil.getUrl(serverPort)));
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

package com.exam.interceptor;

import com.perfree.plugin.annotation.InterceptPath;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @description 示例插件: 拦截器
 * @author Perfree
 * @date 2021/11/10 9:48
 */
@InterceptPath("/**")
public class ExamInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       System.out.println("preHandle");
        return true;
    }
}

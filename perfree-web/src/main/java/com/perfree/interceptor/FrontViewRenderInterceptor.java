package com.perfree.interceptor;

import com.perfree.commons.*;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.context.annotation.Configuration;

/**
 * 访问限制拦截
 */
@Aspect
@Configuration
public class FrontViewRenderInterceptor {

    @Around("@annotation(com.perfree.commons.FrontViewNodeRender)")
    public Object interceptCacheLock(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        FrontViewNodeRender frontViewNodeRender = methodSignature.getMethod().getAnnotation(FrontViewNodeRender.class);
        if (StringUtils.isNotBlank(OptionCacheUtil.getValue(Constants.OPTION_WEB_THEME_TYPE))) {
            throw new FrontViewNodeRenderException(frontViewNodeRender);
        }
        return joinPoint.proceed();
    }
}

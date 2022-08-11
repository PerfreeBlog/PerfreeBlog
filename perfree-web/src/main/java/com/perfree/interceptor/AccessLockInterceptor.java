package com.perfree.interceptor;

import com.perfree.commons.AccessCacheLock;
import com.perfree.commons.RequestAccessException;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
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
public class AccessLockInterceptor {
    private static final CacheManager cacheManager = CacheManager.newInstance();

    @Around("@annotation(com.perfree.commons.AccessCacheLock)")
    public Object interceptCacheLock(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        AccessCacheLock accessCacheLock = methodSignature.getMethod().getAnnotation(AccessCacheLock.class);
        Ehcache cache = cacheManager.getEhcache("accessCache");
        Element element = cache.get(methodSignature.getMethod().toString());
        if(element == null){
            Element putElement = new Element(methodSignature.getMethod().toString(), "");
            putElement.setTimeToLive(accessCacheLock.expiredTime());
            cache.put(putElement);
            return joinPoint.proceed();
        }
        if (accessCacheLock.autoDelete()) {
            cache.removeElement(element);
        }
        throw new RequestAccessException("访问过于频繁，请稍后再试！");
    }
}

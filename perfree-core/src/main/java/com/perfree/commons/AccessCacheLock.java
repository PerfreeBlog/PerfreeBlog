package com.perfree.commons;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface AccessCacheLock {

    /**
     * 过期时间
     */
    int expiredTime() default 5;

    /**
     * 未过期情况下,首次访问拒绝并自动删除缓存数据,以便下次访问通过
     */
    boolean autoDelete() default true;
}

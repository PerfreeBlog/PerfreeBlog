package com.perfree.commons.annotation;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface FrontViewNodeRender {
    // 是否为page页面
    boolean isPageView() default false;
}

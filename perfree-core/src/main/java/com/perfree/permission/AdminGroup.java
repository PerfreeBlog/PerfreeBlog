package com.perfree.permission;

import com.perfree.common.Constants;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.ANNOTATION_TYPE})
@Documented
public @interface AdminGroup {
    String name();
    String groupId();
    String icon() default "fa-circle-o";
    String url() default "";
    String[] role() default {Constants.ROLE_ADMIN};
    int seq() default 99;
}

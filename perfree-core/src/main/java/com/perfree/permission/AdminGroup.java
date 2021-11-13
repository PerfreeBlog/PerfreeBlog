package com.perfree.permission;

import com.perfree.commons.Constants;

import java.lang.annotation.*;

/**
 * @description 自定义菜单Group注解
 * @author Perfree
 * @date 2021/11/11 8:36
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.ANNOTATION_TYPE})
@Documented
public @interface AdminGroup {
    /** 菜单名称 */
    String name();

    /** 菜单组id */
    String groupId();

    /** 菜单图标 */
    String icon() default "fa-circle-o";

    /** 菜单url */
    String url() default "";

    /** 菜单角色 */
    String[] role() default {Constants.ROLE_ADMIN};

    /** 菜单序号 */
    int seq() default 99;
}

package com.perfree.permission;

import com.perfree.common.Constants;

import java.lang.annotation.*;

/**
 * @description 自定义后台菜单注解
 * @author Perfree
 * @date 2021/11/10 12:57
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
@Documented
public @interface AdminMenu {
    String groupId();
    String name();
    String[] role() default {Constants.ROLE_ADMIN};
    int seq() default 99;
    int target() default Constants.MENU_TARGET_SELF;
}

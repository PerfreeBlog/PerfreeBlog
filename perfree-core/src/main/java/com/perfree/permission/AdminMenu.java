package com.perfree.permission;

import com.perfree.commons.Constants;

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
    /** 所属菜单 */
    String groupId();
    /** 菜单名称 */
    String name();
    /** 拥有此菜单的角色 */
    String[] role() default {Constants.ROLE_ADMIN};
    /** 菜单序号 */
    int seq() default 99;
    /** 菜单打开方式 */
    int target() default Constants.MENU_TARGET_SELF;
}

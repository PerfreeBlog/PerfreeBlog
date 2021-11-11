package com.perfree.permission;

import java.lang.annotation.*;

/**
 * @description 自定义菜单groups注解
 * @author Perfree
 * @date 2021/11/11 8:36
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface AdminGroups {
    /** 菜单组 */
    AdminGroup[] groups();
}

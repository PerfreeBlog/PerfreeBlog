package com.perfree.permission;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
public @interface AdminGroups {
    AdminGroup[] groups();
}

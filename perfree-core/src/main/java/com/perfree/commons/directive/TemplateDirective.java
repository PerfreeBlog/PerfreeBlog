package com.perfree.commons.directive;

import java.lang.annotation.*;

/**
 * Custom TemplateDirective,Used to identify TemplateDirective
 * @author Perfree
 */
@Target({ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface TemplateDirective {
    String value();
}
package com.perfree.plugin.annotation;

import java.lang.annotation.*;

/**
 * 定义拦截器注解，用于插件
 * @author Perfree
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
public @interface InterceptPath {

	/** 拦截的路径 */
	String [] value();

}

package com.perfree.commons;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;
import java.util.*;

/**
 * 动态注册RequestMapping
 * @author Perfree
 */
public class RegisterRequestMapping extends RequestMappingHandlerMapping {
    private final static Logger LOGGER = LoggerFactory.getLogger(RegisterRequestMapping.class);
    private static final List<MenuRequest> MENU_REQUESTS = Collections.synchronizedList(new ArrayList<>());

    /**
     * 注册RequestMapping
     * @param entry 处理类
     * @param method_name 处理方法
     * @param patternArr 规则
     */
    public static void registerRequestMapping(Class<?> entry,Method method_name, String[] patternArr){
        final RequestMappingHandlerMapping requestMappingHandlerMapping = SpringBeanUtils.getApplicationContext().getBean(RequestMappingHandlerMapping.class);
        if (method_name == null) {
            return;
        }
        if (patternArr.length == 0) {
            return;
        }
        PatternsRequestCondition patterns = new PatternsRequestCondition(patternArr);
        RequestMappingInfo mapping_info = new RequestMappingInfo("name", patterns, null, null, null, null, null, null);
        try {
            requestMappingHandlerMapping.registerMapping(mapping_info, entry.newInstance(), method_name);
            MenuRequest menuRequest = new MenuRequest();
            menuRequest.setPatternArr(patternArr);
            menuRequest.setRequestMappingInfo(mapping_info);
            menuRequest.setEntry(entry);
            menuRequest.setMethod_name(method_name);
            MENU_REQUESTS.add(menuRequest);
            LOGGER.info("url:{} 注册成功",Arrays.toString(patternArr));
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("注册requestMapping失败:{}",e.getMessage());
        }
    }

    /**
     * 解除注册RequestMapping
     * @param pattern 规则
     */
    public static void unregisterRequestMapping(String pattern){
        final RequestMappingHandlerMapping requestMappingHandlerMapping = SpringBeanUtils.getApplicationContext().getBean(RequestMappingHandlerMapping.class);
        Iterator<MenuRequest> iterator = MENU_REQUESTS.iterator();
        while(iterator.hasNext()){
            MenuRequest menuRequest = iterator.next();
            String[] patternArr = menuRequest.getPatternArr();
            List<String> patterns = Arrays.asList(patternArr);
            if (patterns.contains(pattern) || patterns.contains(urlPageIndex(pattern))){
                iterator.remove();
                List<String> arrList = new ArrayList<>(patterns);
                arrList.remove(pattern);
                arrList.remove(urlPageIndex(pattern));
                LOGGER.info("url:{},{} 已从规则中移除",pattern,urlPageIndex(pattern));
                requestMappingHandlerMapping.unregisterMapping(menuRequest.getRequestMappingInfo());
                if (arrList.size() > 0) {
                    String[] newPatterns = new String[arrList.size()];
                    menuRequest.setPatternArr(arrList.toArray(newPatterns));
                    registerRequestMapping(menuRequest.getEntry(),menuRequest.getMethod_name(), menuRequest.getPatternArr());
                    iterator = MENU_REQUESTS.iterator();
                }
            }
        }
    }

    /**
     * 判断是否为RequestMapping规则
     * @param url url
     * @return boolean
     */
    public static boolean isUrlPattern(String url){
        return url.startsWith("/");
    }

    /**
     * 获取带pageIndex的RequestMapping规则
     * @param url url
     * @return String
     */
    public static String urlPageIndex(String url){
        if (url.endsWith("/")) {
            url += "{pageIndex}";
        } else {
            url += "/{pageIndex}";
        }
        return url;
    }

}

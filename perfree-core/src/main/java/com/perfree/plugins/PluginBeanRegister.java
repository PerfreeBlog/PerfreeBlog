package com.perfree.plugins;

import com.perfree.commons.SpringBeanUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.ClassUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;

@Component
public class PluginBeanRegister {
    private final static Logger LOGGER = LoggerFactory.getLogger(PluginBeanRegister.class);


    /**
     * @description 注册controller handle
     * @param controllerName  controllerName
     * @author Perfree
     */
    public static void registerMapping(String controllerName) {
        try {
            Object controller = SpringBeanUtils.getBean(controllerName);
            RequestMappingHandlerMapping requestMappingHandlerMapping = SpringBeanUtils.getApplicationContext().getBean(RequestMappingHandlerMapping.class);
            Method method = requestMappingHandlerMapping.getClass().getSuperclass().getSuperclass().getDeclaredMethod("detectHandlerMethods",Object.class);
            method.setAccessible(true);
            method.invoke(requestMappingHandlerMapping, controllerName);
            LOGGER.info("扩展插件 => 注册controller handle:{}", controllerName);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("扩展插件 => 注册controller handle出错:{}", controllerName);
        }
    }

    /**
     * @description 取消注册 controller handle
     * @param loadClass  loadClass
     * @author Perfree
     */
    public static void unregisterController( Class<?> loadClass) {
        if (loadClass == null) {
            return;
        }
        RequestMappingHandlerMapping requestMappingHandlerMapping = (RequestMappingHandlerMapping) SpringBeanUtils.getApplicationContext()
                .getBean("requestMappingHandlerMapping");
        ReflectionUtils.doWithMethods(loadClass, method -> {
            Method specificMethod = ClassUtils.getMostSpecificMethod(method, loadClass);
            try {
                Method createMappingMethod = RequestMappingHandlerMapping.class.getDeclaredMethod("getMappingForMethod", Method.class, Class.class);
                createMappingMethod.setAccessible(true);
                RequestMappingInfo requestMappingInfo = (RequestMappingInfo)createMappingMethod.invoke(requestMappingHandlerMapping, specificMethod, loadClass);
                if (requestMappingInfo != null) {
                    requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
                    LOGGER.info("扩展插件 => 移除controller handle:{}", loadClass.getSimpleName());
                }
            } catch (Exception e) {
                e.printStackTrace();
                LOGGER.error("扩展插件 => 移除controller handle出错:{}", e.getMessage());
            }
        }, ReflectionUtils.USER_DECLARED_METHODS);
    }

    /**
     * @description 移除bean
     * @author Perfree
     */
    public static void removeBean(Class<?> loadClass) {
      try{
          if (loadClass.getAnnotation(Mapper.class) != null) {
              return;
          }
          DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) SpringBeanUtils.getApplicationContext()
                  .getAutowireCapableBeanFactory();
          defaultListableBeanFactory.destroyBean(loadClass);
          defaultListableBeanFactory.removeBeanDefinition(lowerFirstCase(loadClass.getSimpleName()));
          LOGGER.info("扩展插件 => 移除bean:{}", loadClass.getSimpleName());
      }catch (Exception e) {
          e.printStackTrace();
          LOGGER.error("扩展插件 => 移除bean:{}，出错：{}", loadClass.getSimpleName(),e.getMessage());
      }
    }

    /**
     * @description  注册bean
     * @param loadClass  loadClass
     * @author Perfree
     */
    public static void registerBeanDefinition(Class<?> loadClass ) {
        try {
            if (loadClass.getAnnotation(Mapper.class) != null) {
                SqlSessionFactory sqlSessionFactory = SpringBeanUtils.getBean(SqlSessionFactory.class);
                sqlSessionFactory.getConfiguration().addMapper(loadClass);
                LOGGER.info("扩展插件 => 注册mapper:{} 成功", loadClass.getSimpleName());
            } else {
                String beanName = lowerFirstCase(loadClass.getSimpleName());
                ApplicationContext ctx = SpringBeanUtils.getApplicationContext();
                DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) ctx.getAutowireCapableBeanFactory();
                BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(loadClass);
                defaultListableBeanFactory.registerBeanDefinition(beanName, beanDefinitionBuilder.getBeanDefinition());
                LOGGER.info("扩展插件 => 注册bean:{} 成功", beanName);
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("扩展插件 => 注册bean出错:{}", e.getMessage());
        }
    }


    /**
     * @description 首字母小写
     * @author Perfree
     */
    public static String lowerFirstCase(String str){
        char[] chars = str.toCharArray();
        chars[0] +=32;
        return String.valueOf(chars);
    }
}

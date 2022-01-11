package com.perfree.plugin.handle;

import com.perfree.commons.SpringBeanUtils;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.base.BasePluginHandle;
import com.perfree.plugin.utils.ClassUtils;
import org.pf4j.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import javax.servlet.ServletContext;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;
import javax.websocket.server.ServerContainer;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.ServerEndpointConfig;
import java.util.Map;

public class WebSocketHandle implements BasePluginHandle {
    private final static Logger LOGGER = LoggerFactory.getLogger(WebSocketHandle.class);

    ApplicationContext applicationContext;

    public WebSocketHandle(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        ServerContainer serverContainer = getServerContainer();
        if (serverContainer == null){
            return;
        }
        for (Class<?> aClass : plugin.getClassList()) {
            ServerEndpoint serverEndpoint = aClass.getAnnotation(ServerEndpoint.class);
            if (serverEndpoint == null) {
                continue;
            }
            String sourcePath = serverEndpoint.value();
            if (StringUtils.isNullOrEmpty(sourcePath)) {
                continue;
            }
            plugin.getWebsocketPaths().add(sourcePath);
            try {
                serverContainer.addEndpoint(aClass);
            } catch (Exception e) {
                plugin.getWebsocketPaths().remove(sourcePath);
                e.printStackTrace();
                LOGGER.error("Create websocket service for websocket class " + aClass.getName() + " failed.", e);
            }
        }

    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        ServerContainer serverContainer = getServerContainer();
        Map<String, Object> configExactMatchMap = ClassUtils.getReflectionField(serverContainer, "configExactMatchMap");
        Map<String, Object> endpointSessionMap = ClassUtils.getReflectionField(serverContainer, "endpointSessionMap");
        Map<Session, Session> sessions = ClassUtils.getReflectionField(serverContainer, "sessions");
        plugin.getWebsocketPaths().forEach(webSocketPath -> {
            if (configExactMatchMap != null) {
                configExactMatchMap.remove(webSocketPath);
            }

            if (endpointSessionMap != null) {
                endpointSessionMap.remove(webSocketPath);
            }

            if (sessions != null) {
                for (Map.Entry<Session, Session> entry : sessions.entrySet()) {
                    Session session = entry.getKey();
                    try {
                        if(closeSession(session, webSocketPath)){
                            sessions.remove(session);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        LOGGER.error("Close websocket session {} for path {} failure", session.getId(), webSocketPath, e);
                    }
                }
            }
        });
        plugin.getWebsocketPaths().clear();
    }

    /**
     * 关闭session
     * @param session session
     * @param websocketPath websocketPath 路径
     * @return 如果需要关闭并且关闭成功, 则返回true。 否则返回false
     * @throws Exception 关闭异常
     */
    private boolean closeSession(Session session, String websocketPath) throws Exception{
        EndpointConfig endpointConfig = ClassUtils.getReflectionField(session, "endpointConfig");
        ServerEndpointConfig perEndpointConfig = ClassUtils.getReflectionField(endpointConfig, "perEndpointConfig");
        String path = ClassUtils.getReflectionField(perEndpointConfig, "path");
        if (path.equals(websocketPath)) {
            session.close();
            LOGGER.info("Closed websocket session {} for path {}", session.getId(), websocketPath);
            return true;
        }
        return false;
    }


    /**
     * 得到 Tomcat ServerContainer
     * @return ServerContainer
     */
    private ServerContainer getServerContainer() {
        try {
            applicationContext.getBean(ServerEndpointExporter.class);
        } catch (BeansException e) {
            e.printStackTrace();
            LOGGER.debug("The required bean of {} not found, if you want to use plugin websocket, please create it.", ServerEndpointExporter.class.getName());
            return null;
        }
        ServletContext servletContext = SpringBeanUtils.getBean(ServletContext.class);
        return (ServerContainer) servletContext.getAttribute(ServerContainer.class.getName());
    }
}

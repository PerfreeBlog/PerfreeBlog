package com.perfree.controller;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.perfree.common.Constants;
import com.perfree.commons.WebSocketMsg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * websocket服务
 */
@ServerEndpoint(value = "/websocket")
@Component
public class WebSocketServer {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketServer.class);

    public static int updateState = 0;

    @PostConstruct
    public void init() {
        System.out.println("websocket 初始化");
        LOGGER.info("websocket 初始化");
    }

    private static final AtomicInteger OnlineCount = new AtomicInteger(0);
    private static final CopyOnWriteArraySet<Session> SessionSet = new CopyOnWriteArraySet<>();


    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session) {
        SessionSet.add(session);
        int cnt = OnlineCount.incrementAndGet();
        LOGGER.info("websocket: 有连接加入，当前连接数为：{}", cnt);
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        SessionSet.remove(session);
        int cnt = OnlineCount.decrementAndGet();
        LOGGER.info("websocket: 有连接关闭，当前连接数为：{}", cnt);
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session session
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println(message);
        WebSocketMsg webSocketMsg = JSONUtil.toBean(message, WebSocketMsg.class);
        if (webSocketMsg.getType() == Constants.WEBSOCKET_TYPE_UPDATE && WebSocketServer.updateState == Constants.WEBSOCKET_TYPE_UPDATE) {
            WebSocketServer.updateState = 0;
            WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "更新成功,请刷新页面重新登录!"));
        }
    }

    /**
     * 出现错误
     *
     * @param session session信息
     * @param error   错误信息
     */
    @OnError
    public void onError(Session session, Throwable error) {
        LOGGER.error("websocket: 发生错误：{}，Session ID： {}", error.getMessage(), session.getId());
    }

    /**
     * 发送消息
     *
     * @param session      session信息
     * @param webSocketMsg 信息
     */
    public static void SendMessage(Session session, WebSocketMsg webSocketMsg) {
        try {
            String message = JSONUtil.toJsonStr(webSocketMsg);
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            LOGGER.error("websocket -> 发送消息出错：{}", e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 群发消息
     *
     * @param webSocketMsg 信息
     */
    public static void BroadCastInfo(WebSocketMsg webSocketMsg) {
        for (Session session : SessionSet) {
            if (session.isOpen()) {
                SendMessage(session, webSocketMsg);
            }
        }
    }

    /**
     * 指定Session发送消息
     *
     * @param sessionId    sessionId
     * @param webSocketMsg 信息
     */
    public static void SendMessage(WebSocketMsg webSocketMsg, String sessionId) {
        Session session = null;
        for (Session s : SessionSet) {
            if (s.getId().equals(sessionId)) {
                session = s;
                break;
            }
        }
        if (session != null) {
            SendMessage(session, webSocketMsg);
        } else {
            LOGGER.warn("websocket: 没有找到指定ID的会话：{}", sessionId);
        }
    }
}

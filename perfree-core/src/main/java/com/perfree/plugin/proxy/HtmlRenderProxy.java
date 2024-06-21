package com.perfree.plugin.proxy;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jsoup.nodes.Document;


/**
 * Html渲染代理: 插件可继承该类,获取渲染的html Document对象进行操作
 */
public abstract class HtmlRenderProxy {

    /**
     * 修改渲染后的html Document
     *
     * @param document html document对象
     * @param response HttpServletResponse
     * @param request  HttpServletRequest
     * @return 修改后的 html Document
     */
    public Document editDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        return document;
    }

    /**
     * 修改渲染后的html Document(该方法只有访问地址非/admin起始时才会调用)
     *
     * @param document html document对象
     * @param response HttpServletResponse
     * @param request  HttpServletRequest
     * @return 修改后的 html Document
     */
    public Document editFrontDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        return document;
    }

    /**
     * 修改渲染后的html Document(该方法只有访问地址为/admin起始时才会调用)
     *
     * @param document html document对象
     * @param response HttpServletResponse
     * @param request  HttpServletRequest
     * @return 修改后的 html Document
     */
    public Document editAdminDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        return document;
    }
}

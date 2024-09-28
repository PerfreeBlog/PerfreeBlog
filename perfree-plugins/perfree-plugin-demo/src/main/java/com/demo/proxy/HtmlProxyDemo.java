package com.demo.proxy;

import com.perfree.plugin.proxy.HtmlRenderProxy;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;

@Component
public class HtmlProxyDemo extends HtmlRenderProxy {

    @Override
    public Document editFrontDocument(Document document, HttpServletResponse response, HttpServletRequest request) {
        document.head().append("<script>console.log('插件html代理增加的代码')</script>");
        return document;
    }
}

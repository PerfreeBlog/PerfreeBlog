package com.perfree.filter;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @description 主题预览拦截, 当请求参数存在previewTheme且非后台页面时,自动替换响应html中a标签链接,增加?previewTheme=xxx参数
 * @author Perfree
 * @date 2021/12/15 16:27
 */
@Component
public class PreviewThemeFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String previewTheme = request.getParameter("previewTheme");
        if (StringUtils.isBlank(previewTheme) || request.getRequestURI().startsWith("/admin")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);
        filterChain.doFilter(servletRequest, responseWrapper);
        byte[] responseArray = responseWrapper.getContentAsByteArray();
        String responseStr = new String(responseArray, responseWrapper.getCharacterEncoding());
        if (response.getContentType() != null && response.getContentType().contains("text/html")){
            responseStr = previewHtmlBuilder(responseStr, previewTheme);
        }
        if (StringUtils.isNotBlank(responseStr)) {
            servletResponse.getOutputStream().write(responseStr.getBytes());
        }
    }

    @Override
    public void destroy() {

    }

    private String previewHtmlBuilder(String htmlStr, String previewTheme) {
        Document html = Jsoup.parse(htmlStr);
        if (html.head().childNodeSize() == 0) {
            return htmlStr;
        }
        Elements linkElements = html.select("a");
        for (Element element : linkElements) {
            String url = element.attr("href");
            if (StringUtils.isBlank(url) || url.toLowerCase().startsWith("http")
                    || url.toLowerCase().startsWith("javascript") || url.toLowerCase().startsWith("//")) {
                element.attr("href", url);
                continue;
            }

            String baseUrl = url;
            String anchor = null;
            int anchorIndex = url.indexOf("#");
            if (anchorIndex > 0) {
                baseUrl = url.substring(0, anchorIndex);
                anchor = url.substring(anchorIndex);
            }

            StringBuilder urlBuilder = new StringBuilder(baseUrl);
            if (baseUrl.contains("?")) {
                urlBuilder.append("&previewTheme=").append(previewTheme);
            } else {
                urlBuilder.append("?previewTheme=").append(previewTheme);
            }

            if (StringUtils.isNotBlank(anchor)) {
                urlBuilder.append(anchor);
            }

            element.attr("href", urlBuilder.toString());
        }
        return html.outerHtml();
    }
}
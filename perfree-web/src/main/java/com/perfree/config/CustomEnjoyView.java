package com.perfree.config;

import com.jfinal.template.Template;
import com.jfinal.template.ext.spring.JFinalView;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.commons.CustomByteArrayOutputStream;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

public class CustomEnjoyView extends JFinalView {

    @Override
    protected void renderMergedTemplateModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession hs = request.getSession(true);
        if (hs != null) {
            model.put("session", new JFinalView.InnerSession(hs));
        }

        try {
            CustomByteArrayOutputStream cos = new CustomByteArrayOutputStream();
            Template template = JFinalViewResolver.engine.getTemplate(getUrl());
            template.render(model, cos);
            response.getWriter().write(buildHtml(cos.getInputStream(), response, request));
        } catch (Exception e) {
            Throwable cause = e.getCause();
            if (cause instanceof IOException) {
                String name = cause.getClass().getSimpleName();
                if ("ClientAbortException".equals(name) || "EofException".equals(name)) {
                    return ;
                }
            }
            throw e;
        }
    }

    /**
     * 生成返回的html
     * @param content content
     * @param response response
     * @param request request
     * @return String
     * @throws IOException IOException
     */
    public String buildHtml(InputStream content,HttpServletResponse response, HttpServletRequest request) throws IOException {
        Document doc = Jsoup.parse(content, response.getCharacterEncoding(), "");
        if (doc.head().childNodeSize() == 0) {
            return doc.body().html();
        }
        // 预览主题
        doc = buildPreviewThemeHtml(doc, response, request);
        return doc.toString();
    }

    /**
     * 预览主题处理: 请求中携带previewTheme参数为预览主题
     * @param doc doc
     * @param response response
     * @param request request
     * @return Document
     */
    public Document buildPreviewThemeHtml( Document doc,HttpServletResponse response, HttpServletRequest request){
        String previewTheme = request.getParameter("previewTheme");
        if (StringUtils.isBlank(previewTheme) || request.getRequestURI().startsWith("/admin")) {
            return doc;
        }
        Elements linkElements = doc.select("a");
        for (Element element : linkElements) {
            String url = element.attr("href");
            if (StringUtils.isBlank(url) ) {
                continue;
            }
            if (url.toLowerCase().startsWith("http") || url.toLowerCase().startsWith("javascript") || url.toLowerCase().startsWith("//")) {
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
        return doc;
    }
}

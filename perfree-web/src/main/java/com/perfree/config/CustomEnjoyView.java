package com.perfree.config;

import com.jfinal.template.Template;
import com.jfinal.template.ext.spring.JFinalView;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.commons.Constants;
import com.perfree.commons.CustomByteArrayOutputStream;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.proxy.HtmlRenderProxy;
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
        buildPreviewThemeHtml(doc, response, request);
        // 自定义Head代码
        buildHeadHtml(doc, response, request);
        // 插件proxy自定义html代码
        Map<String, PluginInfo> allPlugin = PluginHolder.getAllPlugin();
        for (String key : allPlugin.keySet()) {
            PluginInfo pluginInfo = allPlugin.get(key);
            HtmlRenderProxy htmlRenderProxy = pluginInfo.getPluginBean(HtmlRenderProxy.class);
            if (htmlRenderProxy != null) {
                doc = htmlRenderProxy.editDocument(doc, response, request);
                if (request.getRequestURI().startsWith("/admin")) {
                    doc = htmlRenderProxy.editAdminDocument(doc, response, request);
                } else {
                    doc = htmlRenderProxy.editFrontDocument(doc, response, request);
                }
            }
        }
        return doc.toString();
    }

    /**
     * 预览主题处理: 请求中携带previewTheme参数为预览主题
     * @param doc doc
     * @param response response
     * @param request request
     */
    private void buildPreviewThemeHtml(Document doc, HttpServletResponse response, HttpServletRequest request){
        String previewTheme = request.getParameter("previewTheme");
        if (StringUtils.isBlank(previewTheme) || request.getRequestURI().startsWith("/admin")) {
            return;
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
    }

    /**
     * 自定义head代码处理
     * @param doc doc
     * @param response response
     * @param request request
     */
    private void buildHeadHtml(Document doc, HttpServletResponse response, HttpServletRequest request) {
        if (request.getRequestURI().startsWith("/admin")) {
            return;
        }
        String customHead = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_CUSTOM_HEAD, "");
        doc.head().append(customHead);
    }

}

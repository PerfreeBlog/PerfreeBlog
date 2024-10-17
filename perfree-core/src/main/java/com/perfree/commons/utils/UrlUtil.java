package com.perfree.commons.utils;

import com.perfree.commons.constant.SystemConstants;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class UrlUtil {

    public static String buildUrl(String pre) {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String previewTheme = request.getParameter(SystemConstants.PREVIEW_THEME_URL);
        if (StringUtils.isNotBlank(previewTheme)) {
            return pre + "?previewTheme=" + previewTheme;
        }

        String referer = request.getHeader("Referer");
        if (StringUtils.isNotBlank(referer)) {
            try {
                URI uri = new URI(referer);
                Map<String, String> queryParams = getQueryParams(uri.getQuery());
                previewTheme = queryParams.get("previewTheme");
                if (StringUtils.isNotBlank(previewTheme)) {
                    return pre + "?previewTheme=" + previewTheme;
                }
                return pre;
            } catch (Exception e) {
                return pre;
            }
        }
        return pre;
    }

    // 解析查询参数的方法
    private static Map<String, String> getQueryParams(String query) {
        Map<String, String> queryPairs = new HashMap<>();
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int idx = pair.indexOf("=");
            queryPairs.put(pair.substring(0, idx), pair.substring(idx + 1));
        }
        return queryPairs;
    }
}

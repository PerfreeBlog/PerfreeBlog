package com.perfree.commons.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ServletUtils {

    // 添加Cookie
    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/"); // 设置Cookie的路径
        cookie.setMaxAge(maxAge); // 设置有效期，单位为秒
        response.addCookie(cookie);
    }

    // 获取指定名称的Cookie值
    public static String getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    // 删除Cookie
    public static void deleteCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/"); // 确保路径一致
        cookie.setMaxAge(0); // 将过期时间设置为0，表示删除
        response.addCookie(cookie);
    }
}

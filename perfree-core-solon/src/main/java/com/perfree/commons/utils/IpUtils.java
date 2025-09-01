package com.perfree.commons.utils;
import jakarta.servlet.http.HttpServletRequest;

public class IpUtils {

    /**
     * 获取请求者IP地址，考虑到可能通过代理服务器
     *
     * @param request HttpServletRequest 对象
     * @return 请求者IP地址
     */
    public static String getClientIp(HttpServletRequest request) {
        String ip = null;

        try {
            // X-Forwarded-For 用于判断代理后的真实 IP
            ip = request.getHeader("X-Forwarded-For");
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                // X-Forwarded-For 可能包含多个 IP 地址，第一个为客户端真实 IP
                if (ip.contains(",")) {
                    ip = ip.split(",")[0];
                }
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("Proxy-Client-IP");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("WL-Proxy-Client-IP");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_CLIENT_IP");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getHeader("HTTP_X_FORWARDED_FOR");
            }
            if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
                ip = request.getRemoteAddr(); // 最终获取远程 IP
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ip;
    }
}

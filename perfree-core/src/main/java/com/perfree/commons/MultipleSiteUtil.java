package com.perfree.commons;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class MultipleSiteUtil {

    public static Long currentSite() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/multiple")) {
            return 2L;
        } else {
            return 1L;
        }
    }
}

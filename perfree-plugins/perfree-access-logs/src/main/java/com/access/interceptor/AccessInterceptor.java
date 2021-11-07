package com.access.interceptor;

import com.perfree.commons.IpUtil;
import com.access.model.AccessLogs;
import com.access.service.AccessLogsService;
import eu.bitwalker.useragentutils.UserAgent;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Component
public class AccessInterceptor implements HandlerInterceptor {
    @Autowired
    private AccessLogsService accessLogsService;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        CacheManager cacheManager = CacheManager.getInstance();
        Ehcache cache = cacheManager.getEhcache("access_log");
        if (cache == null) {
            cacheManager.addCache("access_log");
            addCache(cacheManager.getEhcache("access_log"), request);
        } else {
            addCache(cache, request);
        }
    }

    public void addCache(Ehcache cache, HttpServletRequest request){
        Element element = cache.get(request.getRemoteAddr());
        if(element==null){
            UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
            AccessLogs accessLogs = new AccessLogs();
            accessLogs.setBrowserGroup(userAgent.getBrowser().getGroup().toString());
            accessLogs.setBrowserName(userAgent.getBrowser().getName());
            accessLogs.setBrowserVersion(userAgent.getBrowserVersion().getVersion());

            accessLogs.setIp(IpUtil.getIpAddr(request));
            accessLogs.setSystemGroup(userAgent.getOperatingSystem().getGroup().toString());
            accessLogs.setSystemInfo(userAgent.getOperatingSystem().getName());
            accessLogs.setSystemType(userAgent.getOperatingSystem().getDeviceType().toString());
            accessLogs.setDate(new Date());
            accessLogsService.addAccess(accessLogs);
            cache.put(new Element(request.getRemoteAddr(), ""));
        }
    }
}

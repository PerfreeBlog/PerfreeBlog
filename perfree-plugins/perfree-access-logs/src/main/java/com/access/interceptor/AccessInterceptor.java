package com.access.interceptor;

import com.access.model.AccessLogs;
import com.access.service.AccessLogsService;
import com.perfree.plugin.annotation.InterceptPath;
import eu.bitwalker.useragentutils.UserAgent;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import net.sf.ehcache.config.CacheConfiguration;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;

@InterceptPath("/**")
public class AccessInterceptor implements HandlerInterceptor {
    @Autowired
    private AccessLogsService accessLogsService;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        try{
            CacheManager cacheManager = CacheManager.getInstance();
            Ehcache cache = cacheManager.getEhcache("access_logs");
            if (cache == null) {
                CacheConfiguration cacheConfiguration = new CacheConfiguration();
                cacheConfiguration.timeToIdleSeconds(60 * 10);
                cacheConfiguration.setName("access_logs");
                cacheConfiguration.eternal(false);
                cacheConfiguration.timeToLiveSeconds(60 * 10);
                cacheConfiguration.setMaxBytesLocalHeap("50M");
                Cache accessLogsCache = new Cache(cacheConfiguration);
                cacheManager.addCache(accessLogsCache);
                addCache(cacheManager.getEhcache("access_logs"), request);
            } else {
                addCache(cache, request);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void addCache(Ehcache cache, HttpServletRequest request){
        Element element = cache.get(getIpAddress(request));
        if(element==null){
            UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader("User-Agent"));
            AccessLogs accessLogs = new AccessLogs();
            accessLogs.setBrowserGroup(userAgent.getBrowser().getGroup().toString());
            accessLogs.setBrowserName(userAgent.getBrowser().getName());
            accessLogs.setBrowserVersion(userAgent.getBrowserVersion().getVersion());

            accessLogs.setIp(getIpAddress(request));
            accessLogs.setSystemGroup(userAgent.getOperatingSystem().getGroup().toString());
            accessLogs.setSystemInfo(userAgent.getOperatingSystem().getName());
            accessLogs.setSystemType(userAgent.getOperatingSystem().getDeviceType().toString());
            accessLogs.setDate(new Date());
            accessLogsService.addAccess(accessLogs);
            cache.put(new Element(getIpAddress(request), accessLogs));
        }
    }

    public String getIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-requested-For");
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-For");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        if (ip != null && ip.contains(",")) {
            String[] ips = ip.split(",");

            for(int index = 0; index < ips.length; ++index) {
                String strIp = ips[index];
                if (!"unknown".equalsIgnoreCase(strIp)) {
                    ip = strIp;
                    break;
                }
            }
        }

        return ip;
    }
}

package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.service.rss.RssService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.io.Writer;

@Tag(name = "系统页面视图相关")
@Controller
public class SystemController extends BaseViewController {

    @Resource
    private RssService rssService;

    @GetMapping("/")
    @Operation(summary = "首页")
    @FrontViewNodeRender
    public String index() {
        return themeView("index.html");
    }

    @GetMapping("/rss")
    @Operation(summary = "rss")
    public void rss(HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.APPLICATION_XML_VALUE);
        Writer writer = response.getWriter();
        writer.append(rssService.genRss());
    }

    @GetMapping("/robots.txt")
    @Operation(summary = "robots.txt")
    public void robotsTxt(HttpServletResponse response) throws IOException {
        Writer writer = response.getWriter();
        String lineSeparator = System.getProperty("line.separator", "\n");
        writer.append("User-agent: *").append(lineSeparator);
        writer.append("Disallow:").append("/admin/*").append(lineSeparator);
    }

    @GetMapping("/logout")
    @Operation(summary = "退出登录")
    public String logout(HttpServletRequest request, @RequestParam(value = "redirectPath", required = false) String redirectPath) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        if (StringUtils.isNotBlank(redirectPath)){
            return "redirect:" + redirectPath;
        }
        return "redirect:/";
    }
}

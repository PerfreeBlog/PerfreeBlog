package com.perfree.controller.admin;

import com.perfree.common.Constants;
import com.perfree.common.OptionCache;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Theme;
import com.perfree.service.ThemeService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={"admin","superAdmin"}, logical= Logical.OR)
public class ThemeController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(ThemeController.class);
    @Autowired
    private ThemeService themeService;

    @GetMapping("/theme")
    public String themePage(Model model){
        List<Theme> themeList = themeService.getAllTheme();
        model.addAttribute("themeList",themeList);
        return view("static/admin/pages/theme/theme.html");
    }

    @PostMapping("/theme/switch")
    @ResponseBody
    public ResponseBean switchTheme(@RequestBody Theme theme){
        if (themeService.switchTheme(theme) > 0) {
            OptionCache.setOption(Constants.OPTION_WEB_THEME, theme.getPath());
            return ResponseBean.success("主题切换成功", null);
        }
        return ResponseBean.fail("主题切换失败", null);
    }

    @GetMapping("/theme/setting")
    public String settingPage(){
        return view("/setting.html", "/setting.html", "static/admin/pages/theme/setting.html");

    }

    /**
     * 卸载主题
     * @param theme theme
     * @return ResponseBean
     */
    @PostMapping("/theme/del")
    @ResponseBody
    public ResponseBean delTheme(@RequestBody Theme theme){
        if (themeService.delTheme(theme)) {
            return ResponseBean.success("主题卸载成功", null);
        }
        return ResponseBean.fail("主题卸载失败", null);
    }

    /**
     * 安装主题
     * @return String
     */
    @PostMapping("/theme/addTheme")
    @ResponseBody
    public ResponseBean addTheme(HttpServletRequest request) {
        try{
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile multiFile = multipartRequest.getFile("file");
            if (multiFile == null){
                return ResponseBean.fail("文件不能为空", null);
            }
            if (themeService.addTheme(multiFile)) {
                return ResponseBean.success("主题安装成功", null);
            }
            return ResponseBean.fail("主题安装失败,格式不正确", null);
        }catch (Exception e){
            logger.error("主题安装失败: {}", e.getMessage());
            return ResponseBean.fail("主题安装失败", e.getMessage());
        }
    }
}
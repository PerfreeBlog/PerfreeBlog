package com.perfree.controller.admin;

import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.io.file.FileWriter;
import com.perfree.commons.Constants;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.model.Theme;
import com.perfree.model.TreeNode;
import com.perfree.permission.AdminMenu;
import com.perfree.service.ThemeService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
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
import java.io.File;
import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={"admin"}, logical= Logical.OR)
public class ThemeController extends BaseController {
    private static final CacheManager cacheManager = CacheManager.newInstance();
    private final Logger logger = LoggerFactory.getLogger(ThemeController.class);
    @Autowired
    private ThemeService themeService;

    @GetMapping("/theme")
    @AdminMenu(name = "所有主题", seq = 1, groupId = Constants.ADMIN_MENU_GROUP_THEME)
    public String themePage(Model model){
        List<Theme> themeList = themeService.getAllTheme();
        model.addAttribute("themeList",themeList);
        return view("static/admin/pages/theme/theme.html");
    }

    @GetMapping("/theme/edit")
    public String themeEditPage(String path,Model model){
        Theme theme = themeService.getThemeByPath(path);
        File file = new File(theme.getAbsolutePath() + Constants.SEPARATOR + "index.html");
        if (file.exists()) {
            FileReader fileReader = new FileReader(file);
            model.addAttribute("content", fileReader.readString());
            model.addAttribute("currEditFile", "index.html");
            model.addAttribute("currEditFilePath", file.getAbsolutePath());
        }
        model.addAttribute("theme", theme);
        return view("static/admin/pages/theme/edit.html");
    }

    @PostMapping("/theme/switch")
    @ResponseBody
    public ResponseBean switchTheme(@RequestBody Theme theme){
        if (themeService.switchTheme(theme) > 0) {
            Ehcache cache = cacheManager.getEhcache("optionData");
            cache.put(new Element(Constants.OPTION_WEB_THEME, theme.getPath()));
            return ResponseBean.success("主题切换成功", null);
        }
        return ResponseBean.fail("主题切换失败", null);
    }

    @GetMapping("/theme/setting")
    @AdminMenu(name = "主题设置", seq = 2, groupId = Constants.ADMIN_MENU_GROUP_THEME)
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
     * 根据主题path获取文件列表
     * @param path path
     * @return ResponseBean
     */
    @PostMapping("/theme/getFileListByTheme")
    @ResponseBody
    public ResponseBean getFileListByTheme(@RequestParam("path") String path){
        List<TreeNode> themeFiles = themeService.getFileListByTheme(path);
        return ResponseBean.success("数据加载成功", themeFiles);
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


    @PostMapping("/theme/getFileContent")
    @ResponseBody
    public ResponseBean getFileContent(@RequestParam("path") String path){
        File file = new File(path);
        if (file.exists()) {
            FileReader fileReader = new FileReader(file);
            return ResponseBean.success("数据加载成功", fileReader.readString());
        } else {
            return ResponseBean.fail("文件不存在", null);
        }
    }

    @PostMapping("/theme/saveFileContent")
    @ResponseBody
    public ResponseBean saveFileContent(@RequestParam("path") String path, @RequestParam("content") String content){
        File file = new File(path);
        if (file.exists()) {
            FileWriter writer = new FileWriter(file);
            writer.write(content);
            return ResponseBean.success("文件保存成功", null);
        } else {
            return ResponseBean.fail("文件不存在", null);
        }
    }
}
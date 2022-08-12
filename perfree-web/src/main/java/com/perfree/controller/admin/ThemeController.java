package com.perfree.controller.admin;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.file.FileReader;
import cn.hutool.core.io.file.FileWriter;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.setting.dialect.Props;
import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Theme;
import com.perfree.model.ThemeFile;
import com.perfree.model.TreeNode;
import com.perfree.permission.AdminMenu;
import com.perfree.service.ThemeService;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
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
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class ThemeController extends BaseController {
    private static final CacheManager cacheManager = CacheManager.newInstance();
    private final Logger logger = LoggerFactory.getLogger(ThemeController.class);
    @Autowired
    private ThemeService themeService;

    @GetMapping("/theme")
    @AdminMenu(name = "所有主题", seq = 1, groupId = Constants.ADMIN_MENU_GROUP_THEME)
    public String themePage(){
        return view("static/admin/pages/theme/theme.html");
    }

    @GetMapping("/theme/themeList")
    @ResponseBody
    public ResponseBean themeList(){
        List<Theme> themeList = themeService.getAllTheme();
        return ResponseBean.success("success", themeList);
    }


    @GetMapping("/theme/createThemePage")
    public String createThemePage(Model model){
        return view("static/admin/pages/theme/createTheme.html");
    }

    @GetMapping("/theme/edit")
    public String themeEditPage(String path,Model model){
        Theme theme = themeService.getThemeByPath(path);
        File file = new File(theme.getAbsolutePath() + Constants.SEPARATOR + "index.html");
        if (file.exists()) {
            FileReader fileReader = new FileReader(file);
            model.addAttribute("content", fileReader.readString());
            model.addAttribute("currEditFile", "index.html");
            model.addAttribute("currEditFilePath", theme.getPath() + Constants.SEPARATOR + "index.html");
        }
        model.addAttribute("theme", theme);
        return view("static/admin/pages/theme/edit.html");
    }

    @PostMapping("/theme/switch")
    @ResponseBody
    public ResponseBean switchTheme(@RequestBody Theme theme){
        if (themeService.switchTheme(theme) > 0) {
            Theme themeByPath = themeService.getThemeByPath(theme.getPath());
            Ehcache cache = cacheManager.getEhcache("optionData");
            cache.put(new Element(Constants.OPTION_WEB_THEME, theme.getPath()));
            cache.put(new Element(Constants.OPTION_WEB_THEME_TYPE, themeByPath.getType()), true);

            // angular/vue/node/react类型处理
            if ("angular".equals(themeByPath.getType()) || "vue".equals(themeByPath.getType())
                    || "node".equals(themeByPath.getType()) || "react".equals(themeByPath.getType())) {
                themeService.nodeThemeHandle(themeByPath, themeService.getThemeDir(theme.getPath()));
            } else {
                File themeResources = new File(Constants.PROD_THEMES_RESOURCES_PATH);
                FileUtil.clean(themeResources);
            }
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
        File file = themeService.getThemeDir(path);
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
        File file = themeService.getThemeDir(path);
        if (file.exists()) {
            FileWriter writer = new FileWriter(file);
            writer.write(content);
            return ResponseBean.success("文件保存成功", null);
        } else {
            return ResponseBean.fail("文件不存在", null);
        }
    }

    @PostMapping("/theme/createFileOrDir")
    @ResponseBody
    public ResponseBean createFileOrDir(@RequestParam("fileName") String fileName, @RequestParam("theme") String theme,
                                        @RequestParam("filePath") String filePath, @RequestParam("type") String type,
                                        @RequestParam("path") String path){
        try{
            ThemeFile themeFile = themeService.createFileOrDir(fileName,theme,filePath,type, path);
            if (themeFile != null) {
                return ResponseBean.success("创建成功", themeFile);
            }
        }catch (Exception e) {
            logger.error("主题编辑-创建: {}", e.getMessage());
            e.printStackTrace();
        }
        return ResponseBean.fail("创建失败", null);
    }

    @PostMapping("/theme/reNameFile")
    @ResponseBody
    public ResponseBean reNameFile(@RequestParam("filePath") String filePath, @RequestParam("newName") String newName,
                                   @RequestParam("theme") String theme, @RequestParam("id") String id,
                                   @RequestParam("path") String path){
        try{
            HashMap<String, Object> result = themeService.reNameFile(filePath, newName, theme, id, path);
            return ResponseBean.success("重命名成功", result);
        }catch (Exception e) {
            logger.error("主题编辑-重命: {}", e.getMessage());
            e.printStackTrace();
        }
        return ResponseBean.fail("重命名失败", null);
    }

    @PostMapping("/theme/deleteFile")
    @ResponseBody
    public ResponseBean deleteFile(@RequestParam("path") String path){
        try{
            File file = themeService.getThemeDir(path);
            boolean del = FileUtil.del(file.getAbsolutePath());
            if (del) {
                return ResponseBean.success("删除成功", null);
            }
        }catch (Exception e) {
            logger.error("主题编辑-删除: {}", e.getMessage());
            e.printStackTrace();
        }
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 文件上传
     * @return String
     */
    @PostMapping("/theme/uploadFile")
    @ResponseBody
    public ResponseBean uploadFile(HttpServletRequest request,@RequestParam(value = "path") String path,  @RequestParam(value = "id") String id) {
        try{
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile multiFile = multipartRequest.getFile("file");
            if (multiFile == null){
                logger.error("文件不能为空!");
                return ResponseBean.fail("文件不能为空!", null);
            }
            String multiFileName = multiFile.getOriginalFilename();
            if (StringUtils.isBlank(multiFileName)){
                logger.error("文件名不能为空!");
                return ResponseBean.fail("文件名不能为空!", null);
            }
            File file = new File(themeService.getThemeDir(path) + File.separator + multiFileName);

            if (file.exists()) {
                logger.error("文件已存在!");
                return ResponseBean.fail("文件已存在!", null);
            }
            multiFile.transferTo(file.getAbsoluteFile());

            ThemeFile themeFile = new ThemeFile();
            themeFile.setFilePath(file.getAbsolutePath());
            themeFile.setFileName(file.getName());
            themeFile.setPath(path + Constants.SEPARATOR + file.getName());
            TreeNode treeNode = new TreeNode();
            treeNode.setTitle(file.getName());
            treeNode.setId(IdUtil.simpleUUID());
            treeNode.setPid(id);
            if (file.isDirectory()) {
                themeFile.setFileType("dir");
            } else {
                if (file.getName().contains(".")) {
                    themeFile.setFileType(file.getName().substring(file.getName().lastIndexOf(".")).replace(".",""));
                } else {
                    themeFile.setFileType("other");
                }
            }
            treeNode.setObj(themeFile);
            return ResponseBean.success("上传失败", treeNode);
        }catch (Exception e){
            logger.error("上传失败: {}", e.getMessage());
            return ResponseBean.fail("上传失败", e.getMessage());
        }
    }

    /**
     * 添加标签
     * @return String
     */
    @PostMapping("/theme/createTheme")
    @ResponseBody
    public ResponseBean createTheme(@RequestBody Theme theme) {
        File themeFile = new File(Constants.PROD_THEMES_PATH + Constants.SEPARATOR + theme.getPath());
        if (themeFile.exists()) {
            return ResponseBean.fail("主题已存在!", null);
        }
        boolean result = themeService.createTheme(theme);
        if (result) {
            return ResponseBean.success("主题创建成功", null);
        }
        return ResponseBean.fail("主题创建失败", null);
    }
}
package com.perfree.controller.admin;

import com.perfree.base.BaseController;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Plugin;
import com.perfree.service.PluginService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * @description 插件
 * @author Perfree
 * @date 2021/8/13 13:46
 */
@RequestMapping("/admin")
@Controller
// @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class PluginController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(PluginController.class);

    @Resource
    private PluginService pluginService;

    /**
     * @description 插件页
     * @author Perfree
     */
    @RequestMapping("/plugin")
    public String index() {
        return view("static/admin/pages/plugin/plugin_list.html");
    }

    /**
     * 安装插件
     * @return String
     */
    @PostMapping("/plugin/addPlugin")
    @ResponseBody
    public ResponseBean addPlugin(HttpServletRequest request) {
        try{
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile multiFile = multipartRequest.getFile("file");
            if (multiFile == null){
                return ResponseBean.fail("文件不能为空", null);
            }
            return pluginService.addPlugin(multiFile);
        }catch (Exception e){
            logger.error("插件安装失败: {}", e.getMessage());
            return ResponseBean.fail("插件安装失败", e.getMessage());
        }
    }

    /**
     * 插件列表数据
     * @return String
     */
    @PostMapping("/plugin/list")
    @ResponseBody
    public Pager<Plugin> list(@RequestBody Pager<Plugin> pager) {
        return pluginService.list(pager);
    }

    /**
     * 删除插件
     * @return String
     */
    @PostMapping("/plugin/del")
    @ResponseBody
    public ResponseBean del(@RequestBody String id) {
        if (pluginService.del(id)) {
            return ResponseBean.success("卸载成功", null);
        }
        logger.error("卸载失败: {}", id);
        return ResponseBean.fail("卸载失败", null);
    }

    /**
     * 启用插件
     * @return String
     */
    @PostMapping("/plugin/startPlugin")
    @ResponseBody
    public ResponseBean startPlugin(@RequestBody String id) {
        if (pluginService.startPlugin(id)) {
            return ResponseBean.success("启用成功", null);
        }
        logger.error("启用失败: {}", id);
        return ResponseBean.fail("启用失败", null);
    }

    @PostMapping("/plugin/stopPlugin")
    @ResponseBody
    public ResponseBean stopPlugin(@RequestBody String id) {
        if (pluginService.stopPlugin(id)) {
            return ResponseBean.success("禁用成功", null);
        }
        logger.error("禁用失败: {}", id);
        return ResponseBean.fail("禁用失败", null);
    }
}

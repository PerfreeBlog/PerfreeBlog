package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Link;
import com.perfree.model.Plugin;
import com.perfree.service.PluginService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;

/**
 * @description 插件
 * @author Perfree
 * @date 2021/8/13 13:46
 */
@RequestMapping("/admin")
@Controller
@RequiresRoles(value={"admin"}, logical= Logical.OR)
public class PluginController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(PluginController.class);

    @Autowired
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
}

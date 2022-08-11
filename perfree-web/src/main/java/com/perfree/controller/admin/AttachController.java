package com.perfree.controller.admin;

import cn.hutool.core.io.FileTypeUtil;
import cn.hutool.core.map.MapUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.file.FileHandles;
import com.perfree.file.FileResult;
import com.perfree.model.Attach;
import com.perfree.permission.AdminMenu;
import com.perfree.plugin.proxy.AttachProxy;
import com.perfree.plugin.utils.PluginsUtils;
import com.perfree.service.AttachService;
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
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 附件
 */
@Controller
@RequestMapping("/admin")
public class AttachController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(AttachController.class);

    @Autowired
    private AttachService attachService;

    @Autowired
    private FileHandles fileHandles;

    /**
     * 附件-图片选择页
     * @return String
     */
    @RequestMapping("/attach/img")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public String attachImg() {
        return view("static/admin/pages/attach/attach_img.html");
    }

    /**
     * 附件-视频选择页
     * @return String
     */
    @RequestMapping("/attach/video")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public String attachVideo() {
        return view("static/admin/pages/attach/attach_video.html");
    }

    /**
     * 附件-附件选择页
     * @return String
     */
    @RequestMapping("/attach/attach")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public String attachAttach() {
        return view("static/admin/pages/attach/attach_attach.html");
    }

    /**
     * 文件上传
     * @return String
     */
    @PostMapping("/attach/upload")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public ResponseBean upload(HttpServletRequest request,
                               @RequestParam(required = false, value = "desc") String desc,
                               @RequestParam(required = false, value = "flag") String flag) {
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
            String suffix = multiFileName.substring(multiFileName.lastIndexOf("."));
            String type = FileUtil.getFileType(FileTypeUtil.getType(multiFile.getInputStream()),suffix);
            FileResult fileResult = fileHandles.upload(multiFile, "attach");
            Attach attach = new Attach();
            attach.setName(multiFileName);
            attach.setSuffix(suffix);
            attach.setPath(fileResult.getUrl());
            attach.setType(type);
            attach.setFlag(flag);
            attach.setDesc(desc);
            attach.setFileKey(fileResult.getKey());
            attach.setSaveType(fileResult.getType());

            List<AttachProxy> allPluginProxyClass = PluginsUtils.getAllPluginProxyClass(AttachProxy.class);
            for (AttachProxy attachProxy : allPluginProxyClass) {
                attach = attachProxy.attachSaveBefore(attach);
            }
            if (attachService.add(attach) > 0){
                for (AttachProxy attachProxy : allPluginProxyClass) {
                    attach = attachProxy.attachSaveAfter(attach);
                }
                return ResponseBean.success("上传成功", attach);
            } else {
                logger.error("上传失败: {}",attach.toString());
                return ResponseBean.fail("上传失败",null);
            }
        }catch (Exception e){
            logger.error("上传失败: {}", e.getMessage());
            return ResponseBean.fail("上传失败:["+e.getMessage()+"]", e.getMessage());
        }
    }

    /**
     * 文件上传
     * @return String
     */
    @PostMapping("/attach/ckEditorUpload")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public Map<String, Object> ckEditorUpload(HttpServletRequest request) {
        try{
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile multiFile = multipartRequest.getFile("upload");
            if (multiFile == null){
                logger.error("文件不能为空!");
                return MapUtil.builder(new HashMap<String, Object>())
                        .put("error", MapUtil.builder(new HashMap<String, Object>()).put("message","文件不能为空!").build())
                        .build();
            }

            String multiFileName = multiFile.getOriginalFilename();
            if (StringUtils.isBlank(multiFileName)){
                logger.error("文件名不能为空!");
                return MapUtil.builder(new HashMap<String, Object>())
                        .put("error", MapUtil.builder(new HashMap<String, Object>()).put("message","文件名不能为空!").build())
                        .build();
            }
            String suffix = multiFileName.substring(multiFileName.lastIndexOf("."));
            String type = FileUtil.getFileType(FileTypeUtil.getType(multiFile.getInputStream()),suffix);
            FileResult fileResult = fileHandles.upload(multiFile, "attach");
            Attach attach = new Attach();
            attach.setName(multiFileName);
            attach.setSuffix(suffix);
            attach.setPath(fileResult.getUrl());
            attach.setType(type);
            attach.setFileKey(fileResult.getKey());
            attach.setSaveType(fileResult.getType());

            List<AttachProxy> allPluginProxyClass = PluginsUtils.getAllPluginProxyClass(AttachProxy.class);
            for (AttachProxy attachProxy : allPluginProxyClass) {
                attach = attachProxy.attachSaveBefore(attach);
            }
            if (attachService.add(attach) > 0){
                for (AttachProxy attachProxy : allPluginProxyClass) {
                    attach = attachProxy.attachSaveAfter(attach);
                }
                return MapUtil.builder(new HashMap<String, Object>())
                        .put("url",attach.getUrl()).build();
            } else {
                logger.error("上传失败: {}",attach.toString());
                return MapUtil.builder(new HashMap<String, Object>())
                        .put("error", MapUtil.builder(new HashMap<String, Object>()).put("message","上传失败!").build())
                        .build();
            }
        }catch (Exception e){
            logger.error("上传失败: {}", e.getMessage());
            return MapUtil.builder(new HashMap<String, Object>())
                    .put("error", MapUtil.builder(new HashMap<String, Object>()).put("message","上传失败!").build())
                    .build();
        }
    }

    /**
     * 附件管理列表数据
     * @return String
     */
    @PostMapping("/attach/list")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public Pager<Attach> list(@RequestBody Pager<Attach> pager) {
        return attachService.list(pager);
    }

    /**
     * 附件管理列表页
     * @return String
     */
    @RequestMapping("/attach")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    @AdminMenu(name = "附件管理", seq = 7, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR})
    public String index() {
        return view("static/admin/pages/attach/attach_list.html");
    }

    /**
     * 附件上传页
     * @return String
     */
    @RequestMapping("/attach/uploadPage")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public String uploadPage() {
        return view("static/admin/pages/attach/attach_upload.html");
    }

    /**
     * 编辑附件信息页
     * @return String
     */
    @GetMapping("/attach/editPage/{id}")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public String editPage(@PathVariable("id") String id, Model model) {
        Attach attach = attachService.getById(id);
        model.addAttribute("attach", attach);
        return view("static/admin/pages/attach/attach_edit.html");
    }

    /**
     * 下载文件
     * @param response response
     * @param id id
     * @return String
     */
    @GetMapping("/attach/download/{id}")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public String downloadFile(HttpServletResponse response, @PathVariable("id") String id) {
        Attach attach = attachService.getById(id);
        response.setHeader("Content-Type", "application/octet-stream;charset=utf-8");
        response.setContentType("application/force-download");
        try{
            response.addHeader("Content-Disposition", "attachment;fileName="+ URLEncoder.encode(attach.getName(), "UTF-8"));
            fileHandles.download(attach, response);
            return "下载成功";
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
        return "下载失败";
    }

    /**
     * 删除附件
     * @return String
     */
    @PostMapping("/attach/del")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (attachService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("附件删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 更新附件信息
     * @return ResponseBean
     */
    @PostMapping("/attach/update")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean update(@RequestBody Attach attach) {
        if (attachService.update(attach) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("附件更新失败: {}", attach.toString());
        return ResponseBean.fail("更新失败", null);
    }
}

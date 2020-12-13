package com.perfree.controller.admin;

import cn.hutool.core.io.FileTypeUtil;
import com.perfree.commons.FileUtil;
import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Attach;
import com.perfree.service.AttachService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

/**
 * 附件
 */
@Controller
@RequestMapping("/admin")
public class AttachController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(AttachController.class);
    @Value("${web.upload-path}")
    private String uploadPath;

    @Autowired
    private AttachService attachService;

    /**
     * 附件-图片选择页
     * @return String
     */
    @RequestMapping("/attach/img")
    public String attachImg() {
        return "admin/pages/attach/attach_img";
    }

    /**
     * 附件-视频选择页
     * @return String
     */
    @RequestMapping("/attach/video")
    public String attachVideo() {
        return "admin/pages/attach/attach_video";
    }

    /**
     * 文件上传
     * @return String
     */
    @PostMapping("/attach/upload")
    @ResponseBody
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
            String suffix = multiFileName.substring(multiFileName.indexOf("."));
            String type = FileUtil.getFileType(FileTypeUtil.getType(multiFile.getInputStream()),suffix);
            String path = FileUtil.uploadMultiFile(multiFile, uploadPath, "attach");
            Attach attach = new Attach();
            attach.setName(multiFileName);
            attach.setSuffix(suffix);
            attach.setPath(path);
            attach.setType(type);
            attach.setFlag(flag);
            attach.setDesc(desc);
            if (attachService.add(attach) > 0){
                return ResponseBean.success("上传成功", attach);
            } else {
                logger.error("上传失败: {}",attach.toString());
                return ResponseBean.fail("上传失败",null);
            }
        }catch (Exception e){
            logger.error("上传失败: {}", e.getMessage());
            return ResponseBean.fail("上传失败", e.getMessage());
        }
    }

    /**
     * 附件管理列表数据
     * @return String
     */
    @PostMapping("/attach/list")
    @ResponseBody
    public Pager<Attach> list(@RequestBody Pager<Attach> pager) {
        return attachService.list(pager);
    }

    /**
     * 附件管理列表页
     * @return String
     */
    @RequestMapping("/attach")
    public String index() {
        return "admin/pages/attach/attach_list";
    }

    /**
     * 附件上传页
     * @return String
     */
    @RequestMapping("/attach/uploadPage")
    public String uploadPage() {
        return "admin/pages/attach/attach_upload";
    }

    /**
     * 编辑附件信息页
     * @return String
     */
    @GetMapping("/attach/editPage/{id}")
    public String editPage(@PathVariable("id") String id, Model model) {
        Attach attach = attachService.getById(id);
        model.addAttribute("attach", attach);
        return "admin/pages/attach/attach_edit";
    }

    /**
     * 下载文件
     * @param response response
     * @param id id
     * @return String
     */
    @GetMapping("/attach/download/{id}")
    @ResponseBody
    public String downloadFile(HttpServletResponse response, @PathVariable("id") String id) {
        Attach attach = attachService.getById(id);
        File file = new File(uploadPath + attach.getPath());
        if (file.exists()) {
            response.setHeader("Content-Type", "application/octet-stream;charset=utf-8");
            response.setContentType("application/force-download");
            byte[] buffer = new byte[1024];
            FileInputStream fis = null;
            BufferedInputStream bis = null;
            try{
                response.addHeader("Content-Disposition", "attachment;fileName="+ URLEncoder.encode(attach.getName(), "UTF-8"));
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                OutputStream outputStream = response.getOutputStream();
                int i = bis.read(buffer);
                while (i != -1) {
                    outputStream.write(buffer, 0 , i);
                    i = bis.read(buffer);
                }
                return "下载成功";
            } catch (Exception e) {
                e.printStackTrace();
                logger.error(e.getMessage());
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                        logger.error(e.getMessage());
                    }
                }
                if (fis != null) {
                    try {
                        fis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                        logger.error(e.getMessage());
                    }
                }
            }
        }
        return "下载失败";
    }

    /**
     * 删除附件
     * @return String
     */
    @PostMapping("/attach/del")
    @ResponseBody
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
    public ResponseBean update(@RequestBody Attach attach) {
        if (attachService.update(attach) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("附件更新失败: {}", attach.toString());
        return ResponseBean.fail("更新失败", null);
    }
}

package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.common.StringUtil;
import com.perfree.controller.BaseController;
import com.perfree.model.Tag;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 用户相关
 * @author Perfree
 */
@Controller
@RequestMapping("/admin")
public class UserController extends BaseController {

    @Value("${web.upload-path}")
    private String uploadPath;

    @Autowired
    private UserService userService;

    /**
     * 用户管理列表页
     * @return String
     */
    @RequestMapping("/user")
    public String index() {
        return "admin/pages/user/user_list";
    }

    /**
     * 用户添加页
     * @return String
     */
    @RequestMapping("/user/addPage")
    public String addPage() {
        return "admin/pages/user/user_add";
    }

    /**
     * 头像上传
     * @return String
     */
    @PostMapping("/user/uploadImg")
    @ResponseBody
    public ResponseBean uploadImg(HttpServletRequest request) {
        try{
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile multiFile = multipartRequest.getFile("file");
            String multiFileName = multiFile.getOriginalFilename();
            String suffix = multiFileName.substring(multiFileName.indexOf("."));
            String filename = StringUtil.getUUID() + suffix;
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            String dirPath = "/avatar/" + formatter.format(new Date()) + "/";
            File dir = new File(uploadPath + dirPath);
            if (!dir.exists()){
                dir.mkdirs();
            }
            File file = new File(uploadPath + dirPath + filename);
            multiFile.transferTo(file);
            return ResponseBean.success("上传成功", dirPath + filename);
        }catch (Exception e){
            return ResponseBean.fail("上传失败", e.getMessage());
        }
    }

    /**
     * 用户编辑页
     * @return String
     */
    @GetMapping("/user/editPage/{id}")
    public String editPage(@PathVariable("id") String id, Model model) {
        /*Tag tag = tagService.getById(id);
        model.addAttribute("tag", tag);*/
        return "admin/pages/user/user_edit";
    }


    /**
     * 添加用户
     * @return String
     */
    @PostMapping("/user/add")
    @ResponseBody
    public ResponseBean add(@RequestBody Tag tag) {
        /*tag.setUserId(getUser().getId());
        if (tagService.add(tag) > 0) {
            return ResponseBean.success("添加成功", null);
        }*/
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 用户管理列表数据
     * @return String
     */
    @PostMapping("/user/list")
    @ResponseBody
    public Pager<User> list(@RequestBody Pager<User> pager) {
        return userService.list(pager);
    }

    /**
     * 更新标签
     * @return String
     */
    @PostMapping("/user/update")
    @ResponseBody
    public ResponseBean update(@RequestBody Tag tag) {
        /*if (tagService.update(tag) > 0) {
            return ResponseBean.success("更新成功", null);
        }*/
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 删除标签
     * @return String
     */
    @PostMapping("/user/del")
    @ResponseBody
    public ResponseBean del(@RequestBody String ids) {
       /* String[] idArr = ids.split(",");
        if (tagService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }*/
        return ResponseBean.fail("删除失败", null);
    }

}

package com.perfree.controller.admin;

import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.commons.GravatarUtil;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.file.FileHandles;
import com.perfree.file.FileResult;
import com.perfree.model.User;
import com.perfree.permission.AdminMenu;
import com.perfree.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;

/**
 * 用户相关
 * @author Perfree
 */
@Controller
@RequestMapping("/admin")
public class UserController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private FileHandles fileHandles;

    @Autowired
    private UserService userService;

    /**
     * 用户管理列表页
     * @return String
     */
    @RequestMapping("/user")
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    @AdminMenu(name = "用户管理", seq = 8, groupId = Constants.ADMIN_MENU_GROUP_CONTENT)
    public String index() {
        return view("static/admin/pages/user/user_list.html");
    }

    /**
     * 用户添加页
     * @return String
     */
    @RequestMapping("/user/addPage")
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public String addPage() {
        return view("static/admin/pages/user/user_add.html");
    }

    /**
     * 个人中心页
     * @return String
     */
    @RequestMapping("/user/userCenter")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public String userCenter(Model model) {
        model.addAttribute("userForm", userService.getById(getUser().getId().toString()));
        return view("static/admin/pages/user/user_center.html");
    }

    /**
     * 头像上传
     * @return String
     */
    @PostMapping("/user/uploadImg")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public ResponseBean uploadImg(HttpServletRequest request) {
        try{
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile multiFile = multipartRequest.getFile("file");
            FileResult fileResult = fileHandles.upload(multiFile, "avatar");
            if (fileResult != null) {
                return ResponseBean.success("上传成功", fileResult.getUrl());
            }
            return ResponseBean.fail("上传失败", null);
        }catch (Exception e){
            logger.error("上传失败: {}", e.getMessage());
            return ResponseBean.fail("上传失败", e.getMessage());
        }
    }

    /**
     * 用户编辑页
     * @return String
     */
    @GetMapping("/user/editPage/{id}")
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public String editPage(@PathVariable("id") String id, Model model) {
        User user = userService.getById(id);
        model.addAttribute("userForm", user);
        return view("static/admin/pages/user/user_edit.html");
    }


    /**
     * 添加用户
     * @return String
     */
    @PostMapping("/user/add")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public ResponseBean add(@RequestBody @Valid User user) {
        if (StringUtils.isBlank(user.getPassword()) || user.getPassword().length() < 6 || user.getPassword().length() > 18){
            logger.error("密码不能为空且在6-18字符之间: {}", user.toString());
            return ResponseBean.fail("密码不能为空且在6-18字符之间", null);
        }
        if (userService.getUserByAccount(user.getAccount()) != null){
            logger.error("账户已存在: {}", user.toString());
            return ResponseBean.fail("账户已存在", null);
        }
        user.setReadAvatar(false);
        if (StringUtils.isBlank(user.getAvatar())){
            user.setAvatar(GravatarUtil.getGravatar(user.getEmail()));
        }
        if (userService.add(user) > 0) {
            return ResponseBean.success("添加成功", null);
        }
        logger.error("用户添加失败: {}", user.toString());
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 用户管理列表数据
     * @return String
     */
    @PostMapping("/user/list")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public Pager<User> list(@RequestBody Pager<User> pager) {
        return userService.list(pager);
    }

    /**
     * 更新标签
     * @return String
     */
    @PostMapping("/user/update")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public ResponseBean update(@RequestBody @Valid User user) {
        user.setReadAvatar(false);
        if (StringUtils.isBlank(user.getAvatar())){
            user.setAvatar(GravatarUtil.getGravatar(user.getEmail()));
        }
        if (userService.update(user) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("用户更新失败: {}", user.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 删除用户
     * @return String
     */
    @PostMapping("/user/del")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (Arrays.asList(idArr).contains(getUser().getId().toString())){
            logger.error("不能删除当前登录账户: {}", ids);
            return ResponseBean.fail("不能删除当前登录账户", null);
        }
        if (userService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("用户删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 重置密码
     * @return String
     */
    @PostMapping("/user/resetPassword")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public ResponseBean resetPassword(@RequestBody User user) {
        if (userService.resetPassword(user) > 0) {
            return ResponseBean.success("重置密码为123456成功", null);
        }
        logger.error("用户重置密码失败: {}", user.toString());
        return ResponseBean.fail("重置密码失败", null);
    }

    /**
     * 更改状态
     * @return String
     */
    @PostMapping("/user/changeStatus")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
    public ResponseBean changeStatus(@RequestBody User user) {
        if (userService.changeStatus(user) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("用户修改失败: {}", user.toString());
        return ResponseBean.fail("修改失败", null);
    }

    /**
     * 修改密码
     * @return ResponseBean
     */
    @PostMapping("/user/updatePassword")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE,
            Constants.ROLE_USER}, logical= Logical.OR)
    public ResponseBean updatePassword(@RequestBody HashMap<String, String> param) {
        String oldPassword = param.get("oldPassword");
        String newPassword = param.get("newPassword");
        if (StringUtils.isBlank(oldPassword)) {
            return ResponseBean.fail("当前密码不能为空", null);
        }
        if (StringUtils.isBlank(newPassword) || newPassword.length() < 6 || newPassword.length() > 18) {
            return ResponseBean.fail("新密码不能为空且在6-18字符之间", null);
        }
        User user = userService.getById(getUser().getId().toString());
        String oldMd5Password = new Md5Hash(oldPassword, user.getSalt()).toString();
        if (!oldMd5Password.equals(user.getPassword())){
            return ResponseBean.fail("当前密码错误!", null);
        }
        user.setPassword(new Md5Hash(newPassword, user.getSalt()).toString());
        if (userService.updatePassword(user) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("密码修改失败: {}", user.toString());
        return ResponseBean.fail("修改失败", null);
    }
}

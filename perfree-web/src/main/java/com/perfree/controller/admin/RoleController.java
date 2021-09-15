package com.perfree.controller.admin;

import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Tag;
import com.perfree.service.RoleService;
import com.perfree.service.UserService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 角色相关
 * @author Perfree
 */
@Controller
@RequestMapping("/admin")
@RequiresRoles(value={"admin"}, logical= Logical.OR)
public class RoleController extends BaseController {

    @Autowired
    private RoleService roleService;
    /**
     * 获取角色列表（不分页）
     * @return ResponseBean
     */
    @GetMapping("/role/getRoleList")
    @ResponseBody
    public ResponseBean getRoleList() {
        return ResponseBean.success("获取成功", roleService.getRoleList());
    }
}

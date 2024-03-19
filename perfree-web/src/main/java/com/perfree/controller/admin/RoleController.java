package com.perfree.controller.admin;

import com.perfree.base.BaseController;
import com.perfree.commons.ResponseBean;
import com.perfree.service.RoleService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 角色相关
 * @author Perfree
 */
@Controller
@RequestMapping("/admin")
// @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class RoleController extends BaseController {

    @Resource
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

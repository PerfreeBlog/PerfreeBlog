package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Menu;
import com.perfree.service.MenuService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={"admin","superAdmin"}, logical= Logical.OR)
public class MenuController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(MenuController.class);
    @Autowired
    private MenuService menuService;
    /**
     * 菜单管理列表页
     * @return String
     */
    @RequestMapping("/menu")
    public String index() {
        return view("static/admin/pages/menu/menu_list.html");
    }

    /**
     * 菜单管理列表数据
     * @return String
     */
    @PostMapping("/menu/list")
    @ResponseBody
    public Pager<Menu> list(@RequestBody Pager<Menu> pager) {
        return menuService.list(pager);
    }

    /**
     * 菜单添加页
     * @return String
     */
    @RequestMapping("/menu/addPage/{pid}")
    public String addPage(@PathVariable("pid") String pid, Model model) {
        model.addAttribute("pid", pid);
        return view("static/admin/pages/menu/menu_add.html");
    }

    /**
     * 菜单编辑页
     * @return String
     */
    @RequestMapping("/menu/editPage/{id}")
    public String editPage(@PathVariable("id") String id, Model model) {
        model.addAttribute("menu", menuService.getById(id));
        return view("static/admin/pages/menu/menu_edit.html");
    }

    /**
     * 添加菜单
     * @return String
     */
    @PostMapping("/menu/add")
    @ResponseBody
    public ResponseBean add(@RequestBody @Valid Menu menu) {
        menu.setType(Menu.TYPE_FRONT);
        if (menuService.add(menu) > 0) {
            return ResponseBean.success("添加成功", null);
        }
        logger.error("菜单添加失败: {}", menu.toString());
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 更新菜单
     * @return String
     */
    @PostMapping("/menu/update")
    @ResponseBody
    public ResponseBean update(@RequestBody @Valid Menu menu) {
        if (menuService.update(menu) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("菜单更新失败: {}", menu.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 删除菜单
     * @return String
     */
    @PostMapping("/menu/del")
    @ResponseBody
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (menuService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("菜单删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

    /**
     * 更改状态
     * @return String
     */
    @PostMapping("/menu/changeStatus")
    @ResponseBody
    public ResponseBean changeStatus(@RequestBody Menu menu) {
        if (menuService.changeStatus(menu) > 0) {
            return ResponseBean.success("修改成功", null);
        }
        logger.error("菜单修改失败: {}", menu.toString());
        return ResponseBean.fail("修改失败", null);
    }
}

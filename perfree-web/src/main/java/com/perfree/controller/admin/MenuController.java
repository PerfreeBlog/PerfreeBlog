package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Menu;
import com.perfree.model.Tag;
import com.perfree.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class MenuController extends BaseController {

    @Autowired
    private MenuService menuService;
    /**
     * 菜单管理列表页
     * @return String
     */
    @RequestMapping("/menu")
    public String index() {
        return "admin/pages/menu/menu_list";
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
        return "admin/pages/menu/menu_add";
    }

    /**
     * 添加菜单
     * @return String
     */
    @PostMapping("/menu/add")
    @ResponseBody
    public ResponseBean add(@RequestBody Menu menu) {
        menu.setType(Menu.TYPE_FRONT);
        if (menuService.add(menu) > 0) {
            return ResponseBean.success("添加成功", null);
        }
        return ResponseBean.fail("添加失败", null);
    }
}

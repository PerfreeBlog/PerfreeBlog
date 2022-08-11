package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.model.Link;
import com.perfree.permission.AdminMenu;
import com.perfree.service.LinkService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
@RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class LinkController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(LinkController.class);

    @Autowired
    private LinkService linkService;

    /**
     * 友链列表页
     * @return String
     */
    @RequestMapping("/link")
    @AdminMenu(name = "友链管理", seq = 9, groupId = Constants.ADMIN_MENU_GROUP_CONTENT)
    public String index() {
        return view("static/admin/pages/link/link_list.html");
    }

    /**
     * 友链管理列表数据
     * @return String
     */
    @PostMapping("/link/list")
    @ResponseBody
    public Pager<Link> list(@RequestBody Pager<Link> pager) {
        return linkService.list(pager);
    }

    /**
     * 友链添加页
     * @return String
     */
    @RequestMapping("/link/addPage")
    public String addPage() {
        return view("static/admin/pages/link/link_add.html");
    }

    /**
     * 添加友链
     * @return String
     */
    @PostMapping("/link/add")
    @ResponseBody
    public ResponseBean add(@RequestBody Link link) {
        if (linkService.add(link) > 0) {
            return ResponseBean.success("添加成功", link);
        }
        logger.error("友链添加失败: {}", link.toString());
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 友链编辑页
     * @return String
     */
    @GetMapping("/link/editPage/{id}")
    public String editPage(@PathVariable("id") String id, Model model) {
        Link link = linkService.getById(id);
        model.addAttribute("link", link);
        return view("static/admin/pages/link/link_edit.html");
    }

    /**
     * 更新友链
     * @return String
     */
    @PostMapping("/link/update")
    @ResponseBody
    public ResponseBean update(@RequestBody Link link) {
        if (linkService.update(link) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("友链更新失败: {}", link.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 删除友链
     * @return String
     */
    @PostMapping("/link/del")
    @ResponseBody
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (linkService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("友链删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }
}

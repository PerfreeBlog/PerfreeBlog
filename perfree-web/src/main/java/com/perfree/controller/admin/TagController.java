package com.perfree.controller.admin;

import com.perfree.commons.Constants;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseController;
import com.perfree.model.Article;
import com.perfree.model.Tag;
import com.perfree.permission.AdminMenu;
import com.perfree.service.TagService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * 标签相关
 * @author Perfree
 */
@Controller
@RequestMapping("/admin")
public class TagController extends BaseController {
    private final Logger logger = LoggerFactory.getLogger(TagController.class);
    @Autowired
    private TagService tagService;

    /**
     * 标签管理列表页
     * @return String
     */
    @RequestMapping("/tag")
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    @AdminMenu(name = "标签管理", seq = 6, groupId = Constants.ADMIN_MENU_GROUP_CONTENT,
            role = {Constants.ROLE_ADMIN, Constants.ROLE_EDITOR})
    public String index() {
        return view("static/admin/pages/tag/tag_list.html");
    }


    /**
     * 添加标签
     * @return String
     */
    @PostMapping("/tag/add")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public ResponseBean add(@RequestBody Tag tag) {
        Tag tagBySlug = tagService.getBySlug(tag.getSlug());
        if (tagBySlug != null){
            return ResponseBean.fail("访问地址别名重复!", null);
        }
        tag.setUserId(getUser().getId());
        if (tagService.add(tag) > 0) {
            return ResponseBean.success("添加成功", tag);
        }
        logger.error("标签添加失败: {}", tag.toString());
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 标签管理列表数据
     * @return String
     */
    @PostMapping("/tag/list")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public Pager<Tag> list(@RequestBody Pager<Tag> pager) {
        return tagService.list(pager);
    }

    /**
     * 标签管理列表数据
     * @return String
     */
    @GetMapping("/tag/allList")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR, Constants.ROLE_CONTRIBUTE}, logical= Logical.OR)
    public ResponseBean allList() {
        return ResponseBean.success("获取成功", tagService.allList());
    }

    /**
     * 更新标签
     * @return String
     */
    @PostMapping("/tag/update")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean update(@RequestBody Tag tag) {
        if (StringUtils.isBlank(tag.getSlug())) {
            return ResponseBean.fail("访问地址别名不能为空", null);
        }
        Tag tagBySlug = tagService.getBySlug(tag.getSlug());
        if (tagBySlug != null && !tagBySlug.getId().equals(tag.getId())){
            return ResponseBean.fail("访问地址别名重复", null);
        }
        if (tagService.update(tag) > 0) {
            return ResponseBean.success("更新成功", null);
        }
        logger.error("标签更新失败: {}", tag.toString());
        return ResponseBean.fail("更新失败", null);
    }

    /**
     * 删除标签
     * @return String
     */
    @PostMapping("/tag/del")
    @ResponseBody
    @RequiresRoles(value={Constants.ROLE_ADMIN, Constants.ROLE_EDITOR}, logical= Logical.OR)
    public ResponseBean del(@RequestBody String ids) {
        String[] idArr = ids.split(",");
        if (tagService.del(idArr) > 0) {
            return ResponseBean.success("删除成功", null);
        }
        logger.error("标签删除失败: {}", ids);
        return ResponseBean.fail("删除失败", null);
    }

    @GetMapping("/tag/getById")
    @ResponseBody
    public ResponseBean getById(@ApiParam(name="tagId",value="标签ID",required=true) @RequestParam("tagId") String tagId) {
        Tag tag = tagService.getById(tagId);
        return ResponseBean.success("success", tag);
    }
}

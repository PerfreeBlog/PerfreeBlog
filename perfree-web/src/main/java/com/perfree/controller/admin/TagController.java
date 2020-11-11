package com.perfree.controller.admin;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseController;
import com.perfree.model.Tag;
import com.perfree.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 标签相关
 * @author Perfree
 */
@Controller
@RequestMapping("/admin")
public class TagController extends BaseController {
    @Autowired
    private TagService tagService;

    /**
     * 标签管理列表页
     * @return String
     */
    @RequestMapping("/tag")
    public String index() {
        return "/admin/tag/tag_list";
    }

    /**
     * 标签管理列表页
     * @return String
     */
    @RequestMapping("/tag/addPage")
    public String addPage() {
        return "/admin/tag/tag_add";
    }

    /**
     * 标签管理列表页
     * @return String
     */
    @PostMapping("/tag/add")
    @ResponseBody
    public ResponseBean add(@RequestBody Tag tag) {
        tag.setUserId(getUser().getId());
        if (tagService.add(tag) > 0) {
            return ResponseBean.success("添加成功", null);
        }
        return ResponseBean.fail("添加失败", null);
    }

    /**
     * 标签管理列表数据
     * @return String
     */
    @RequestMapping("/tag/list")
    @ResponseBody
    public Pager<Tag> list(@RequestBody Pager<Tag> pager) {
        return tagService.list(pager);
    }
}

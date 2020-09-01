package com.perfree.controller;

import com.perfree.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TagController extends BaseController{
    @Autowired
    private TagService tagService;

    @RequestMapping("/admin/tag")
    public String index() {
        return "/admin/tag/tag_list";
    }
}

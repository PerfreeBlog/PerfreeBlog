package com.perfree.controller.front;

import com.perfree.commons.Constants;
import com.perfree.base.BaseController;
import com.perfree.commons.FrontViewNodeRender;
import com.perfree.model.Tag;
import com.perfree.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TagController extends BaseController {
    
    @Autowired
    private TagService tagService;

    @RequestMapping("/tag/{slugOrId}/{pageIndex}")
    @FrontViewNodeRender
    public String articleListPage(@PathVariable("pageIndex") int pageIndex,@PathVariable("slugOrId") String slugOrId, Model model) {
        Tag tag = tagService.getBySlug(slugOrId);
        if (null == tag) {
            tag = tagService.getById(slugOrId);
        }
        model.addAttribute("pageIndex", pageIndex);
        model.addAttribute("tagId", tag.getId());
        model.addAttribute("url", Constants.URL_ARTICLE_TAG + tag.getId() + "/");
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/tag/{slugOrId}")
    @FrontViewNodeRender
    public String articleListPage(@PathVariable("slugOrId") String slugOrId, Model model) {
        Tag tag = tagService.getBySlug(slugOrId);
        if (null == tag) {
            tag = tagService.getById(slugOrId);
        }
        model.addAttribute("pageIndex", 1);
        model.addAttribute("tagId", tag.getId());
        model.addAttribute("url", Constants.URL_ARTICLE_TAG + tag.getId() + "/");
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/tags")
    @FrontViewNodeRender
    public String tags(Model model) {
        model.addAttribute("url", Constants.URL_TAGS);
        return view(currentThemePage() + "/tags.html");
    }

    @RequestMapping("/tags/{pageIndex}")
    @FrontViewNodeRender
    public String tagsPage(@PathVariable("pageIndex") int pageIndex,Model model) {
        model.addAttribute("url", Constants.URL_TAGS);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/tags.html");
    }
}

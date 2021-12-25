package com.perfree.controller.front;

import com.perfree.commons.Constants;
import com.perfree.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TagController extends BaseController {

    @RequestMapping("/tag/{tagId}/{pageIndex}")
    public String articleListPage(@PathVariable("pageIndex") int pageIndex,@PathVariable("tagId") String tagId, Model model) {
        model.addAttribute("pageIndex", pageIndex);
        model.addAttribute("tagId", tagId);
        model.addAttribute("url", Constants.URL_ARTICLE_TAG + tagId + "/");
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/tag/{tagId}")
    public String articleListPage(@PathVariable("tagId") String tagId, Model model) {
        model.addAttribute("pageIndex", 1);
        model.addAttribute("tagId", tagId);
        model.addAttribute("url", Constants.URL_ARTICLE_TAG + tagId + "/");
        return view(currentThemePage() + "/articleList.html");
    }

    @RequestMapping("/tags")
    public String tags(Model model) {
        model.addAttribute("url", Constants.URL_TAGS);
        return view(currentThemePage() + "/tags.html");
    }

    @RequestMapping("/tags/{pageIndex}")
    public String tagsPage(@PathVariable("pageIndex") int pageIndex,Model model) {
        model.addAttribute("url", Constants.URL_TAGS);
        model.addAttribute("pageIndex", pageIndex);
        return view(currentThemePage() + "/tags.html");
    }
}

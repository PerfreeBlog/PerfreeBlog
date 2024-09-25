package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.commons.annotation.FrontViewNodeRender;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.service.tag.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "标签页相关")
@Controller
public class TagController extends BaseViewController {

    @Resource
    private TagService tagService;

    @GetMapping(value = {"/tag/{slug}", "/tag/{slug}/{pageIndex}"})
    @Operation(summary = "标签文章列表页")
    @FrontViewNodeRender
    public String tagArticlePage(@PathVariable("slug") String slug, @PathVariable(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        TagRespVO tagRespVO = tagService.getBySlug(slug);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        model.addAttribute("tagId", tagRespVO.getId());
        model.addAttribute("tag", tagRespVO);
        model.addAttribute("url", SystemConstants.URL_ARTICLE_TAG + tagRespVO.getSlug()  + "/");
        return themeView("articleList.html");
    }

    @GetMapping(value = {"/tags", "/tags/{pageIndex}"})
    @FrontViewNodeRender
    @Operation(summary = "标签页")
    public String tags(@PathVariable(value = "pageIndex", required = false) Integer pageIndex, Model model) {
        model.addAttribute("url", SystemConstants.URL_TAGS);
        model.addAttribute("pageIndex", null == pageIndex ? 1 : pageIndex);
        return themeView("tags.html");
    }
}

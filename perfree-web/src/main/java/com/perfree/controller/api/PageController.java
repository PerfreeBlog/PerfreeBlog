package com.perfree.controller.api;

import com.perfree.commons.ResponseBean;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin
@Tag(name = "页面相关")
@RequestMapping("/api/page")
public class PageController {
    @Resource
    private ArticleService articleService;

    /**
     * 获取所有页面
     *
     * @return Pager<Article>
     */
    @GetMapping("/page/getPageList")
    @Operation(summary = "获取所有页面")
    public ResponseBean getPageList() {
        List<Article> articles = articleService.getPageList();
        return ResponseBean.success("获取成功", articles);
    }
}

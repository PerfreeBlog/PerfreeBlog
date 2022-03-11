package com.perfree.controller.api;

import com.perfree.commons.ResponseBean;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@Api(value = "页面相关",tags = "页面相关")
@RequestMapping("/api/page")
public class PageController {
    @Autowired
    private ArticleService articleService;

    /**
     * 获取所有页面
     * @return Pager<Article>
     */
    @GetMapping("/page/getPageList")
    @ApiOperation(value = "获取所有页面", notes = "获取所有页面")
    public ResponseBean getPageList() {
        List<Article> articles = articleService.getPageList();
        return ResponseBean.success("获取成功", articles);
    }
}

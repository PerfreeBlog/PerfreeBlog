package com.perfree.controller.api;

import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Tag(name = "动态相关")
@RequestMapping("/api/journal")
public class JournalController {
    @Resource
    private ArticleService articleService;

    @GetMapping("/getJournalById")
    @Operation(summary = "根据动态ID获取数据")
    public ResponseBean getJournalById(@RequestParam("id") String id, HttpServletRequest request) {
        Article article = articleService.getById(id);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
        }
        return ResponseBean.success("success", article);
    }

    @GetMapping("/list")
    @Operation(summary = "动态分页数据")
    public Pager<Article> list(Pager<Article> pager) {
        pager.setForm(new Article());
        pager.getForm().setType(Constants.ARTICLE_TYPE_JOURNAL);
        return articleService.apiList(pager);
    }
}

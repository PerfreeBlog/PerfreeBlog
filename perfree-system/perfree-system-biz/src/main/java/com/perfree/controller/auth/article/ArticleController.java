package com.perfree.controller.auth.article;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.ArticleAddReqVO;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.tag.vo.TagCreateReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.convert.tag.TagConvert;
import com.perfree.model.Article;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "文章相关接口")
@RequestMapping("api/auth/article")
public class ArticleController {

    private final static Logger LOGGER = LoggerFactory.getLogger(ArticleController.class);

    @Resource
    private ArticleService articleService;

    @PostMapping("/page")
    @Operation(summary = "文章分页列表")
    public CommonResult<PageResult<ArticleRespVO>> page(@RequestBody ArticlePageReqVO pageVO) {
        return success(articleService.articlePage(pageVO));
    }


    @PostMapping("/createArticle")
    @Operation(summary = "发表文章")
    public CommonResult<ArticleRespVO> createArticle(@RequestBody @Valid ArticleAddReqVO articleAddReqVO) {
        Article article = articleService.createArticle(articleAddReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }
}

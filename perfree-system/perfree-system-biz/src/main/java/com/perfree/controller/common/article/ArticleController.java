package com.perfree.controller.common.article;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.common.article.vo.ArchivePageReqVO;
import com.perfree.controller.common.article.vo.ArchiveRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "文章相关接口")
@RequestMapping("api/article")
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @GetMapping("like")
    @Operation(summary = "文章/动态点赞")
    public CommonResult<Boolean> like(@RequestParam("id") Integer id){
        return success(articleService.updateGreatCount(id));
    }

    @PostMapping("archivePage")
    @Operation(summary = "文章归档列表分页")
    public CommonResult<PageResult<ArchiveRespVO>> archivePage(@RequestBody ArchivePageReqVO pageVO){
        return success(articleService.archivePage(pageVO));
    }
}

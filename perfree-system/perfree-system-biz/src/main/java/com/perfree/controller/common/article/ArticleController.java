package com.perfree.controller.common.article;

import com.perfree.commons.common.CommonResult;
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
}

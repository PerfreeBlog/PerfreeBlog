package com.perfree.controller.common.journal;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "动态相关接口")
@RequestMapping("api/journal")
public class JournalController {

    @Resource
    private ArticleService articleService;

    @PostMapping("/page")
    @Operation(summary = "动态分页列表")
    public CommonResult<PageResult<JournalRespVO>> page(@RequestBody JournalPageReqVO pageVO) {
        return success(articleService.journalPage(pageVO));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取动态")
    public CommonResult<JournalRespVO> get(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.getJournalById(id));
    }

}

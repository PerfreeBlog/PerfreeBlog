package com.perfree.controller.auth.journal;

import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.journal.vo.JournalAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "动态相关接口")
@RequestMapping("api/auth/journal")
public class JournalController {

    @Resource
    private ArticleService articleService;

    @PostMapping("/createJournal")
    @Operation(summary = "发表动态")
    public CommonResult<JournalRespVO> createJournal(@RequestBody @Valid JournalAddReqVO journalAddReqVO) {
        return CommonResult.success(articleService.createJournal(journalAddReqVO));
    }

}

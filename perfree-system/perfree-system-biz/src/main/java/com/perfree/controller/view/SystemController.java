package com.perfree.controller.view;

import com.perfree.base.BaseViewController;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "系统页面视图相关")
@Controller
public class SystemController extends BaseViewController {

    @GetMapping("/")
    @Operation(summary = "首页")
    public String index() {
        return themeView("index.html");
    }
}

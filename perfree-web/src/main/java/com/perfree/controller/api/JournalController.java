package com.perfree.controller.api;

import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.annotations.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@Api(value = "动态相关",tags = "动态相关")
@RequestMapping("/api/journal")
public class JournalController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("/getJournalById")
    @ApiOperation(value = "根据动态ID获取数据", notes = "根据动态ID获取数据")
    public ResponseBean getJournalById(@ApiParam(name="id",value="id",required=true) @RequestParam("id") String id, HttpServletRequest request) {
        Article article = articleService.getById(id);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
        }
        return ResponseBean.success("success", article);
    }

    @GetMapping("/list")
    @ApiOperation(value = "动态分页数据", notes = "获取动态分页数据(根据发布时间排序,置顶动态优先级会提高)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
    })
    public Pager<Article> list(@ApiIgnore Pager<Article> pager){
        pager.setForm(new Article());
        pager.getForm().setType(Constants.ARTICLE_TYPE_JOURNAL);
        return articleService.apiList(pager);
    }
}

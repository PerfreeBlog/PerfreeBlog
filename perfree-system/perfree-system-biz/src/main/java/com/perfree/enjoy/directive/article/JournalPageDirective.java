package com.perfree.enjoy.directive.article;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.DirectivePageResult;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.utils.DirectiveSortingUtils;
import com.perfree.constant.ViewConstant;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
@TemplateDirective("journalPage")
@Component
public class JournalPageDirective extends BaseDirective {

    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        JournalPageDirective.articleService = articleService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        JournalPageReqVO journalPageReqVO = new JournalPageReqVO();

        // 组装来自ModelView的数据
        journalPageReqVO.setPageNo(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1));

        // 组装来自指令编写的参数
        journalPageReqVO.setPageSize(getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        journalPageReqVO.setSortingFields(DirectiveSortingUtils.handleSortingField(getExprParamToStr(ViewConstant.ORDER_BY, null)));

        // 查询数据
        PageResult<JournalRespVO> journalRespVOPageResult = articleService.journalPage(journalPageReqVO);

        // 组装结果集
        DirectivePageResult<JournalRespVO> result = new DirectivePageResult<>(journalRespVOPageResult.getList(),journalRespVOPageResult.getTotal(),
                journalPageReqVO.getPageNo(), journalPageReqVO.getPageSize());
        scope.set("journalPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

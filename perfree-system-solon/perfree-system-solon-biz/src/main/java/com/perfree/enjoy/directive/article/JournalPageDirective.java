package com.perfree.enjoy.directive.article;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
import jakarta.annotation.Resource;
import org.noear.solon.annotation.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@TemplateDirective("journalPage")
@Component
public class JournalPageDirective extends BaseDirective {

    private static ArticleService articleService;

    @Resource
    public void setArticleService(ArticleService articleService){
        JournalPageDirective.articleService = articleService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        JournalPageReqVO journalPageReqVO = new JournalPageReqVO();

        // 组装来自ModelView的数据
        // 组装来自指令编写的参数
        PageHelper.startPage(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1),
                getExprParamToInt(ViewConstant.PAGE_SIZE, 10),
                getExprParamToStr(ViewConstant.ORDER_BY, null)
        );
        // 查询数据
        List<JournalRespVO> journalRespVOList = articleService.journalPage(journalPageReqVO);

        // 组装结果集
        DirectivePageResult<JournalRespVO> result = new DirectivePageResult<>(journalRespVOList,new PageInfo<>(journalRespVOList).getTotal(),
                journalPageReqVO.getPageNo(), journalPageReqVO.getPageSize());
        scope.set("journalPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

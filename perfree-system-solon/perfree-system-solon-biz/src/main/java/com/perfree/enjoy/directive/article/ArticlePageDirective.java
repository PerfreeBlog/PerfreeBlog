package com.perfree.enjoy.directive.article;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.DirectivePageResult;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.utils.DirectiveSortingUtils;
import com.perfree.constant.ArticleConstant;
import com.perfree.constant.ViewConstant;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.service.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("articlePage")
@Component
public class ArticlePageDirective extends BaseDirective {
    private static ArticleService articleService;

    @Autowired
    public void setArticleService(ArticleService articleService){
        ArticlePageDirective.articleService = articleService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        ArticlePageReqVO articlePageReqVO = new ArticlePageReqVO();

        // 组装来自ModelView的数据
        articlePageReqVO.setPageNo(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1));
        articlePageReqVO.setTagId(getModelDataToInt(ViewConstant.TAG_ID, scope, null));
        articlePageReqVO.setCategoryId(getModelDataToInt(ViewConstant.CATEGORY_ID, scope, null));
        articlePageReqVO.setTitle(getModelDataToStr(ViewConstant.TITLE, scope));

        // 组装来自指令编写的参数
        articlePageReqVO.setType(getExprParamToStr(ViewConstant.ARTICLE_TYPE, ArticleConstant.ARTICLE_TYPE_ARTICLE));
        articlePageReqVO.setPageSize(getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        articlePageReqVO.setSortingFields(DirectiveSortingUtils.handleSortingField(getExprParamToStr(ViewConstant.ORDER_BY, null)));

        // 必须的参数,至查询已发布的文章
        articlePageReqVO.setStatus(ArticleConstant.ARTICLE_STATUS_PUBLISHED);

        // 查询数据
        PageResult<ArticleRespVO> articleRespVOPageResult = articleService.articlePage(articlePageReqVO);

        // 组装结果集
        DirectivePageResult<ArticleRespVO> result = new DirectivePageResult<>(articleRespVOPageResult.getList(),articleRespVOPageResult.getTotal(),
                articlePageReqVO.getPageNo(), articlePageReqVO.getPageSize());
        scope.set("articlePage", result);
        stat.exec(env, scope, writer);
    }



    @Override
    public boolean hasEnd() {
        return true;
    }

}

package com.perfree.enjoy.directive.link;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.DirectivePageResult;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.utils.DirectiveSortingUtils;
import com.perfree.constant.ArticleConstant;
import com.perfree.constant.ViewConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.link.vo.LinkPageReqVO;
import com.perfree.controller.auth.link.vo.LinkRespVO;
import com.perfree.enjoy.directive.article.ArticlePageDirective;
import com.perfree.model.Link;
import com.perfree.service.article.ArticleService;
import com.perfree.service.link.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("linkPage")
@Component
public class LinkPageDirective extends BaseDirective {

    private static LinkService linkService;

    @Autowired
    public void setLinkService(LinkService linkService){
        LinkPageDirective.linkService = linkService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        LinkPageReqVO linkPageReqVO = new LinkPageReqVO();
        // 组装来自ModelView的数据
        linkPageReqVO.setPageNo(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1));
        linkPageReqVO.setName(getModelDataToStr(ViewConstant.NAME, scope));

        // 组装来自指令编写的参数
        linkPageReqVO.setPageSize(getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        linkPageReqVO.setSortingFields(DirectiveSortingUtils.handleSortingField(getExprParamToStr(ViewConstant.ORDER_BY, null)));


        PageResult<LinkRespVO> linkPageResult = linkService.linkPage(linkPageReqVO);

        // 组装结果集
        DirectivePageResult<LinkRespVO> result = new DirectivePageResult<>(linkPageResult.getList(),linkPageResult.getTotal(),
                linkPageReqVO.getPageNo(), linkPageReqVO.getPageSize());
        scope.set("linkPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }

}

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
import com.perfree.constant.ViewConstant;
import com.perfree.controller.common.article.vo.ArchivePageReqVO;
import com.perfree.controller.common.article.vo.ArchiveRespVO;
import com.perfree.service.article.ArticleService;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@TemplateDirective("archivePage")
@Component
public class ArchivePageDirective extends BaseDirective {

    private static ArticleService articleService;

    @Resource
    public void setArticleService(ArticleService articleService){
        ArchivePageDirective.articleService = articleService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        ArchivePageReqVO pageVO = new ArchivePageReqVO();
        // 组装来自ModelView的数据
        // 组装来自指令编写的参数
        PageHelper.startPage(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1),
                getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        List<ArchiveRespVO> archiveRespVOList = articleService.archivePage(pageVO);
        // 组装结果集
        DirectivePageResult<ArchiveRespVO> result = new DirectivePageResult<>(archiveRespVOList,new PageInfo<>(archiveRespVOList).getTotal(),
                pageVO.getPageNo(), pageVO.getPageSize());
        scope.set("archivePage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

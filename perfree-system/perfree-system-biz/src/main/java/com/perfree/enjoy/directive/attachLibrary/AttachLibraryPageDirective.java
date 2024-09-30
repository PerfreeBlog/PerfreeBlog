package com.perfree.enjoy.directive.attachLibrary;

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
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryPageReqVO;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryRespVO;
import com.perfree.service.attachLibrary.AttachLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("attachLibraryPage")
@Component
public class AttachLibraryPageDirective extends BaseDirective {

    private static AttachLibraryService attachLibraryService;

    @Autowired
    public void setAttachLibraryService(AttachLibraryService attachLibraryService){
        AttachLibraryPageDirective.attachLibraryService = attachLibraryService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        AttachLibraryPageReqVO attachLibraryPageReqVO = new AttachLibraryPageReqVO();
        // 组装来自ModelView的数据
        attachLibraryPageReqVO.setPageNo(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1));
        attachLibraryPageReqVO.setName(getModelDataToStr(ViewConstant.NAME, scope));

        // 组装来自指令编写的参数
        attachLibraryPageReqVO.setType(getExprParamToStr(ViewConstant.TYPE,  null));
        attachLibraryPageReqVO.setPageSize(getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        attachLibraryPageReqVO.setSortingFields(DirectiveSortingUtils.handleSortingField(getExprParamToStr(ViewConstant.ORDER_BY, null)));
        PageResult<AttachLibraryRespVO> attachLibraryRespVOPageResult = attachLibraryService.attachLibraryPage(attachLibraryPageReqVO);
        // 组装结果集
        DirectivePageResult<AttachLibraryRespVO> result = new DirectivePageResult<>(attachLibraryRespVOPageResult.getList(),attachLibraryRespVOPageResult.getTotal(),
                attachLibraryPageReqVO.getPageNo(), attachLibraryPageReqVO.getPageSize());
        scope.set("attachLibraryPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

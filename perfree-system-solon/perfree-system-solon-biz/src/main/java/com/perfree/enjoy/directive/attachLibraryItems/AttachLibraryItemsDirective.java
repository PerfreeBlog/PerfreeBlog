package com.perfree.enjoy.directive.attachLibraryItems;

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
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsPageReqVO;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsRespVO;
import com.perfree.service.attachLibraryItems.AttachLibraryItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@TemplateDirective("attachLibraryItemsPage")
@Component
public class AttachLibraryItemsDirective extends BaseDirective {

    private static AttachLibraryItemsService attachLibraryItemsService;

    @Autowired
    public void setAttachLibraryService(AttachLibraryItemsService attachLibraryItemsService){
        AttachLibraryItemsDirective.attachLibraryItemsService = attachLibraryItemsService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        AttachLibraryItemsPageReqVO attachLibraryItemsPageReqVO = new AttachLibraryItemsPageReqVO();
        // 组装来自ModelView的数据
        attachLibraryItemsPageReqVO.setName(getModelDataToStr(ViewConstant.NAME, scope));
        attachLibraryItemsPageReqVO.setAttachLibraryId(getModelDataToInt(ViewConstant.ATTACH_LIBRARY_ID, scope, 0));

        // 组装来自指令编写的参数
        PageHelper.startPage(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1),
                getExprParamToInt(ViewConstant.PAGE_SIZE, 10),
                getExprParamToStr(ViewConstant.ORDER_BY, null)
        );
        List<AttachLibraryItemsRespVO> attachLibraryItemsRespVOList = attachLibraryItemsService.attachLibraryItemsPage(attachLibraryItemsPageReqVO);
        // 组装结果集
        DirectivePageResult<AttachLibraryItemsRespVO> result = new DirectivePageResult<>(attachLibraryItemsRespVOList,new PageInfo<>(attachLibraryItemsRespVOList).getTotal(),
                attachLibraryItemsPageReqVO.getPageNo(), attachLibraryItemsPageReqVO.getPageSize());
        scope.set("attachLibraryItemsPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

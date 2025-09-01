package com.perfree.enjoy.directive.tag;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.DirectivePageResult;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.commons.utils.DirectiveSortingUtils;
import com.perfree.constant.ViewConstant;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("tagsPage")
@Component
public class TagPageDirective  extends BaseDirective {

    private static TagService tagService;

    @Autowired
    public void setTagService(TagService tagService){
        TagPageDirective.tagService = tagService;
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        TagPageReqVO tagPageReqVO = new TagPageReqVO();
        // 组装来自ModelView的数据
        tagPageReqVO.setPageNo(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1));
        tagPageReqVO.setName(getModelDataToStr(ViewConstant.NAME, scope));

        // 组装来自指令编写的参数
        tagPageReqVO.setPageSize(getExprParamToInt(ViewConstant.PAGE_SIZE, 10));
        tagPageReqVO.setSortingFields(DirectiveSortingUtils.handleSortingField(getExprParamToStr(ViewConstant.ORDER_BY, null)));

        PageResult<TagRespVO> tagRespVOPageResult = tagService.tagPage(tagPageReqVO);

        // 组装结果集
        DirectivePageResult<TagRespVO> result = new DirectivePageResult<>(tagRespVOPageResult.getList(),tagRespVOPageResult.getTotal(),
                tagPageReqVO.getPageNo(), tagPageReqVO.getPageSize());
        scope.set("tagsPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

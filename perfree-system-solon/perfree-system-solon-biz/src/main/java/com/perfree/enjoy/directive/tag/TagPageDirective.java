package com.perfree.enjoy.directive.tag;

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
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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
        tagPageReqVO.setName(getModelDataToStr(ViewConstant.NAME, scope));

        // 组装来自指令编写的参数
        PageHelper.startPage(getModelDataToInt(ViewConstant.PAGE_INDEX, scope, 1),
                getExprParamToInt(ViewConstant.PAGE_SIZE, 10),
                getExprParamToStr(ViewConstant.ORDER_BY, null)
        );
        List<TagRespVO> tagRespVOList = tagService.tagPage(tagPageReqVO);

        // 组装结果集
        DirectivePageResult<TagRespVO> result = new DirectivePageResult<>(tagRespVOList,new PageInfo<>(tagRespVOList).getTotal(),
                tagPageReqVO.getPageNo(), tagPageReqVO.getPageSize());
        scope.set("tagsPage", result);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

package com.perfree.convert.category;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.category.vo.CategoryAddReqVO;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.controller.auth.category.vo.CategoryTreeRespVO;
import com.perfree.controller.auth.category.vo.CategoryUpdateReqVO;
import com.perfree.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryConvert {
    CategoryConvert INSTANCE = Mappers.getMapper(CategoryConvert.class);

    PageResult<CategoryRespVO> convertPageResultVO(PageResult<Category> categoryPageResult);

    CategoryRespVO convertRespVO(Category category);

    Category convertAddReqVOToModel(CategoryAddReqVO categoryAddReqVO);

    Category convertUpdateReqVOToModel(CategoryUpdateReqVO categoryUpdateReqVO);

    List<CategoryTreeRespVO> convertRespVoToTreeListRespVO(List<CategoryRespVO> categories);

}

package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.constant.CategoryConstant;
import com.perfree.controller.auth.category.vo.CategoryListTreeReqVO;
import com.perfree.controller.auth.category.vo.CategoryPageReqVO;
import com.perfree.model.Category;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 * 分类表 Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface CategoryMapper extends BaseMapperX<Category> {

    default PageResult<Category> categoryPage(CategoryPageReqVO pageVO) {
        return selectPage(pageVO, new LambdaQueryWrapper<Category>()
                .eq(StringUtils.isNotBlank(pageVO.getName()), Category::getName, pageVO.getName())
        );
    }

    default Category selectBySlug(String slug) {
        return selectOne(new LambdaQueryWrapper<Category>()
                .eq(Category::getSlug, slug));
    }

    default List<Category> selectByPid(Integer id) {
        return selectList(new LambdaQueryWrapper<Category>()
                .eq(Category::getPid, id));
    }

    default List<Category> getAllCategory(CategoryListTreeReqVO categoryListTreeReqVO) {
        return selectList(new LambdaQueryWrapper<Category>()
                .like(StringUtils.isNotBlank(categoryListTreeReqVO.getName()), Category::getName, categoryListTreeReqVO.getName())
                .eq(null != categoryListTreeReqVO.getStatus(), Category::getStatus, categoryListTreeReqVO.getStatus())
                .orderByDesc(Category::getCreateTime)
        );
    }

    /**
     * 获取分类数量
     * @return Long
     */
    default Long getCategoryCount(){
        return selectCount(new LambdaQueryWrapper<Category>()
                .eq(Category::getStatus, CategoryConstant.STATUS_NORMAL)
        );
    }
}

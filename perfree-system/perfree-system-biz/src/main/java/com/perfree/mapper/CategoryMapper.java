package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.category.vo.CategoryListReqVO;
import com.perfree.controller.auth.category.vo.CategoryPageReqVO;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.model.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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

    CategoryRespVO selectBySlug(@Param("slug") String slug);

    default List<Category> selectByPid(Integer id) {
        return selectList(new LambdaQueryWrapper<Category>()
                .eq(Category::getPid, id));
    }

    List<CategoryRespVO> getAllCategory(@Param("reqVo") CategoryListReqVO reqVO);

    CategoryRespVO getCategoryById(@Param("id") Integer id);

    IPage<CategoryRespVO> categoryPage(IPage<CategoryRespVO> page, @Param("pageVO") CategoryPageReqVO pageVO);

    List<CategoryRespVO> getHotCategory(@Param("num") int num);
}


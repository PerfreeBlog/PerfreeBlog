package com.perfree.service.category;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.category.vo.*;
import com.perfree.model.Category;

import java.util.List;

/**
 * <p>
 * 分类表 服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface CategoryService extends IService<Category> {

    /**
     * 分类分页列表
     * @param reqVO CategoryListReqVO
     * @return List<CategoryRespVO>
     */
    List<CategoryRespVO> categoryPageList(CategoryListReqVO reqVO);

    /**
     * 添加分类
     * @param categoryAddReqVO categoryAddReqVO
     * @return Category
     */
    Category addCategory(CategoryAddReqVO categoryAddReqVO);

    /**
     * 更新分类
     * @param categoryUpdateReqVO categoryUpdateReqVO
     * @return Category
     */
    Category updateCategory(CategoryUpdateReqVO categoryUpdateReqVO);

    /**
     * 删除分类
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 分类树形结构列表
     * @param reqVO CategoryListReqVO
     * @return List<CategoryTreeRespVO>
     */
    List<CategoryTreeRespVO> listTree(CategoryListReqVO reqVO);

    /**
     * 根据slug获取分类
     * @param slug slug
     * @return Category
     */
    CategoryRespVO getBySlug(String slug);

    /**
     * 根据id获取分类
     * @param id id
     * @return CategoryRespVO
     */
    CategoryRespVO getCategoryById(Integer id);

    /**
     * 分类分页
     * @param reqVO reqVO
     * @return PageResult<CategoryRespVO>
     */
    PageResult<CategoryRespVO> categoryPage(CategoryPageReqVO reqVO);

    List<CategoryRespVO> getHotCategory(int count);

}

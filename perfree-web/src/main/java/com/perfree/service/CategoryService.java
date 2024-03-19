package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.model.Category;

import java.util.HashMap;
import java.util.List;

/**
 * @description CategoryService
 * @author Perfree
 * @date 2021/11/15 10:01
 */
public interface CategoryService {

    /**
     * 分类列表分页
     * @param pager pager
     * @return Pager<Category>
     */
    Pager<Category> list(Pager<Category> pager);

    /**
     * 添加分类
     * @param category category
     * @return int
     */
    int add(Category category);

    /**
     * 删除分类
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 根据分类id获取信息
     * @param id id
     * @return Category
     */
    Category getById(String id);

    /**
     * 更新分类
     * @param category category
     * @return int
     */
    int update(Category category);

    /**
     * 修改状态
     * @param category category
     * @return int
     */
    int changeStatus(Category category);

    /**
     * 获取所有分类
     * @return List<Category>
     */
    List<Category> allList(Category category);

    List<Category> getFrontAllList(Category category);

    void addCount(Long id);

    void subCount(Long categoryId);

    /**
     * 获取分类列表(API)
     * @return List<Category>
     */
    List<Category> getApiList();

    DirectivePage<HashMap<String, String>> frontCategoryPage(DirectivePage<HashMap<String, String>> categoriesPage);

    Category getBySlug(String slug);

}

package com.perfree.mapper;

import com.perfree.model.Article;
import com.perfree.model.Category;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface CategoryMapper {

    /**
     * 分类列表分页
     * @param category  category
     * @return  List<Category>
     */
    List<Category> getList(Category category);

    /**
     * 根据父级id获取子分类
     * @param id  id
     * @return  List<Category>
     */
    List<Category> getChildCategory(String id);

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
     * 根据id获取信息
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

    void addCount(Long id);

    void subCount(Long id);

    List<Category> frontCategoryList(HashMap<String, String> form);

    List<Category> getAllList(Category category);

    List<Category> getFrontAllList(Category category);

    Category getBySlug(String slug);

    void updateSlug(Category category);

}

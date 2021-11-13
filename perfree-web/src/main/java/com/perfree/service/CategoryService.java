package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Pager;
import com.perfree.mapper.CategoryMapper;
import com.perfree.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class CategoryService {
    @Autowired
    private CategoryMapper categoryMapper;

    /**
     * 分类列表分页
     * @param pager pager
     * @return Pager<Category>
     */
    @Transactional(readOnly = true)
    public Pager<Category> list(Pager<Category> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Category> categories = categoryMapper.getList(pager.getForm());
        PageInfo<Category> pageInfo = new PageInfo<>(categories);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 添加分类
     * @param category category
     * @return int
     */
    public int add(Category category) {
        category.setCreateTime(new Date());
        category.setCount(0L);
        return categoryMapper.add(category);
    }

    /**
     * 删除分类
     * @param idArr idArr
     * @return int
     */
    public int del(String[] idArr) {
        return categoryMapper.del(idArr);
    }

    /**
     * 根据分类id获取信息
     * @param id id
     * @return Category
     */
    @Transactional(readOnly = true)
    public Category getById(String id) {
        return categoryMapper.getById(id);
    }

    /**
     * 更新分类
     * @param category category
     * @return int
     */
    public int update(Category category) {
        category.setUpdateTime(new Date());
        return categoryMapper.update(category);
    }

    /**
     * 修改状态
     * @param category category
     * @return int
     */
    public int changeStatus(Category category) {
        category.setUpdateTime(new Date());
        return categoryMapper.changeStatus(category);
    }

    /**
     * 获取所有分类
     * @return List<Category>
     */
    @Transactional(readOnly = true)
    public List<Category> allList() {
        return categoryMapper.getList(null);
    }

    public void addCount(Long id) {
        categoryMapper.addCount(id);
    }

    public void subCount(Long categoryId) {
        categoryMapper.subCount(categoryId);
    }

    /**
     * 获取分类列表(API)
     * @return List<Category>
     */
    public List<Category> getApiList() {
        return categoryMapper.getList(null);
    }
}

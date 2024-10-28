package com.perfree.service.category;

import cn.hutool.core.collection.ListUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.constant.CategoryConstant;
import com.perfree.controller.auth.category.vo.*;
import com.perfree.convert.category.CategoryConvert;
import com.perfree.mapper.ArticleCategoryMapper;
import com.perfree.mapper.CategoryMapper;
import com.perfree.model.Category;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.enums.ErrorCode.CATEGORY_EXIST_CHILD;
import static com.perfree.enums.ErrorCode.CATEGORY_SLUG_EXIST;

/**
 * <p>
 * 分类表 服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {

    @Resource
    private CategoryMapper categoryMapper;

    @Resource
    private ArticleCategoryMapper articleCategoryMapper;

    @Override
    public List<CategoryRespVO> categoryPageList(CategoryListReqVO reqVO) {
        return categoryMapper.getAllCategory(reqVO);
    }

    @Override
    @Transactional
    public Category addCategory(CategoryAddReqVO categoryAddReqVO) {
        if (StringUtils.isNotBlank(categoryAddReqVO.getSlug())) {
            CategoryRespVO queryCategory = categoryMapper.selectBySlug(categoryAddReqVO.getSlug());
            if (null != queryCategory) {
                throw new ServiceException(CATEGORY_SLUG_EXIST);
            }
        }
        Category category = CategoryConvert.INSTANCE.convertAddReqVOToModel(categoryAddReqVO);
        categoryMapper.insert(category);
        if (StringUtils.isBlank(category.getSlug())){
            category.setSlug(category.getId().toString());
        }
        categoryMapper.updateById(category);
        return category;
    }

    @Override
    @Transactional
    public Category updateCategory(CategoryUpdateReqVO categoryUpdateReqVO) {
        if (StringUtils.isNotBlank(categoryUpdateReqVO.getSlug())) {
            CategoryRespVO categoryRespVO = categoryMapper.selectBySlug(categoryUpdateReqVO.getSlug());
            if (null != categoryRespVO && !categoryRespVO.getId().equals(categoryUpdateReqVO.getId())) {
                throw new ServiceException(CATEGORY_SLUG_EXIST);
            }
        } else {
            categoryUpdateReqVO.setSlug(categoryUpdateReqVO.getId().toString());
        }
        Category category = CategoryConvert.INSTANCE.convertUpdateReqVOToModel(categoryUpdateReqVO);
        categoryMapper.updateById(category);
        return category;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        List<Category> queryCategoryList = categoryMapper.selectByPid(id);
        if (!queryCategoryList.isEmpty()){
            throw new ServiceException(CATEGORY_EXIST_CHILD);
        }
        categoryMapper.deleteById(id);
        articleCategoryMapper.delByCategoryId(id);
        return true;
    }

    @Override
    public List<CategoryTreeRespVO> listTree(CategoryListReqVO reqVO) {
        List<CategoryRespVO> categories = categoryMapper.getAllCategory(reqVO);
        List<CategoryTreeRespVO> categoryTreeRespVOList = CategoryConvert.INSTANCE.convertRespVoToTreeListRespVO(categories);
        // 获取所有跟节点
        List<CategoryTreeRespVO> result = categoryTreeRespVOList.stream().filter(category -> category.getPid().equals(CategoryConstant.ROOT_CATEGORY_CODE)).toList();
        // 将原数组中所有根节点移除
        categoryTreeRespVOList.removeIf(category -> category.getPid().equals(CategoryConstant.ROOT_CATEGORY_CODE));
        for (CategoryTreeRespVO category : result) {
            buildChildCategory(category, categoryTreeRespVOList);
        }
        return result;
    }

    @Override
    public CategoryRespVO getBySlug(String slug) {
        return categoryMapper.selectBySlug(slug);
    }

    @Override
    public CategoryRespVO getCategoryById(Integer id) {
        return categoryMapper.getCategoryById(id);
    }

    @Override
    public PageResult<CategoryRespVO> categoryPage(CategoryPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        IPage<CategoryRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CategoryRespVO> articlePage = categoryMapper.categoryPage(page, pageVO);
        return new PageResult<>(articlePage.getRecords(), articlePage.getTotal());
    }

    @Override
    public List<CategoryRespVO> getHotCategory(int num) {
        return categoryMapper.getHotCategory(num);
    }


    /**
     * 生成子分类
     * @param category 父级分类信息
     * @param queryCategoryTreeList 分类集合
     */
    private void buildChildCategory(CategoryTreeRespVO category, List<CategoryTreeRespVO> queryCategoryTreeList) {
        List<CategoryTreeRespVO> children = new ArrayList<>();
        for (CategoryTreeRespVO treeListRespVO : queryCategoryTreeList) {
            if (treeListRespVO.getPid().equals(category.getId())) {
                children.add(treeListRespVO);
                buildChildCategory(treeListRespVO, queryCategoryTreeList);
            }
        }
        category.setChildren(children);
    }
}

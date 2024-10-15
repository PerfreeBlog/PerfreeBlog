package com.perfree.convert.category;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.category.vo.CategoryAddReqVO;
import com.perfree.controller.auth.category.vo.CategoryRespVO;
import com.perfree.controller.auth.category.vo.CategoryTreeRespVO;
import com.perfree.controller.auth.category.vo.CategoryUpdateReqVO;
import com.perfree.model.Category;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:58+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class CategoryConvertImpl implements CategoryConvert {

    @Override
    public PageResult<CategoryRespVO> convertPageResultVO(PageResult<Category> categoryPageResult) {
        if ( categoryPageResult == null ) {
            return null;
        }

        PageResult<CategoryRespVO> pageResult = new PageResult<CategoryRespVO>();

        pageResult.setList( categoryListToCategoryRespVOList( categoryPageResult.getList() ) );
        pageResult.setTotal( categoryPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public CategoryRespVO convertRespVO(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryRespVO categoryRespVO = new CategoryRespVO();

        categoryRespVO.setName( category.getName() );
        categoryRespVO.setPid( category.getPid() );
        categoryRespVO.setDesc( category.getDesc() );
        categoryRespVO.setMetaKeywords( category.getMetaKeywords() );
        categoryRespVO.setMetaDescription( category.getMetaDescription() );
        categoryRespVO.setThumbnail( category.getThumbnail() );
        categoryRespVO.setSlug( category.getSlug() );
        categoryRespVO.setId( category.getId() );
        categoryRespVO.setStatus( category.getStatus() );
        if ( category.getCreateTime() != null ) {
            categoryRespVO.setCreateTime( Date.from( category.getCreateTime().toInstant( ZoneOffset.UTC ) ) );
        }
        if ( category.getUpdateTime() != null ) {
            categoryRespVO.setUpdateTime( Date.from( category.getUpdateTime().toInstant( ZoneOffset.UTC ) ) );
        }

        return categoryRespVO;
    }

    @Override
    public Category convertAddReqVOToModel(CategoryAddReqVO categoryAddReqVO) {
        if ( categoryAddReqVO == null ) {
            return null;
        }

        Category category = new Category();

        category.setName( categoryAddReqVO.getName() );
        category.setPid( categoryAddReqVO.getPid() );
        category.setDesc( categoryAddReqVO.getDesc() );
        category.setMetaKeywords( categoryAddReqVO.getMetaKeywords() );
        category.setMetaDescription( categoryAddReqVO.getMetaDescription() );
        category.setThumbnail( categoryAddReqVO.getThumbnail() );
        category.setSlug( categoryAddReqVO.getSlug() );

        return category;
    }

    @Override
    public Category convertUpdateReqVOToModel(CategoryUpdateReqVO categoryUpdateReqVO) {
        if ( categoryUpdateReqVO == null ) {
            return null;
        }

        Category category = new Category();

        category.setId( categoryUpdateReqVO.getId() );
        category.setName( categoryUpdateReqVO.getName() );
        category.setPid( categoryUpdateReqVO.getPid() );
        category.setDesc( categoryUpdateReqVO.getDesc() );
        category.setMetaKeywords( categoryUpdateReqVO.getMetaKeywords() );
        category.setMetaDescription( categoryUpdateReqVO.getMetaDescription() );
        category.setThumbnail( categoryUpdateReqVO.getThumbnail() );
        category.setSlug( categoryUpdateReqVO.getSlug() );

        return category;
    }

    @Override
    public List<CategoryTreeRespVO> convertRespVoToTreeListRespVO(List<CategoryRespVO> categories) {
        if ( categories == null ) {
            return null;
        }

        List<CategoryTreeRespVO> list = new ArrayList<CategoryTreeRespVO>( categories.size() );
        for ( CategoryRespVO categoryRespVO : categories ) {
            list.add( categoryRespVOToCategoryTreeRespVO( categoryRespVO ) );
        }

        return list;
    }

    protected List<CategoryRespVO> categoryListToCategoryRespVOList(List<Category> list) {
        if ( list == null ) {
            return null;
        }

        List<CategoryRespVO> list1 = new ArrayList<CategoryRespVO>( list.size() );
        for ( Category category : list ) {
            list1.add( convertRespVO( category ) );
        }

        return list1;
    }

    protected CategoryTreeRespVO categoryRespVOToCategoryTreeRespVO(CategoryRespVO categoryRespVO) {
        if ( categoryRespVO == null ) {
            return null;
        }

        CategoryTreeRespVO categoryTreeRespVO = new CategoryTreeRespVO();

        categoryTreeRespVO.setName( categoryRespVO.getName() );
        categoryTreeRespVO.setPid( categoryRespVO.getPid() );
        categoryTreeRespVO.setDesc( categoryRespVO.getDesc() );
        categoryTreeRespVO.setMetaKeywords( categoryRespVO.getMetaKeywords() );
        categoryTreeRespVO.setMetaDescription( categoryRespVO.getMetaDescription() );
        categoryTreeRespVO.setThumbnail( categoryRespVO.getThumbnail() );
        categoryTreeRespVO.setSlug( categoryRespVO.getSlug() );
        categoryTreeRespVO.setId( categoryRespVO.getId() );
        categoryTreeRespVO.setCount( categoryRespVO.getCount() );
        categoryTreeRespVO.setStatus( categoryRespVO.getStatus() );
        categoryTreeRespVO.setCreateTime( categoryRespVO.getCreateTime() );
        categoryTreeRespVO.setUpdateTime( categoryRespVO.getUpdateTime() );
        categoryTreeRespVO.setUserInfo( categoryRespVO.getUserInfo() );

        return categoryTreeRespVO;
    }
}

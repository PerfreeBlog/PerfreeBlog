package com.perfree.service.tag;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.controller.auth.tag.vo.TagCreateReqVO;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.controller.auth.tag.vo.TagUpdateReqVO;
import com.perfree.convert.tag.TagConvert;
import com.perfree.mapper.ArticleTagMapper;
import com.perfree.mapper.TagMapper;
import com.perfree.model.Tag;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.enums.ErrorCode.TAG_SLUG_EXIST;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

    @Resource
    private TagMapper tagMapper;

    @Resource
    private ArticleTagMapper articleTagMapper;

    @Override
    public PageResult<TagRespVO> tagPage(TagPageReqVO pageVO) {
        IPage<TagRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<TagRespVO> tagPage = tagMapper.tagPage(page, pageVO);
        return new PageResult<>(tagPage.getRecords(), tagPage.getTotal());
    }

    @Override
    @Transactional
    public Tag add(TagCreateReqVO tagCreateReqVO) {
        if (StringUtils.isNotBlank(tagCreateReqVO.getSlug())) {
            TagRespVO queryTag = tagMapper.getBySlug(tagCreateReqVO.getSlug());
            if (null != queryTag) {
                throw new ServiceException(TAG_SLUG_EXIST);
            }
        }
        Tag tag = TagConvert.INSTANCE.convertCreateReqVoToModel(tagCreateReqVO);
        tagMapper.insert(tag);
        if (StringUtils.isBlank(tag.getSlug())) {
            tag.setSlug(tag.getId().toString());
            tagMapper.updateById(tag);
        }
        return tag;
    }

    @Override
    @Transactional
    public Boolean updateTag(TagUpdateReqVO tagUpdateReqVO) {
        if (StringUtils.isNotBlank(tagUpdateReqVO.getSlug())) {
            TagRespVO queryTag = tagMapper.getBySlug(tagUpdateReqVO.getSlug());
            if (null != queryTag && !queryTag.getId().equals(tagUpdateReqVO.getId())) {
                throw new ServiceException(TAG_SLUG_EXIST);
            }
        } else {
            tagUpdateReqVO.setSlug(tagUpdateReqVO.getId().toString());
        }

        Tag tag = TagConvert.INSTANCE.convertUpdateReqVoToModel(tagUpdateReqVO);
        tagMapper.updateById(tag);
        return true;
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        tagMapper.deleteById(id);
        articleTagMapper.delByTagId(id);
        return true;
    }

    @Override
    @Transactional
    public List<Tag> batchAddTagByName(List<String> addTags) {
        if (null == addTags || addTags.isEmpty()) {
            return new ArrayList<>();
        }
        List<Tag> tagList = new ArrayList<>();
        for (String addTag : addTags) {
            Tag tag = new Tag();
            tag.setName(addTag);
            tagList.add(tag);
        }

        tagMapper.insertBatch(tagList);

        for (Tag tag : tagList) {
            tag.setSlug(tag.getId().toString());
        }
        tagMapper.updateBatch(tagList);
        return tagList;
    }

    @Override
    public List<TagRespVO> getHotTag(int count) {
        return tagMapper.getHotTag(count);
    }

    @Override
    public TagRespVO getBySlug(String slug) {
        return tagMapper.getBySlug(slug);
    }

    @Override
    public TagRespVO getTagById(Integer id) {
        return tagMapper.getTagById(id);
    }
}

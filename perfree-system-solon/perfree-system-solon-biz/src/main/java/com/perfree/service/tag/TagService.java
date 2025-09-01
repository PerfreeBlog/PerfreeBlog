package com.perfree.service.tag;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.tag.vo.TagCreateReqVO;
import com.perfree.controller.auth.tag.vo.TagPageReqVO;
import com.perfree.controller.auth.tag.vo.TagRespVO;
import com.perfree.controller.auth.tag.vo.TagUpdateReqVO;
import com.perfree.model.Tag;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface TagService extends IService<Tag> {

    /**
     * 标签分页列表
     * @param pageVO pageVO
     * @return PageResult<TagRespVO>
     */
    PageResult<TagRespVO> tagPage(TagPageReqVO pageVO);

    /**
     * 添加标签
     * @param tagCreateReqVO tagCreateReqVO
     * @return Tag
     */
    Tag add(TagCreateReqVO tagCreateReqVO);

    /**
     * 修改标签
     * @param tagUpdateReqVO tagUpdateReqVO
     * @return Boolean
     */
    Boolean updateTag(TagUpdateReqVO tagUpdateReqVO);

    /**
     * 根据id删除标签
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 批量新增标签(根据name)
     * @param addTags addTags
     * @return List<Tag>
     */
    List<Tag> batchAddTagByName(List<String> addTags);

    /**
     * 获取热门标签
     * @param count 获取的数量
     * @return List<TagRespVO>
     */
    List<TagRespVO> getHotTag(int count);

    /**
     * 根据slug获取标签
     * @param slug slug
     * @return TagRespVO
     */
    TagRespVO getBySlug(String slug);

    /**
     * 根据id获取tag
     * @param id id
     * @return TagRespVO
     */
    TagRespVO getTagById(Integer id);

}

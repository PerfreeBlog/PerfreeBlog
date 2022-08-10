package com.perfree.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.mapper.TagMapper;
import com.perfree.model.Category;
import com.perfree.model.Tag;
import com.perfree.service.TagService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class TagServiceImpl implements TagService {
    @Autowired
    private TagMapper tagMapper;

    /**
     * 管理后台标签列表
     * @param pager 搜索数据
     * @return ResponseBean
     */
    @Transactional(readOnly = true)
    public Pager<Tag> list(Pager<Tag> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Tag> tags = tagMapper.getList(pager.getForm());
        PageInfo<Tag> pageInfo = new PageInfo<>(tags);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 添加标签
     * @param tag 标签
     * @return int
     */
    public int add(Tag tag) {
        tag.setCreateTime(new Date());
        int result = tagMapper.add(tag);
        if(StringUtils.isBlank(tag.getSlug())) {
            tag.setSlug(tag.getId().toString());
        }
        tagMapper.updateSlug(tag);
        return result;
    }

    /**
     * 根据id获取数据
     * @param id id
     * @return Tag
     */
    @Transactional(readOnly = true)
    public Tag getById(String id) {
        return tagMapper.getById(id);
    }

    /**
     * 更新标签
     * @param tag tag
     * @return int
     */
    public int update(Tag tag) {
        tag.setUpdateTime(new Date());
        return tagMapper.update(tag);
    }

    /**
     * 删除标签
     * @param idArr id数组
     * @return int
     */
    public int del(String[] idArr) {
        tagMapper.delArticleTag(idArr);
        return tagMapper.del(idArr);
    }

    /**
     * 获取所有tag
     * @return List<Tag>
     */
    @Transactional(readOnly = true)
    public List<Tag> allList() {
        return tagMapper.getList(null);
    }

    /**
     * 获取标签数量
     * @return Long
     */
    public Long getTagCount() {
        return tagMapper.getTagCount();
    }

    /**
     * 获取热门标签
     * @param count count
     * @return List<Tag>
     */
    public List<Tag> getHotTag(int count) {
        return tagMapper.getHotTag(count);
    }

    @Override
    public DirectivePage<HashMap<String, String>> frontTagsPage(DirectivePage<HashMap<String, String>> tagsPage) {
        PageHelper.startPage(tagsPage.getPageIndex(), tagsPage.getPageSize());
        List<Tag> tags = tagMapper.frontTagsList(tagsPage.getForm());
        PageInfo<Tag> pageInfo = new PageInfo<>(tags);
        tagsPage.setTotal(pageInfo.getTotal());
        tagsPage.setData(pageInfo.getList());
        return tagsPage;
    }

    @Override
    public Tag getBySlug(String slug) {
        return tagMapper.getBySlug(slug);
    }
}

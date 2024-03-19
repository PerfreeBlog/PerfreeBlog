package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.model.Tag;

import java.util.HashMap;
import java.util.List;

/**
 * @description TagService
 * @author Perfree
 * @date 2021/11/15 10:27
 */
public interface TagService {

    /**
     * 管理后台标签列表
     * @param pager 搜索数据
     * @return ResponseBean
     */
    Pager<Tag> list(Pager<Tag> pager);

    /**
     * 添加标签
     * @param tag 标签
     * @return int
     */
    int add(Tag tag);

    /**
     * 根据id获取数据
     * @param id id
     * @return Tag
     */
    Tag getById(String id);

    /**
     * 更新标签
     * @param tag tag
     * @return int
     */
    int update(Tag tag);

    /**
     * 删除标签
     * @param idArr id数组
     * @return int
     */
    int del(String[] idArr);

    /**
     * 获取所有tag
     * @return List<Tag>
     */
    List<Tag> allList();

    /**
     * 获取标签数量
     * @return Long
     */
    Long getTagCount();

    /**
     * 获取热门标签
     * @param count count
     * @return List<Tag>
     */
    List<Tag> getHotTag(int count);

    DirectivePage<HashMap<String, String>> frontTagsPage(DirectivePage<HashMap<String, String>> tagsPage);

    Tag getBySlug(String slug);

}

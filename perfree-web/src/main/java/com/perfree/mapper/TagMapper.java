package com.perfree.mapper;

import com.perfree.model.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface TagMapper {

    /**
     * 管理后台标签列表数据
     * @param tag 搜索内容
     * @return List<Tag>
     */
    List<Tag> getList(Tag tag);

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

    List<Tag> frontTagsList(HashMap<String, String> form);

    Tag getBySlug(String slug);

    void updateSlug(Tag tag);

    void delArticleTag(String[] idArr);

}

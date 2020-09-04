package com.perfree.mapper;

import com.perfree.model.Tag;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface TagMapper {

    /**
     * 管理后台标签列表数据
     * @param tag 搜索内容
     * @return List<Tag>
     */
    List<Tag> getReportList(Tag tag);
}

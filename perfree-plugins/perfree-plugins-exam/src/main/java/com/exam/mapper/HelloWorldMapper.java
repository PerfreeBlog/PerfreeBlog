package com.exam.mapper;

import com.perfree.plugins.PluginMapper;
import org.apache.ibatis.annotations.Select;

public interface HelloWorldMapper extends PluginMapper {
    @Select("select count(1) from `p_user`")
    String index();

    String index2();
}

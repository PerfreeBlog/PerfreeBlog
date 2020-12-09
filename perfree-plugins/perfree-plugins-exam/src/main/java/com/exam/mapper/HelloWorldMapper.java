package com.exam.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface HelloWorldMapper{
    @Select("select count(1) from `p_user`")
    String index();
}

package com.exam.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface HelloWorldMapper{
    @Select("select count(1) from `p_user`")
    String index();

    String index2();
}

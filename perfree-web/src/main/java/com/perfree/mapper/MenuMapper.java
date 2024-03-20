package com.perfree.mapper;

import com.perfree.model.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper extends BaseMapperX<Menu>{

    List<Menu> getMenuByUserIdAndType(@Param("userId") Long userId, @Param("type") int type);

}

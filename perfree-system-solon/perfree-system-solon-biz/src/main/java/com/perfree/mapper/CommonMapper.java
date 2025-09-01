package com.perfree.mapper;

import com.perfree.enjoy.directive.commons.vo.DirectiveStatisticVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

@Mapper
public interface CommonMapper {
    DirectiveStatisticVO queryStatistics();

}

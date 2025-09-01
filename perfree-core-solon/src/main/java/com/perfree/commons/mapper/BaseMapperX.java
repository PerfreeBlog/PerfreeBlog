package com.perfree.commons.mapper;


import com.mybatisflex.core.BaseMapper;
import com.mybatisflex.core.paginate.Page;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.common.PageParam;
import com.perfree.commons.common.PageResult;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface BaseMapperX<T> extends BaseMapper<T> {

    default PageResult<T> selectPage(PageParam pageParam, @Param("ew") QueryWrapper queryWrapper) {
        // MyBatis Plus 查询
        Page<T> paginate = paginate(pageParam.getPageNo(), pageParam.getPageSize(), queryWrapper);
        // 转换返回
        return new PageResult<>(paginate.getRecords(), paginate.getTotalRow());
    }
}

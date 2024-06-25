package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.Option;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface OptionMapper extends BaseMapperX<Option> {

    default Option getByKey(String key){
        return selectOne(new LambdaQueryWrapper<Option>()
                .eq(Option::getKey, key)
        );
    }
}

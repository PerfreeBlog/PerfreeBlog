package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.Option;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

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

    default Option getByKeyAndIdentification(String key, String identification){
        return selectOne(new LambdaQueryWrapper<Option>()
                .eq(Option::getKey, key)
                .eq(Option::getIdentification, identification)
        );
    }

    default void delByIdentification(String identification){
        delete(new LambdaQueryWrapper<Option>().eq(Option::getIdentification, identification));
    }

    default List<Option> getSettingValueByIdentification(String identification){
        return selectList(new LambdaQueryWrapper<Option>().eq(Option::getIdentification, identification));
    }

    default Option getOptionByIdentificationAndKey(String identification, String key){
        return selectOne(new LambdaQueryWrapper<Option>().eq(Option::getIdentification, identification).eq(Option::getKey, key));
    }
}

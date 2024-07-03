package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
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

    default Option getByKey(String key){
        return selectOne(new LambdaQueryWrapper<Option>()
                .eq(Option::getKey, key)
        );
    }

    default void delByTheme(String webTheme){
        delete(new LambdaQueryWrapper<Option>().eq(Option::getTheme, webTheme));
    }

    default List<Option> getCurrentThemeSettingValue(String webTheme){
        return selectList(new LambdaQueryWrapper<Option>().eq(Option::getTheme, webTheme));
    }

}

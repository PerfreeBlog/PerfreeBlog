package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.mybatisflex.core.query.QueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.Option;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.solon.annotation.Db;

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
        return selectOneByQuery(new QueryWrapper()
                .eq(Option::getKey, key)
                .eq(Option::getIdentification, identification)
        );
    }

    default void delByIdentification(String identification){
        deleteByQuery(new QueryWrapper().eq(Option::getIdentification, identification));
    }

    default List<Option> getSettingValueByIdentification(String identification){
        return selectListByQuery(new QueryWrapper().eq(Option::getIdentification, identification));
    }

    default Option getOptionByIdentificationAndKey(String identification, String key){
        return selectOneByQuery(new QueryWrapper().eq(Option::getIdentification, identification).eq(Option::getKey, key));
    }
}

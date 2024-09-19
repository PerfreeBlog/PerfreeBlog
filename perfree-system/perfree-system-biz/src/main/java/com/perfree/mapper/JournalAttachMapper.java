package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.JournalAttach;
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
public interface JournalAttachMapper extends BaseMapperX<JournalAttach> {

    default void delByArticleId(Integer id){
        delete(new LambdaQueryWrapper<JournalAttach>().eq(JournalAttach::getArticleId, id));
    }

}

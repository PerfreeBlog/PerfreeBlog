package com.perfree.mapper;

import com.perfree.model.Attach;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface AttachMapper {
    /**
     * 新增附件
     * @param attach attach
     * @return int
     */
    int add(Attach attach);

    /**
     * 附件管理列表
     * @param attach
     * @return  List<Attach>
     */
    List<Attach> getList(Attach attach);

    /**
     * 根据id获取附件信息
     * @param id id
     * @return Attach
     */
    Attach getById(String id);

    /**
     * 根据id数组获取附件列表
     * @param idArr idArr
     * @return List<Attach>
     */
    List<Attach> getByIdArr(String[] idArr);

    /**
     * 批量删除附件
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 更新附件信息
     * @param attach attach
     * @return int
     */
    int update(Attach attach);
}

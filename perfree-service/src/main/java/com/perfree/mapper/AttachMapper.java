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
}

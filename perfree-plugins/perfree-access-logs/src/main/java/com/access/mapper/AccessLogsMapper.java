package com.access.mapper;

import com.access.model.AccessLogs;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface AccessLogsMapper {
    void createTableForMysql();

    void createTableForSqlite();

    void dropTable();

    void addAccess(AccessLogs accessLogs);

    List<HashMap<String, Object>> getAccessCountByWeek();

    List<HashMap<String, Object>> getAccessCountBySysGroup();

    List<AccessLogs> getList(@Param("page") int page,@Param("size") int size);

    Long getTotal();

}

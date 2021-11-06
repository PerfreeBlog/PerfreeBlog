package com.access.mapper;

import com.access.model.AccessLogs;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccessLogsMapper {
    void createTableForMysql();

    void createTableForSqlite();

    void dropTable();

    void addAccess(AccessLogs accessLogs);

}

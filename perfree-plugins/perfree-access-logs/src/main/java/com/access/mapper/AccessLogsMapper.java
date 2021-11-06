package com.access.mapper;

import com.access.model.AccessLogs;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccessLogsMapper {
    public void createTableForMysql();

    public void createTableForSqlite();

    public void dropTable();

    void addAccess(AccessLogs accessLogs);

}

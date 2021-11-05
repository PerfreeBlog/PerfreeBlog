package com.perfree.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccessLogsMapper {
    public void createTableForMysql();

    public void createTableForSqlite();
}

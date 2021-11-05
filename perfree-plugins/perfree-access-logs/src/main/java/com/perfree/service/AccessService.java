package com.perfree.service;

import com.perfree.commons.DynamicDataSource;
import com.perfree.mapper.AccessLogsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccessService {

    @Autowired
    private AccessLogsMapper accessLogsMapper;

    public void createTable(){
        if (DynamicDataSource.dataSourceType.equals("mysql")) {
            accessLogsMapper.createTableForMysql();
        } else {
            accessLogsMapper.createTableForSqlite();
        }
    }
}

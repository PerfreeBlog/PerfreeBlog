package com.access.service;

import com.perfree.commons.DynamicDataSource;
import com.access.mapper.AccessLogsMapper;
import com.access.model.AccessLogs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccessService {

    @Autowired
    private AccessLogsMapper accessLogsMapper;

    /**
     * 创建表
     */
    public void createTable(){
        if (DynamicDataSource.dataSourceType.equals("mysql")) {
            accessLogsMapper.createTableForMysql();
        } else {
            accessLogsMapper.createTableForSqlite();
        }
    }

    /**
     * 删除表
     */
    public void dropTable() {
        accessLogsMapper.dropTable();
    }

    /**
     * 增加访问
     * @param accessLogs accessLogs
     */
    public void addAccess(AccessLogs accessLogs) {
        accessLogsMapper.addAccess(accessLogs);
    }
}

package com.access.service;

import com.access.mapper.AccessLogsMapper;
import com.access.model.AccessLogs;
import com.perfree.commons.Pager;
import com.perfree.commons.DynamicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class AccessLogsService {

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

    /**
     * 获取当周访问数据
     * @return
     */
    public HashMap<String, List<Object>> getAccessCountByWeek() {
        List<HashMap<String, Object>> countList;
        if (DynamicDataSource.dataSourceType.equals("mysql")) {
            countList = accessLogsMapper.getAccessCountByWeekFromMysql();
        } else {
            countList = accessLogsMapper.getAccessCountByWeek();
        }
        HashMap<String, List<Object>> result = new HashMap<>();
        List<Object> x = new ArrayList<>();
        List<Object> y = new ArrayList<>();
        for (HashMap<String, Object> day : countList) {
            x.add(day.get("date"));
            y.add(day.get("count"));
        }
        result.put("x", x);
        result.put("y", y);
        return result;
    }

    public List<HashMap<String, Object>> getAccessCountBySysGroup() {
        return accessLogsMapper.getAccessCountBySysGroup();
    }

    public Pager<AccessLogs> list(Pager<AccessLogs> pager) {
        List<AccessLogs> accessLogs = accessLogsMapper.getList((pager.getPageIndex() - 1) * pager.getPageSize(),pager.getPageSize());
        pager.setTotal(accessLogsMapper.getTotal());
        pager.setData(accessLogs);
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }
}

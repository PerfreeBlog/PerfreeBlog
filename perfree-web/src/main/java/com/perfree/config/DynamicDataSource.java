package com.perfree.config;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;

/**
 * 动态切换数据源,存储了当前sessionID和数据源
 * @author Perfree
 */
public class DynamicDataSource extends AbstractRoutingDataSource {
    // 数据源集合
    public static DataSource dataSource = null;
    public static String dataSourceType;
    /**
     * 设置数据源
     * @param dataSource 数据源
     */
    public static void setDataSource(DataSource dataSource,String dataSourceType) {
        DynamicDataSource.dataSource = dataSource;
        DynamicDataSource.dataSourceType = dataSourceType;
    }

    /**
     * 获取数据源
     * @return DataSource
     */
    public static DataSource getDataSource() {
        return dataSource;
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return null;
    }
    @Override
    protected DataSource determineTargetDataSource() {
        return getDataSource();
    }
}

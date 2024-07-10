package com.perfree.commons.utils;

import org.apache.commons.lang3.StringUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class SqlExecUtils {

    /**
     * 执行sql
     * @param sqlStr sqlStr
     * @throws SQLException SQLException
     */
    public static void execSql(String sqlStr) throws SQLException {
        if (StringUtils.isBlank(sqlStr)) {
            return;
        }
        DataSource dataSource = SpringBeanUtil.context.getBean(DataSource.class);
        Connection connection = dataSource.getConnection();
        Statement statement = connection.createStatement();
        String[] split = sqlStr.split(";");
        for (String sql : split) {
            statement.addBatch(sql);
        }
        statement.executeBatch();
    }
}

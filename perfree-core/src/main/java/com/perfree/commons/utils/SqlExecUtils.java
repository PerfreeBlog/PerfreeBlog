package com.perfree.commons.utils;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.commons.lang3.StringUtils;
import org.dromara.hutool.core.io.resource.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.sql.DataSource;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;

public class SqlExecUtils {

    /**
     * 执行sql
     * @param sqlFile sqlFile
     * @throws SQLException SQLException
     */
    public static void execSqlFile(File sqlFile) throws SQLException {
        if (!sqlFile.exists()){
            return;
        }
        Resource resource = new FileSystemResource(sqlFile.getAbsoluteFile());
        EncodedResource encodedResource = new EncodedResource(resource, StandardCharsets.UTF_8);
        HikariDataSource hikariDataSource = SpringBeanUtil.context.getBean(HikariDataSource.class);
        ScriptUtils.executeSqlScript(hikariDataSource.getConnection(), encodedResource);
    }
}

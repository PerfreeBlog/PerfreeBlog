package com.perfree.service;

import com.perfree.model.Database;

/**
 * @description InstallService
 * @author Perfree
 * @date 2021/11/15 10:18
 */
public interface InstallService {
    int addDatabase(Database database) throws Exception;
}

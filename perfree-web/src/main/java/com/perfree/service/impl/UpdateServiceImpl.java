package com.perfree.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.perfree.commons.Update;
import com.perfree.service.UpdateService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * @description 更新服务
 * @author Perfree
 * @date 2021/11/1 9:45
 */
@Service
public class UpdateServiceImpl implements UpdateService {
    private final static Logger LOGGER = LoggerFactory.getLogger(UpdateServiceImpl.class);
    @Value("${version}")
    private String version;


    /**
     * @description 检测是否有更新
     * @author Perfree
     * @date 2021/10/29 15:01
     */
    public Update checkUpdate(){
        String result = HttpUtil.get("https://api.github.com/repos/perfree/PerfreeBlog/releases/latest");
        JSONObject jsonObject = JSONUtil.parseObj(result);
        String tag_name = jsonObject.getStr("tag_name");

        String versionStr = tag_name.replaceAll("\\.","").replace("v","");
        if ( Long.parseLong(versionStr) <= Long.parseLong(version.replaceAll("\\.","").replace("v",""))) {
            return null;
        }
        String name = jsonObject.getStr("name");
        String body = jsonObject.getStr("body");

        Update update = new Update();

        JSONArray assets = jsonObject.getJSONArray("assets");
        for (Object asset : assets) {
            JSONObject assetJson = JSONUtil.parseObj(asset);
            if (StringUtils.isNotBlank(assetJson.getStr("name")) && assetJson.getStr("name").contains(".zip")) {
                update.setFileName(assetJson.getStr("name"));
                update.setBrowserDownloadUrl(assetJson.getStr("browser_download_url"));
                update.setSize(assetJson.getLong("size"));
                update.setSizeString(FileUtil.readableFileSize(update.getSize()));
            }
        }
        update.setBody(body);
        update.setName(name);
        update.setTagName(tag_name);
        return update;
    }
}

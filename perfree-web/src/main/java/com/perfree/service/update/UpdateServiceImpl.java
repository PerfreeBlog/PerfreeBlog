package com.perfree.service.update;

import cn.hutool.core.io.FileUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.perfree.enums.ErrorCode;
import com.perfree.exception.ServiceException;
import com.perfree.controller.api.setting.vo.UpdateRespVO;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UpdateServiceImpl implements UpdateService{
    private final static Logger LOGGER = LoggerFactory.getLogger(UpdateServiceImpl.class);

    @Value("${version}")
    private String version;
    @Override
    public UpdateRespVO checkUpdate() {
        try{
            String result = HttpUtil.get("https://api.github.com/repos/perfree/PerfreeBlog/releases/latest");
            JSONObject jsonObject = JSONUtil.parseObj(result);
            String tag_name = jsonObject.getStr("tag_name");

            String versionStr = tag_name.replaceAll("\\.","").replace("v","");
            if ( Long.parseLong(versionStr) <= Long.parseLong(version.replaceAll("\\.","").replace("v",""))) {
                return null;
            }
            String name = jsonObject.getStr("name");
            String body = jsonObject.getStr("body");

            UpdateRespVO update = new UpdateRespVO();
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
        }catch (Exception e) {
            LOGGER.error("check update error", e);
            throw new ServiceException(ErrorCode.CHECK_UPDATE_ERROR);
        }
    }
}

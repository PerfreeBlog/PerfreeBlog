package com.perfree.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.StreamProgress;
import cn.hutool.core.lang.Console;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;

@Service
public class UpdateService {
    private final static Logger LOGGER = LoggerFactory.getLogger(UpdateService.class);
    @Value("${web.backup-path}")
    private String backupPath;
    @Value("${version}")
    private String version;


    /**
     * @description 备份当前程序
     * @author Perfree
     * @date 2021/10/29 13:15
     */
    public void backup(){
        File file = new File(backupPath);
        if (!file.exists()) {
            boolean mkdir = file.mkdir();
        }
        File jarFile = new File("perfree-web.jar");
        if (!jarFile.exists()) {
            return;
        }
        FileUtil.copy(jarFile, new File(backupPath + "/perfree-web.jar"), true);
        FileUtil.copy(new File("resources/db"), new File(backupPath + "/resources"), true);
        FileUtil.copy(new File("resources/static"), new File(backupPath + "/resources"), true);
        FileUtil.copy(new File("resources/db.properties"), new File(backupPath + "/resources/db.properties"), true);
        FileUtil.copy(new File("resources/Perfree.sql"), new File(backupPath + "/resources/Perfree.sql"), true);
        FileUtil.copy(new File("resources/Perfree-sqlite.sql"), new File(backupPath + "/resources/Perfree-sqlite.sql"), true);
        FileUtil.copy(new File("resources/update.sql"), new File(backupPath + "/resources/update.sql"), true);
        FileUtil.copy(new File("resources/update-sqlite.sql"), new File(backupPath + "/resources/update-sqlite.sql"), true);
        FileUtil.copy(new File("config"), new File(backupPath), true);

        FileUtil.copy(new File("start.bat"), new File(backupPath + "/start.bat"), true);
        FileUtil.copy(new File("start.sh"), new File(backupPath + "/start.sh"), true);
    }

    public void update(){

    }

    /**
     * @description 检测是否有更新
     * @author Perfree
     * @date 2021/10/29 15:01
     */
    public HashMap<String, String> checkUpdate(){
        String result = HttpUtil.get("https://gitee.com/api/v5/repos/perfree/PerfreeBlog/releases/latest");
        JSONObject jsonObject = JSONUtil.parseObj(result);
        String tag_name = jsonObject.getStr("tag_name");

        if (tag_name.contains(version)) {
            return null;
        }
        String name = jsonObject.getStr("name");
        String body = jsonObject.getStr("body");
        JSONArray assets = jsonObject.getJSONArray("assets");
        JSONObject assetsObject = assets.getJSONObject(0);
        String browser_download_url = assetsObject.getStr("browser_download_url");

        HashMap<String, String> updateMap = new HashMap<>();
        updateMap.put("tag_name",tag_name);
        updateMap.put("name",name);
        updateMap.put("body",body);
        updateMap.put("browser_download_url",browser_download_url);
        return updateMap;
    }

    /**
     * @description 下载更新文件
     * @author Perfree
     * @date 2021/10/29 16:08
     */
    public String downloadUpdate(String url) {
        try {
            HttpResponse response = HttpRequest.get(url).timeout(-1).setFollowRedirects(true).executeAsync();
            if (response.isOk()) {
                File file = new File("update");
                if (!file.exists()) {
                    boolean mkdir = file.mkdir();
                }
                response.writeBody(file.getAbsoluteFile(), new StreamProgress() {
                    @Override
                    public void start() {
                        Console.log("开始下载。。。。");
                    }

                    @Override
                    public void progress(long progressSize) {
                        Console.log("已下载：{}", FileUtil.readableFileSize(progressSize));
                    }

                    @Override
                    public void finish() {
                        Console.log("下载完成！");
                    }
                });
                String[] split = url.split("/");
                String updateFileName = split[split.length-1];
                return "update/" + updateFileName;
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("系统更新 -> 文件下载失败: {}",e.getMessage());
        }
        return null;

    }

    public static void main(String[] args) {
       /* HashMap<String, String> stringStringHashMap = checkUpdate();
        LOGGER.info(stringStringHashMap.toString());*/
        //downloadUpdate("https://gitee.com/perfree/PerfreeBlog/attach_files/861560/download");
    }
}

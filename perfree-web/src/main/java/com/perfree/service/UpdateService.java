package com.perfree.service;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.StreamProgress;
import cn.hutool.core.lang.Console;
import cn.hutool.core.util.RuntimeUtil;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.perfree.commons.Update;
import com.perfree.commons.YamlUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class UpdateService {
    private final static Logger LOGGER = LoggerFactory.getLogger(UpdateService.class);
    @Value("${web.backup-path}")
    private String backupPath;
    @Value("${version}")
    private String version;


    @Value("${server.port}")
    private int port;

    @Value("${web.upload-path}")
    private String uploadPath;



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

    /**
     * @description 更新操作
     * @author Perfree
     * @date 2021/10/30 10:32
     */
    public boolean update(String updateFilePath){
        File file = new File(updateFilePath);
        File unZipDir = new File("update/unzip");
        if (unZipDir.exists()) {
            FileUtil.del(unZipDir.getAbsoluteFile());
        }
        // 解压
        ZipUtil.unzip(file.getAbsoluteFile(), unZipDir.getAbsoluteFile());
        // 修改配置文件
        File ymlFile = new File("update/unzip/perfree-web/config/application.yml");
        if (!ymlFile.exists()) {
            LOGGER.error("系统更新 -> 更新包的yml文件不存在");
            return false;
        }
        try {
            YamlUtils.setYmlFile(ymlFile);
            YamlUtils.saveOrUpdateByKey("web.backup-path", backupPath);
            YamlUtils.saveOrUpdateByKey("server.port", port);
            YamlUtils.saveOrUpdateByKey("web.upload-path", uploadPath);
            YamlUtils.close();
        }catch (Exception e) {
            LOGGER.error("系统更新 -> 修改更新包的yml文件失败");
            e.printStackTrace();
            return false;
        }

        // 执行更新脚本
        String osName = System.getProperty("os.name").toLowerCase();
        File perfreeWebDir = new File("update/unzip/perfree-web");
        if (osName.contains("win")) {
            File execBat = new File("exec.bat");
            Runtime rt = Runtime.getRuntime();
            Process ps=null;
            try {
                ps = rt.exec("cmd.exe /c start " + execBat.getAbsolutePath() + " " + perfreeWebDir.getAbsolutePath() + " " + port);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (osName.contains("linux")) {
            File execBat = new File("exec.sh");
            Runtime rt = Runtime.getRuntime();
            Process ps=null;
            try {
                rt.exec("sed -i 's/\\r//' " + execBat.getAbsolutePath());
                ps = rt.exec("bash -c" + execBat.getAbsolutePath() + " " + perfreeWebDir.getAbsolutePath() + " " + port);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            LOGGER.error("系统更新 -> 不支持的系统类型,请进行手动更新");
            return false;
        }
        return true;
    }

    /**
     * @description 检测是否有更新
     * @author Perfree
     * @date 2021/10/29 15:01
     */
    public Update checkUpdate(){
        String result = HttpUtil.get("https://gitee.com/api/v5/repos/perfree/PerfreeBlog/releases/latest");
        JSONObject jsonObject = JSONUtil.parseObj(result);
        String tag_name = jsonObject.getStr("tag_name");

        if (tag_name.contains(version)) {
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
            }
        }
        update.setBody(body);
        update.setName(name);
        update.setTagName(tag_name);
        return update;
    }

    /**
     * @description 下载更新文件
     * @author Perfree
     * @date 2021/10/29 16:08
     */
    public String downloadUpdate(Update update) {
        try {
            HttpResponse response = HttpRequest.get(update.getBrowserDownloadUrl()).timeout(-1).setFollowRedirects(true).executeAsync();
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
                return "update/" + update.getFileName();
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("系统更新 -> 文件下载失败: {}",e.getMessage());
        }
        return null;

    }

    public static void main(String[] args) {
      ZipUtil.unzip("C:\\Users\\Administrator\\Desktop\\perfree-web\\update\\perfree-web-1.2.5.zip");
    }
}

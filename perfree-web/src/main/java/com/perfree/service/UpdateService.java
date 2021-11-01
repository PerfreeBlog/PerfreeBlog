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
import com.perfree.common.Constants;
import com.perfree.commons.Update;
import com.perfree.commons.WebSocketMsg;
import com.perfree.commons.YamlUtils;
import com.perfree.controller.WebSocketServer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

/**
 * @description 更新服务
 * @author Perfree
 * @date 2021/11/1 9:45
 */
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


    @Async
    public void asyncUpdate(){
        try{
            WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "开始检查更新..."));
            Update update = checkUpdate();
            if (update != null) {
                WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "检测到更新包:"+update.getFileName()));
                WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "开始备份当前程序包..."));
                backup();
                WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "当前程序包备份完成"));
                String filePath = downloadUpdate(update);
                if (StringUtils.isNotBlank(filePath)) {
                    WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "开始执行更新..."));
                    update(filePath);
                } else {
                    WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "更新包下载失败,请重试!"));
                }
            } else {
                WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "未检查到更新,请重试!"));
            }
        }catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("系统更新 -> 更新失败:{}", e.getMessage());
        }
    }

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
        WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "正在解压更新包"));
        ZipUtil.unzip(file.getAbsoluteFile(), unZipDir.getAbsoluteFile());
        // 修改配置文件
        WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "修改更新包配置文件"));
        File ymlFile = new File("update/unzip/perfree-web/config/application.yml");
        if (!ymlFile.exists()) {
            WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "更新包的配置文件不存在,请重试"));
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
            WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "修改更新包的配置文件失败,请重试"));
            LOGGER.error("系统更新 -> 修改更新包的yml文件失败");
            e.printStackTrace();
            return false;
        }

        // 执行更新脚本
        WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "开始执行更新脚本"));
        String osName = System.getProperty("os.name").toLowerCase();
        System.out.println(osName);
        File perfreeWebDir = new File("update/unzip/perfree-web");
        if (osName.contains("win")) {
            File execBat = new File("exec.bat");
            try {
                ProcessBuilder bat = new ProcessBuilder("cmd.exe", "/c", "start", execBat.getAbsolutePath(),
                        perfreeWebDir.getAbsolutePath(), String.valueOf(port));
                asynExeLocalComand(null, bat);
            } catch (IOException e) {
                e.printStackTrace();
                LOGGER.error("系统更新 -> 更新失败,请进行手动更新");
                WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "更新失败,请进行手动更新"));
            }
        } else if (osName.contains("linux")) {
            File execBat = new File("exec.sh");
            try {
                RuntimeUtil.exec("sed -i 's/\\r//' " + execBat.getAbsolutePath());
                ProcessBuilder sh = new ProcessBuilder("sh", execBat.getAbsolutePath(), perfreeWebDir.getAbsolutePath());
                asynExeLocalComand(null, sh);
            } catch (Exception e) {
                e.printStackTrace();
                LOGGER.error("系统更新 -> 更新失败,请进行手动更新");
                WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "更新失败,请进行手动更新"));
            }
        } else {
            LOGGER.error("系统更新 -> 不支持的系统类型,请进行手动更新");
            WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "不支持的系统类型,请进行手动更新"));
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
        String result = HttpUtil.get("https://api.github.com/repos/perfree/PerfreeBlog/releases/latest");
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
                update.setSize(assetJson.getLong("size"));
                update.setSizeString(FileUtil.readableFileSize(update.getSize()));
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
            WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "开始下载更新包..."));
            update.setBrowserDownloadUrl(update.getBrowserDownloadUrl().replace("https://github.com", "https://github.com.cnpmjs.org"));
            HttpResponse response = HttpRequest.get(update.getBrowserDownloadUrl()).timeout(-1).setFollowRedirects(true).executeAsync();
            if (response.isOk()) {
                File file = new File("update");
                if (!file.exists()) {
                    boolean mkdir = file.mkdir();
                }
                response.writeBody(file.getAbsoluteFile(), new StreamProgress() {
                    @Override
                    public void start() {
                    }

                    @Override
                    public void progress(long progressSize) {
                        WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "已下载" +  FileUtil.readableFileSize(progressSize)));
                    }

                    @Override
                    public void finish() {
                        WebSocketServer.BroadCastInfo(new WebSocketMsg(Constants.WEBSOCKET_TYPE_UPDATE, "更新包下载完成"));
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

    /**
     * @description 执行脚本
     * @author Perfree
     * @date 2021/11/1 9:28
     */
    public static void asynExeLocalComand(File file, ProcessBuilder pb) throws IOException {
        // 不使用Runtime.getRuntime().exec(command)的方式,因为无法设置以下特性
        // Java执行本地命令是启用一个子进程处理,默认情况下子进程与父进程I/O通过管道相连(默认ProcessBuilder.Redirect.PIPE)
        // 当服务执行自身重启的命令时,父进程关闭导致管道连接中断,将导致子进程也崩溃,从而无法完成后续的启动
        // 解决方式,(1)设置子进程IO输出重定向到指定文件;(2)设置属性子进程的I/O源或目标将与当前进程的相同,两者相互独立
        if (file == null || !file.exists()) {
            // 设置属性子进程的I/O源或目标将与当前进程的相同,两者相互独立
            pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            pb.redirectError(ProcessBuilder.Redirect.INHERIT);
            pb.redirectInput(ProcessBuilder.Redirect.INHERIT);
        } else {
            // 设置子进程IO输出重定向到指定文件
            // 错误输出与标准输出,输出到一块
            pb.redirectErrorStream(true);
            // 设置输出日志
            pb.redirectOutput(ProcessBuilder.Redirect.appendTo(file));
        }
        // 执行命令进程
        pb.start();
    }
}

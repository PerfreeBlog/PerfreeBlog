package com.perfree.file;

import com.google.gson.Gson;
import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.model.Attach;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.DefaultPutRet;
import com.qiniu.util.Auth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

@Component
public class QiNiuOssHandle implements FileHandle{
    private final static Logger LOGGER = LoggerFactory.getLogger(QiNiuOssHandle.class);

    @Override
    public FileResult upload(MultipartFile file, String category) throws Exception {
        FileResult fileResult = new FileResult();
        String accessKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_ACCESS_KEY, "");
        String secretKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_SECRET, "");
        String bucket = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_BUCKET_NAME, "");
        Auth auth = Auth.create(accessKey, secretKey);
        String upToken = auth.uploadToken(bucket);
        try {
            Configuration cfg = new Configuration(Region.region0());
            UploadManager uploadManager = new UploadManager(cfg);
            String uploadPath = FileUtil.genUploadPath(file, category);
            Response response = uploadManager.put(file.getInputStream(), uploadPath, upToken, null, null);
            DefaultPutRet putRet = new Gson().fromJson(response.bodyString(), DefaultPutRet.class);
            fileResult.setKey(putRet.key);
            fileResult.setType(Constants.WEB_FILE_SAVE_TYPE_QINIU);
            fileResult.setUrl(OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_DOMAIN, "") + Constants.SEPARATOR + putRet.key);
        } catch (QiniuException ex) {
            LOGGER.error("文件上传失败:{}", ex.getMessage());
            throw new Exception("文件上传失败,请检查OSS配置!");
        }
        return fileResult;
    }

    @Override
    public void delete(Attach attach) throws Exception {
        String accessKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_ACCESS_KEY, "");
        String secretKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_SECRET, "");
        String bucket = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_BUCKET_NAME, "");
        Auth auth = Auth.create(accessKey, secretKey);
        try {
            Configuration cfg = new Configuration(Region.region0());
            BucketManager bucketManager = new BucketManager(auth, cfg);
            bucketManager.delete(bucket, attach.getFileKey());
        } catch (QiniuException ex) {
            ex.printStackTrace();
            LOGGER.error("文件删除失败:{}", ex.getMessage());
            throw new Exception("文件删除失败,请检查OSS配置!");
        }
    }

    @Override
    public void download(Attach attach, HttpServletResponse response) throws Exception {
        try {
            String encodedFileName = URLEncoder.encode(attach.getFileKey(), "utf-8").replace("+", "%20");
            String publicUrl = String.format("%s/%s", OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_DOMAIN, ""), encodedFileName);
            String accessKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_ACCESS_KEY, "");
            String secretKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_SECRET, "");
            Auth auth = Auth.create(accessKey, secretKey);
            String finalUrl = auth.privateDownloadUrl(publicUrl);
            URL url = new URL(finalUrl);
            URLConnection conn = url.openConnection();
            FileUtil.downloadFile(conn.getInputStream(), response);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("文件下载失败:{}", e.getMessage());
            throw new Exception("文件下载失败,请检查OSS配置!");
        }
    }
}

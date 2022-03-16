package com.perfree.file;

import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.model.Attach;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.model.PutObjectResult;
import com.qcloud.cos.region.Region;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class TencentCosHandle implements FileHandle{
    private final static Logger LOGGER = LoggerFactory.getLogger(TencentCosHandle.class);

    private COSClient getCOSClient() {
        String accessKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_ACCESS_KEY, "");
        String secretKey = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_SECRET, "");
        String region = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_REGION, "");
        COSCredentials cred = new BasicCOSCredentials(accessKey, secretKey);
        ClientConfig clientConfig = new ClientConfig(new Region(region));
        return new COSClient(cred, clientConfig);
    }

    @Override
    public FileResult upload(MultipartFile file, String category) throws Exception {
        FileResult fileResult = new FileResult();
        String bucket = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_BUCKET_NAME, "");
        COSClient cosClient = getCOSClient();
        try {
            String uploadPath = FileUtil.genUploadPath(file, category);
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, uploadPath, file.getInputStream(), null);
            PutObjectResult putObjectResult = cosClient.putObject(putObjectRequest);
            if (putObjectResult == null) {
                throw new Exception("文件上传失败,请检查OSS配置!");
            }
            fileResult.setKey(uploadPath);
            fileResult.setType(Constants.WEB_FILE_SAVE_TYPE_TENCENT);
            fileResult.setUrl(OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_DOMAIN, "") + Constants.SEPARATOR + uploadPath);
        }catch (Exception e) {
            LOGGER.error("文件上传失败:{}", e.getMessage());
            throw new Exception("文件上传失败,请检查OSS配置!");
        } finally {
            cosClient.shutdown();
        }
        return fileResult;
    }

    @Override
    public void delete(Attach attach) throws Exception {
        String bucket = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_BUCKET_NAME, "");
        COSClient cosClient = getCOSClient();
        try {
            cosClient.deleteObject(bucket, attach.getFileKey());
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("文件删除失败:{}", e.getMessage());
            throw new Exception("文件删除失败,请检查OSS配置!");
        } finally {
            cosClient.shutdown();
        }
    }
}

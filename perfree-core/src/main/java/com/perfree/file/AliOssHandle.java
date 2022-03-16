package com.perfree.file;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.PutObjectResult;
import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.model.Attach;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class AliOssHandle implements FileHandle{
    private final static Logger LOGGER = LoggerFactory.getLogger(AliOssHandle.class);

    private OSS getOssClient() {
        String endpoint = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_ENDPOINT, "");
        String accessKeyId = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_ACCESS_KEY, "");
        String accessKeySecret = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_SECRET, "");
        return new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
    }

    @Override
    public FileResult upload(MultipartFile file,String category) throws Exception {
        FileResult fileResult = new FileResult();
        String bucketName = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_BUCKET_NAME, "");
        String uploadPath = FileUtil.genUploadPath(file, category);
        OSS ossClient = getOssClient();
        try {
            PutObjectResult putObjectResult = ossClient.putObject(bucketName, uploadPath, file.getInputStream());
            if (putObjectResult == null) {
                throw new Exception("文件上传失败,请检查OSS配置!");
            }
            fileResult.setKey(uploadPath);
            fileResult.setType(Constants.WEB_FILE_SAVE_TYPE_ALI);
            fileResult.setUrl(OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_DOMAIN, "") + Constants.SEPARATOR + uploadPath);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("文件上传失败:{}", e.getMessage());
            throw new Exception("文件上传失败,请检查OSS配置!");
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
        return fileResult;
    }

    @Override
    public void delete(Attach attach) throws Exception {
        String bucketName = OptionCacheUtil.getDefaultValue(Constants.WEB_OSS_BUCKET_NAME, "");
        OSS ossClient = getOssClient();
        try {
            ossClient.deleteObject(bucketName, attach.getFileKey());
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("文件删除失败:{}", e.getMessage());
            throw new Exception("文件删除失败,请检查OSS配置!");
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
    }
}

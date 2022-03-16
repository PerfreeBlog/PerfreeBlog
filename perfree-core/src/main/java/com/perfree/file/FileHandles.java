package com.perfree.file;

import com.perfree.commons.Constants;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.model.Attach;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 文件相关操作
 */
@Component
public class FileHandles {
    private final ConcurrentHashMap<String, FileHandle> fileHandles = new ConcurrentHashMap<>(16);

    public FileHandles(ApplicationContext applicationContext) {
        fileHandles.put(Constants.WEB_FILE_SAVE_TYPE_ALI, applicationContext.getBean(AliOssHandle.class));
        fileHandles.put(Constants.WEB_FILE_SAVE_TYPE_LOCAL, applicationContext.getBean(LocalFileHandle.class));
        fileHandles.put(Constants.WEB_FILE_SAVE_TYPE_QINIU, applicationContext.getBean(QiNiuOssHandle.class));
        fileHandles.put(Constants.WEB_FILE_SAVE_TYPE_TENCENT, applicationContext.getBean(TencentCosHandle.class));
    }


    /**
     * 添加文件处理器
     * @param type 文件处理器类型
     * @param fileHandle 文件处理类
     */
    public void addFileHandle(String type, FileHandle fileHandle) {
        fileHandles.put(type, fileHandle);
    }

    /**
     * 获取文件处理器
     * @param type 类型
     * @return FileHandle
     */
    public FileHandle getFileHandle(String type) {
        return fileHandles.get(type);
    }

    /**
     * 文件上传
     * @param file file
     * @param category category
     * @return FileResult
     */
    public FileResult upload(MultipartFile file, String category) throws Exception {
        String type = OptionCacheUtil.getDefaultValue(Constants.WEB_FILE_SAVE_TYPE, Constants.WEB_FILE_SAVE_TYPE_LOCAL);
        return getFileHandle(type).upload(file, category);
    }

    /**
     * 删除文件
     * @param attach attach
     */
    public void delete(Attach attach) throws Exception {
        String type = StringUtils.isBlank(attach.getSaveType()) ? Constants.WEB_FILE_SAVE_TYPE_LOCAL : attach.getSaveType();
        getFileHandle(type).delete(attach);
    }

    /**
     * 下载文件
     * @param attach attach
     * @return InputStream
     */
    public void download(Attach attach, HttpServletResponse response) throws Exception {
        String type = StringUtils.isBlank(attach.getSaveType()) ? Constants.WEB_FILE_SAVE_TYPE_LOCAL : attach.getSaveType();
        getFileHandle(type).download(attach, response);
    }
}

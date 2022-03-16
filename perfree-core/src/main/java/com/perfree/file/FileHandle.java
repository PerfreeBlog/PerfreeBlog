package com.perfree.file;

import com.perfree.model.Attach;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件操作相关处理接口
 */
public interface FileHandle {

    /**
     * 文件上传
     * @param file MultipartFile
     * @return FileResult
     */
    FileResult upload(MultipartFile file, String category) throws Exception;


    /**
     * 删除
     * @param attach attach
     */
    void delete(Attach attach) throws Exception;
}

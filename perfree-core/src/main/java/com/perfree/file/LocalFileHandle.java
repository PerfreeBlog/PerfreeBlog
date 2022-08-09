package com.perfree.file;

import com.perfree.commons.Constants;
import com.perfree.commons.FileUtil;
import com.perfree.commons.StringUtil;
import com.perfree.model.Attach;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class LocalFileHandle implements FileHandle{
    @Value("${web.upload-path}")
    private String webUploadPath;

    @Override
    public FileResult upload(MultipartFile multiFile, String category) throws Exception {
        FileResult fileResult = new FileResult();
        try{
            if (multiFile == null){
                throw new Exception("文件为空!");
            }
            String multiFileName = multiFile.getOriginalFilename();
            if (StringUtils.isBlank(multiFileName)){
                throw new Exception("文件名为空!");
            }
            String suffix = multiFileName.substring(multiFileName.indexOf("."));
            String filename = StringUtil.getUUID() + suffix;
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            String uploadPath = Constants.SEPARATOR + category + Constants.SEPARATOR + formatter.format(new Date()) + Constants.SEPARATOR;
            String dirPath = webUploadPath + uploadPath;
            File dir = new File(dirPath);
            if (!dir.exists()){
                boolean mkdirs = dir.mkdirs();
                if (!mkdirs) {
                    throw new Exception("创建目录失败!" + dir.getAbsolutePath());
                }
            }
            File file = new File(dirPath + filename);
            multiFile.transferTo(file.getAbsoluteFile());
            fileResult.setKey(uploadPath + filename);
            fileResult.setType(Constants.WEB_FILE_SAVE_TYPE_LOCAL);
            fileResult.setUrl(uploadPath + filename);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
        return fileResult;
    }

    @Override
    public void delete(Attach attach) throws Exception {
        File file = new File(webUploadPath + attach.getPath());
        if (file.exists()) {
            boolean delete = file.delete();
        }
    }

    @Override
    public void download(Attach attach, HttpServletResponse response) throws Exception {
        File file = new File(webUploadPath + attach.getPath());
        if (file.exists()) {
            FileUtil.downloadFile(new FileInputStream(file), response);
            return;
        }
        throw new Exception("文件下载: 文件不存在!");
    }
}

package com.perfree.common;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * 文件相关工具类
 */
public class FileUtil {
    private final static String[] IMG_FILE_TYPE = {"jpg","png","gif","jpeg","tif","raw","svg","ico"};
    private final static String[] VIDEO_FILE_TYPE = {"avi","mov","rmvb","rm","mp4","flv","3gp","mpg","mlv","mpe","mpeg","vob"};
    private final static String[] AUDIO_FILE_TYPE = {"mp3","ogg","asf","wma","wav","mp3pro","midi","cd","aac"};
    private final static String SEPARATOR = "/";
    /**
     * 上传文件
     * @param multiFile 文件
     * @param dirPath 文件存储根目录
     * @param categoryPath 文件存储分类目录
     * @return String 文件路径
     * @throws Exception e
     */
    public static String uploadMultiFile(MultipartFile multiFile, String dirPath,String categoryPath) throws Exception {
        try{
            if (multiFile == null){
                throw new Exception("文件为空!");
            }
            // 原文件名
            String multiFileName = multiFile.getOriginalFilename();
            if (StringUtils.isBlank(multiFileName)){
                throw new Exception("文件名为空!");
            }
            // 获取文件后缀
            String suffix = multiFileName.substring(multiFileName.indexOf("."));
            // 组装新的文件名
            String filename = StringUtil.getUUID() + suffix;
            // 获取当天日期
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
            // 文件存储的子目录
            String uploadPath = SEPARATOR + categoryPath + SEPARATOR + formatter.format(new Date()) + SEPARATOR;
            // 组装保存的目录
            dirPath += uploadPath;
            File dir = new File(dirPath);
            if (!dir.exists()){
                boolean mkdirs = dir.mkdirs();
                if (!mkdirs) {
                    throw new Exception("创建目录失败!" + dir.getAbsolutePath());
                }
            }
            File file = new File(dirPath + filename);
            multiFile.transferTo(file);
            return uploadPath + filename;
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    /**
     * 获取文件类型
     * @param suffix 后缀名
     * @return String
     */
    public static String getFileType(String type,String suffix) {
        String d = suffix.replace(".","");
        if (StringUtils.isNotBlank(type)) {
            d = type;
        }
        if (StringUtils.isBlank(d)) {
            return "other";
        }
        // 图片类型
        if (Arrays.asList(IMG_FILE_TYPE).contains(d.toLowerCase())){
            return "img";
        }
        if (Arrays.asList(VIDEO_FILE_TYPE).contains(d.toLowerCase())){
            return "video";
        }
        if (Arrays.asList(AUDIO_FILE_TYPE).contains(d.toLowerCase())){
            return "audio";
        }
        return "other";
    }

    /**
     * 删除目录
     * @param file file
     */
    public static void deleteDirectory(File file){
        if(file.isFile()){
            file.delete();//清理文件
        }else{
            File list[] = file.listFiles();
            if(list!=null){
                for(File f: list){
                    deleteDirectory(f);
                }
                file.delete();//清理目录
            }
        }
    }
}

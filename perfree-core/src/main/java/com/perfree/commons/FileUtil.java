package com.perfree.commons;

import cn.hutool.core.io.resource.ClassPathResource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * 文件相关工具类
 * @author Perfree
 */
public class FileUtil {
    private final static String[] IMG_FILE_TYPE = {"jpg","png","gif","jpeg","tif","raw","svg","ico"};
    private final static String[] VIDEO_FILE_TYPE = {"avi","mov","rmvb","rm","mp4","flv","3gp","mpg","mlv","mpe","mpeg","vob"};
    private final static String[] AUDIO_FILE_TYPE = {"mp3","ogg","asf","wma","wav","mp3pro","midi","cd","aac"};

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
            String uploadPath = Constants.SEPARATOR + categoryPath + Constants.SEPARATOR + formatter.format(new Date()) + Constants.SEPARATOR;
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
            multiFile.transferTo(file.getAbsoluteFile());
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
            file.delete();
        }else{
            File[] list = file.listFiles();
            if(list!=null){
                for(File f: list){
                    deleteDirectory(f);
                }
                file.delete();
            }
        }
    }

    /**
     * @description  根据路径获取classpath文件
     * @param path path
     * @return java.io.File
     * @author Perfree
     */
    public static File getClassPathFile(String path) {
        try{
            return new ClassPathResource(path).getFile();
        }catch (Exception e) {
            return null;
        }
    }

    /**
     * 生成文件上传路径
     */
    public static String genUploadPath(MultipartFile file, String category) throws Exception {
        String multiFileName = file.getOriginalFilename();
        if (StringUtils.isBlank(multiFileName)){
            throw new Exception("文件名为空!");
        }
        String suffix = multiFileName.substring(multiFileName.indexOf("."));
        String filename = StringUtil.getUUID() + suffix;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        return category +  Constants.SEPARATOR + formatter.format(new Date()) + Constants.SEPARATOR + filename;
    }

    /**
     * 下载文件
     * @param inputStream 文件流
     * @param response HttpServletResponse
     */
    public static void downloadFile(InputStream inputStream, HttpServletResponse response) throws Exception {
        byte[] buffer = new byte[1024];
        try (BufferedInputStream bis = new BufferedInputStream(inputStream)) {
            OutputStream outputStream = response.getOutputStream();
            int i = bis.read(buffer);
            while (i != -1) {
                outputStream.write(buffer, 0, i);
                i = bis.read(buffer);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("文件流加载失败!");
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }

    }
}

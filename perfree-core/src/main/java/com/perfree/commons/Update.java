package com.perfree.commons;

/**
 * 系统更新参数实体类，对应github请求结果
 * @author Perfree
 */
public class Update {
    /** 标签名 */
    private String tagName;

    /** 更新版本名称 */
    private String name;

    /** 下载url */
    private String browserDownloadUrl;

    /** 更新内容 */
    private String body;

    /** 文件大小 */
    private Long size;

    /** 文件大小字符串 */
    private String sizeString;

    /** 文件名 */
    private String fileName;

    public String getSizeString() {
        return sizeString;
    }

    public void setSizeString(String sizeString) {
        this.sizeString = sizeString;
    }

    public Long getSize() {
        return size;
    }



    public void setSize(Long size) {
        this.size = size;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrowserDownloadUrl() {
        return browserDownloadUrl;
    }

    public void setBrowserDownloadUrl(String browserDownloadUrl) {
        this.browserDownloadUrl = browserDownloadUrl;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}

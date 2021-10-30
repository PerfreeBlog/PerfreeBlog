package com.perfree.commons;

public class Update {
    private String tagName;
    private String name;
    private String browserDownloadUrl;
    private String body;

    private String fileName;

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

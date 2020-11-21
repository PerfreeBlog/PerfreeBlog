package com.perfree.model;

import java.io.Serializable;

public class Theme implements Serializable {
    private static final long serialVersionUID = -7478937928185904570L;
    private String name;
    private String version;
    private String author;
    private String authorWebSite;
    private String description;
    private String updateUrl;
    private String screenshots;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthorWebSite() {
        return authorWebSite;
    }

    public void setAuthorWebSite(String authorWebSite) {
        this.authorWebSite = authorWebSite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUpdateUrl() {
        return updateUrl;
    }

    public void setUpdateUrl(String updateUrl) {
        this.updateUrl = updateUrl;
    }

    public String getScreenshots() {
        return screenshots;
    }

    public void setScreenshots(String screenshots) {
        this.screenshots = screenshots;
    }
}

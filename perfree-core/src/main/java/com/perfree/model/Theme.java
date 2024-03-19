package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

/**
 * 定义主题实体
 *
 * @author Perfree
 */
@Schema(description = "Theme-主题数据")
public class Theme implements Serializable {
    private static final long serialVersionUID = -7478937928185904570L;
    @Schema(description = "主题名称", name = "name")
    private String name;

    @Schema(description = "主题版本", name = "version")
    private String version;

    @Schema(description = "主题作者", name = "author")
    private String author;

    @Schema(description = "作者网站", name = "authorWebSite")
    private String authorWebSite;

    @Schema(description = "描述", name = "description")
    private String description;

    @Schema(description = "更新url", name = "updateUrl")
    private String updateUrl;

    @Schema(description = "截图", name = "screenshots")
    private String screenshots;

    @Schema(hidden = true)
    private Integer isActive = 0;

    @Schema(description = "主题路径", name = "path")
    private String path;

    @Schema(description = "主题路径", name = "absolutePath")
    private String absolutePath;

    @Schema(description = "主题类型", name = "type")
    private String type;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getIsActive() {
        return isActive;
    }

    public void setIsActive(Integer isActive) {
        this.isActive = isActive;
    }

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

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this.absolutePath = absolutePath;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

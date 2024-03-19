package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Perfree
 * @description Plugin model
 * @date 2021/8/13 13:42
 */
@Schema(description = "插件数据")
public class Plugin implements Serializable {
    private static final long serialVersionUID = 7817277417501722377L;
    @Schema(description = "插件ID", name = "id")
    private Long id;

    @Schema(description = "插件名", name = "name")
    private String name;

    @Schema(description = "插件路径", name = "path")
    private String path;

    @Schema(description = "插件描述", name = "desc")
    private String desc;

    @Schema(description = "插件版本", name = "version")
    private String version;

    @Schema(description = "插件作者", name = "author")
    private String author;

    @Schema(description = "创建时间", name = "createTime")
    private Date createTime;

    @Schema(description = "更新时间", name = "updateTime")
    private Date updateTime;

    @Schema(description = "插件状态", name = "status")
    private Integer status = 0;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}

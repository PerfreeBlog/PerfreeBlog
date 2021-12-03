package com.perfree.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

/**
 * @description Plugin model
 * @author Perfree
 * @date 2021/8/13 13:42
 */
@ApiModel(value="Plugin-插件数据",description="插件数据")
public class Plugin implements Serializable {
    private static final long serialVersionUID = 7817277417501722377L;
    @ApiModelProperty(value="插件ID",name="id")
    private Long id;

    @ApiModelProperty(value="插件名",name="name")
    private String name;

    @ApiModelProperty(value="插件路径",name="path")
    private String path;

    @ApiModelProperty(value="插件描述",name="desc")
    private String desc;

    @ApiModelProperty(value="插件版本",name="version")
    private String version;

    @ApiModelProperty(value="插件作者",name="author")
    private String author;

    @ApiModelProperty(value="创建时间",name="createTime")
    private Date createTime;

    @ApiModelProperty(value="更新时间",name="updateTime")
    private Date updateTime;

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

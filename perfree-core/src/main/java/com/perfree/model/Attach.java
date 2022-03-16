package com.perfree.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

/**
 * attach table
 * @author Perfree
 */
@ApiModel(value="Attach-附件数据",description="附件数据")
public class Attach implements Serializable {
    private static final long serialVersionUID = 4900174588193382137L;
    @ApiModelProperty(value="附件ID",name="id")
    private Long id;

    @ApiModelProperty(value="附件名称",name="name")
    private String name;

    @ApiModelProperty(value="附件描述",name="desc")
    private String desc;

    @ApiModelProperty(value="附件路径",name="path")
    private String path;

    @ApiModelProperty(value="附件后缀",name="suffix")
    private String suffix;

    @ApiModelProperty(value="附件标识",name="flag")
    private String flag;

    @ApiModelProperty(value="附件类型",name="type")
    private String type;

    @ApiModelProperty(value="创建时间",name="createTime")
    private Date createTime;

    @ApiModelProperty(value="修改时间",name="updateTime")
    private Date updateTime;

    @ApiModelProperty(value="存储方式",name="saveType")
    private String saveType;

    @ApiModelProperty(value="fileKey",name="fileKey")
    private String fileKey;

    @ApiModelProperty(value="附件链接",name="url")
    private String url;

    public String getUrl() {
       /* if (StringUtils.isNotBlank(path) && !path.startsWith("http")) {
            return "/static" + path;
        }*/
        return path;
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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSaveType() {
        return saveType;
    }

    public void setSaveType(String saveType) {
        this.saveType = saveType;
    }

    public String getFileKey() {
        return fileKey;
    }

    public void setFileKey(String fileKey) {
        this.fileKey = fileKey;
    }

    @Override
    public String toString() {
        return "Attach{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", path='" + path + '\'' +
                ", suffix='" + suffix + '\'' +
                ", flag='" + flag + '\'' +
                ", type='" + type + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}

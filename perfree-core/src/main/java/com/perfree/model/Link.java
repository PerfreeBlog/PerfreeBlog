package com.perfree.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

/**
 * 友链实体
 * @author Perfree
 */
@ApiModel(value="Link-友链数据",description="友链数据")
public class Link implements Serializable {
    private static final long serialVersionUID = 7817276417501762472L;
    @ApiModelProperty(value="友链ID",name="id")
    private Long id;

    @ApiModelProperty(value="友链名",name="name")
    private String name;

    @ApiModelProperty(value="友链logo",name="logo")
    private String logo;

    @ApiModelProperty(value="友链描述",name="desc")
    private String desc;

    @ApiModelProperty(value="友链地址",name="address")
    private String address;

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

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}

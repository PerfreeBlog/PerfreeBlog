package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;
import java.util.Date;

/**
 * role table
 *
 * @author Perfree
 */
@Schema(description = "角色数据")
public class Role implements Serializable {
    private static final long serialVersionUID = -7909060114936447269L;

    @Schema(description = "角色ID", name = "id")
    private Long id;

    @Schema(description = "角色名", name = "name")
    private String name;

    @Schema(description = "角色描述", name = "description")
    private String description;

    @Schema(description = "角色代码", name = "code")
    private String code;

    @Schema(description = "创建时间", name = "createTime")
    private Date createTime;

    @Schema(description = "更新时间", name = "updateTime")
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", code='" + code + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}

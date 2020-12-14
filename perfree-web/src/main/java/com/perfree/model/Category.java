package com.perfree.model;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * category table
 */
public class Category implements Serializable {
    private static final long serialVersionUID = -3275180034882679507L;
    private Long id;
    private Long pid;
    @NotBlank(message = "分类名不允许为空")
    @Length(max = 50,message = "分类名最多50个字符")
    private String name;
    @Length(max = 200,message = "分类描述最多200个字符")
    private String desc;
    private Long count;
    @Length(max = 120,message = "SEO关键字最多120个字符")
    private String metaKeywords;
    @Length(max = 120,message = "SEO关键字最多150个字符")
    private String metaDescription;
    @NotNull(message = "状态不允许为空")
    private int status;
    private Date createTime;
    private Date updateTime;
    private List<Category> children;
    private Long value;
    private String url;

    public Long getValue() {
        return this.id;
    }

    public void setValue(Long value) {
        this.value = value;
    }
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<Category> getChildren() {
        return children;
    }

    public void setChildren(List<Category> children) {
        this.children = children;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
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

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
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

    public String getUrl() {
        return "/category/" + id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", pid=" + pid +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", count=" + count +
                ", metaKeywords='" + metaKeywords + '\'' +
                ", metaDescription='" + metaDescription + '\'' +
                ", status=" + status +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", childCategory=" + children +
                '}';
    }
}

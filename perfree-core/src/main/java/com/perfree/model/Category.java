package com.perfree.model;

import com.perfree.commons.Constants;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * category table
 * @author Perfree
 */
@ApiModel(value="Category-分类数据",description="分类数据")
public class Category implements Serializable {
    private static final long serialVersionUID = -3275180034882679507L;
    @ApiModelProperty(value="分类ID",name="id")
    private Long id;

    @ApiModelProperty(value="分类父级ID",name="pid")
    private Long pid;

    @ApiModelProperty(value="分类名",name="name")
    @NotBlank(message = "分类名不允许为空")
    @Length(max = 50,message = "分类名最多50个字符")
    private String name;

    @ApiModelProperty(value="分类描述",name="desc")
    @Length(max = 200,message = "分类描述最多200个字符")
    private String desc;

    @ApiModelProperty(value="文章数量",name="count")
    private Long count;

    @ApiModelProperty(value="SEO关键字",name="metaKeywords")
    @Length(max = 120,message = "SEO关键字最多120个字符")
    private String metaKeywords;

    @ApiModelProperty(value="SEO描述",name="metaDescription")
    @Length(max = 120,message = "SEO描述最多150个字符")
    private String metaDescription;

    @ApiModelProperty(value="状态",name="status", example = "0:正常,1禁用")
    @NotNull(message = "状态不允许为空")
    private Integer status;

    @ApiModelProperty(value="别名",name="slug")
    private String slug;

    @ApiModelProperty(value="封面图",name="thumbnail")
    private String thumbnail;

    @ApiModelProperty(value="创建时间",name="createTime")
    private Date createTime;

    @ApiModelProperty(value="更新时间",name="updateTime")
    private Date updateTime;

    @ApiModelProperty(value="子分类",name="children")
    private List<Category> children;

    @ApiModelProperty(hidden = true)
    private Long value;

    @ApiModelProperty(value="分类链接",name="url")
    private String url;

    public Long getValue() {
        return this.id;
    }

    public void setValue(Long value) {
        this.value = value;
    }
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
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
        return Constants.URL_ARTICLE_CATEGORY + id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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
                ", slug=" + slug +
                ", thumbnail=" + thumbnail +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", childCategory=" + children +
                '}';
    }
}

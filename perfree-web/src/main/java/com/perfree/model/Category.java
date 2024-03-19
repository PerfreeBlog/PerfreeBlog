package com.perfree.model;

import com.perfree.commons.Constants;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * category table
 *
 * @author Perfree
 */
@Schema(description = "分类数据")
public class Category implements Serializable {
    private static final long serialVersionUID = -3275180034882679507L;
    @Schema(description = "分类ID", name = "id")
    private Long id;

    @Schema(description = "分类父级ID", name = "pid")
    private Long pid;

    @Schema(description = "分类名", name = "name")
    @NotBlank(message = "分类名不允许为空")
    @Length(max = 50, message = "分类名最多50个字符")
    private String name;

    @Schema(description = "分类描述", name = "desc")
    @Length(max = 200, message = "分类描述最多200个字符")
    private String desc;

    @Schema(description = "文章数量", name = "count")
    private Long count;

    @Schema(description = "SEO关键字", name = "metaKeywords")
    @Length(max = 120, message = "SEO关键字最多120个字符")
    private String metaKeywords;

    @Schema(description = "SEO描述", name = "metaDescription")
    @Length(max = 120, message = "SEO描述最多150个字符")
    private String metaDescription;

    @Schema(description = "状态", name = "status", example = "0:正常,1禁用")
    @NotNull(message = "状态不允许为空")
    private Integer status;

    @Schema(description = "别名", name = "slug")
    private String slug;

    @Schema(description = "封面图", name = "thumbnail")
    private String thumbnail;

    @Schema(description = "创建时间", name = "createTime")
    private Date createTime;

    @Schema(description = "更新时间", name = "updateTime")
    private Date updateTime;

    @Schema(description = "子分类", name = "children")
    private List<Category> children;

    @Schema(hidden = true)
    private Long value;

    @Schema(description = "分类链接", name = "url")
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

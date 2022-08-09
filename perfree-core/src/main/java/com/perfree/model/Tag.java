package com.perfree.model;

import com.perfree.commons.Constants;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

/**
 * tag Table
 * @author Perfree
 */
@ApiModel(value="Tag-标签数据",description="标签数据")
public class Tag implements Serializable {
    private static final long serialVersionUID = 7349480507456460022L;

    @ApiModelProperty(value="标签ID",name="id")
    private Long id;

    @ApiModelProperty(value="标签名",name="name")
    private String name;

    @ApiModelProperty(value="用户id",name="userId")
    private Long userId;

    @ApiModelProperty(value="标签颜色",name="color")
    private String color;

    @ApiModelProperty(value="封面图",name="thumbnail")
    private String thumbnail;

    @ApiModelProperty(value="别名",name="slug")
    private String slug;

    @ApiModelProperty(value="创建时间",name="createTime")
    private Date createTime;

    @ApiModelProperty(value="更新时间",name="updateTime")
    private Date updateTime;

    @ApiModelProperty(value="创建人用户信息",name="user")
    private User user;

    @ApiModelProperty(value="文章数",name="articleCount")
    private Long articleCount;

    @ApiModelProperty(value="标签链接",name="url")
    private String url;

    public Long getArticleCount() {
        return articleCount;
    }

    public void setArticleCount(Long articleCount) {
        this.articleCount = articleCount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
        return Constants.URL_ARTICLE_TAG + id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userId=" + userId +
                ", color=" + color +
                ", thumbnail=" + thumbnail +
                ", slug=" + slug +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                '}';
    }
}

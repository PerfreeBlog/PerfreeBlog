package com.perfree.model;

import com.perfree.commons.Constants;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * article table
 * @author Perfree
 */
@ApiModel(value="Article-文章数据",description="文章数据")
public class Article implements Serializable {
    private static final long serialVersionUID = 4900274588193382137L;
    @ApiModelProperty(value="文章ID",name="id",example="1")
    private Long id;

    @NotBlank(message = "文章标题不允许为空")
    @Length(min = 1,max = 200,message = "文章标题长度要在1-200字之间")
    @ApiModelProperty(value="文章标题",name="title",example="Hello World")
    private String title;

    @NotBlank(message = "文章内容不允许为空")
    @ApiModelProperty(value="文章内容",name="content")
    private String content;

    @ApiModelProperty(value="文章摘要",name="summary")
    private String summary;

    @ApiModelProperty(value="文章所属分类ID",name="categoryId")
    private Long categoryId;

    @ApiModelProperty(value="文章SEO关键字",name="metaKeywords")
    private String metaKeywords;

    @ApiModelProperty(value="文章SEO描述",name="metaDescription")
    private String metaDescription;

    @ApiModelProperty(value="文章封面图",name="thumbnail")
    private String thumbnail;

    @NotNull(message = "请选择文章是否置顶")
    @ApiModelProperty(value="文章是否置顶",name="isTop", example = "0:否,1:是")
    private Integer isTop;

    @NotNull(message = "文章状态不能为空")
    @ApiModelProperty(value="文章状态",name="status", example = "0:已发布,1:草稿")
    private Integer status;

    @ApiModelProperty(value="文章评论数",name="commentCount")
    private Long commentCount;

    @ApiModelProperty(value="文章阅读数",name="viewCount")
    private Long viewCount;

    @ApiModelProperty(value="点赞数",name="greatCount")
    private Long greatCount;

    @ApiModelProperty(value="文章发表人ID",name="userId")
    private Long userId;

    @NotNull(message = "请选择文章是否允许评论")
    @ApiModelProperty(value="文章是否允许评论",name="isComment", example = "0:否,1是")
    private Integer isComment;

    @ApiModelProperty(value="文章创建时间",name="createTime")
    private Date createTime;

    @ApiModelProperty(value="文章更新时间",name="updateTime")
    private Date updateTime;

    @ApiModelProperty(value="文章类型",name="type", example = "article文章,page页面")
    private String type;

    @ApiModelProperty(value="文本类型",name="contentModel", example = "markdown,html")
    private String contentModel;

    @ApiModelProperty(value="文章所使用到的标签",name="tags")
    private List<Tag> tags;

    @ApiModelProperty(value="文章发表人信息",name="user")
    private User user;

    @ApiModelProperty(value="文章所属分类信息",name="category")
    private Category category;

    @ApiModelProperty(hidden = true)
    private List<ArticleTag> articleTags;

    @ApiModelProperty(value="文章链接",name="url")
    private String url;

    @ApiModelProperty(value="别名",name="slug")
    private String slug;

    @ApiModelProperty(value="标识",name="flag")
    private String flag;

    @ApiModelProperty(value="模板",name="template")
    private String template;

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public String getContentModel() {
        return contentModel;
    }

    public void setContentModel(String contentModel) {
        this.contentModel = contentModel;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public List<ArticleTag> getArticleTags() {
        return articleTags;
    }

    public void setArticleTags(List<ArticleTag> articleTags) {
        this.articleTags = articleTags;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Integer getIsTop() {
        return isTop;
    }

    public void setIsTop(Integer isTop) {
        this.isTop = isTop;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Long getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(Long commentCount) {
        this.commentCount = commentCount;
    }

    public Long getViewCount() {
        return viewCount;
    }

    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getIsComment() {
        return isComment;
    }

    public void setIsComment(Integer isComment) {
        this.isComment = isComment;
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
        String pre = Constants.URL_ARTICLE;
        if (Constants.ARTICLE_TYPE_PAGE.equals(type)) {
            pre = Constants.URL_PAGE;
        }
        if (StringUtils.isBlank(slug)) {
            return pre + id;
        }
        return pre + slug;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getGreatCount() {
        return greatCount;
    }

    public void setGreatCount(Long greatCount) {
        this.greatCount = greatCount;
    }
}

package com.perfree.controller.auth.article.vo;

import com.perfree.commons.common.CommonUserMsg;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.UrlUtil;
import com.perfree.constant.ArticleConstant;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Schema(description = "文章RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleRespVO extends ArticleBaseVO{
    @Schema(description = "id")
    private Integer id;

    @Schema(description = "评论数")
    private Integer commentCount;

    @Schema(description = "访问量")
    private Integer viewCount;

    @Schema(description = "点赞数")
    private Integer greatCount;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;

    @Schema(description = "标签")
    private List<ArticleTagRespVO> tagList;

    @Schema(description = "分类")
    private List<ArticleCategoryRespVO> categoryList;

    @Schema(description = "用户信息")
    private CommonUserMsg user;

    @Schema(description = "url")
    private String url;

    public String getUrl() {

        if (getType().equals(ArticleConstant.ARTICLE_TYPE_PAGE)) {
            return UrlUtil.buildUrl(SystemConstants.URL_PAGE + getSlug());
        } else {
            return UrlUtil.buildUrl(SystemConstants.URL_ARTICLE + getSlug());
        }
    }
}

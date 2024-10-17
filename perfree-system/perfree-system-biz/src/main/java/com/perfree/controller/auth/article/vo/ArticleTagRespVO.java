package com.perfree.controller.auth.article.vo;

import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.UrlUtil;
import com.perfree.controller.auth.tag.vo.TagBaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "文章-标签RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleTagRespVO extends TagBaseVO {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "url")
    private String url;

    public String getUrl() {
        return UrlUtil.buildUrl(SystemConstants.URL_ARTICLE_TAG + getSlug());
    }
}

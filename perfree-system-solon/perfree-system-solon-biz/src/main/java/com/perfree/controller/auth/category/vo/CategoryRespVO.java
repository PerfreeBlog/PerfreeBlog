package com.perfree.controller.auth.category.vo;

import com.perfree.commons.common.CommonUserMsg;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.UrlUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "分类RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryRespVO extends CategoryBaseVO{

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "文章数量")
    private Integer count;

    @Schema(description = "状态0:正常,1禁用")
    private Integer status;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;

    @Schema(description = "用户信息")
    private CommonUserMsg userInfo;

    @Schema(description = "url")
    private String url;

    public String getUrl() {
        return UrlUtil.buildUrl(SystemConstants.URL_ARTICLE_CATEGORY + getSlug());
    }
}

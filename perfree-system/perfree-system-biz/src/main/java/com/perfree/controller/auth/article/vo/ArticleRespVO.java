package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "管理后台 - 文章RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleRespVO extends ArticleBaseVO{
    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建人")
    private String userName;

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

}

package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Schema(description = "管理后台 - 文章添加ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleAddReqVO extends ArticleBaseVO {

    @Schema(description = "分类id集合")
    private List<String> categoryIds;

    @Schema(description = "标签id集合")
    private List<String> tagIds;
}

package com.perfree.controller.auth.article.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Schema(description = "文章更新ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleUpdateReqVO extends ArticleBaseVO {

    @Schema(description = "id", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "文章id不能为空")
    private Integer id;

    @Schema(description = "分类id集合")
    private List<Integer> categoryIds;

    @Schema(description = "标签id集合")
    private List<Integer> tagIds;

    @Schema(description = "新增的标签集合")
    private List<String> addTags;
}

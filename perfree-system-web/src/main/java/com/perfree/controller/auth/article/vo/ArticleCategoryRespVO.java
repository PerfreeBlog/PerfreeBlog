package com.perfree.controller.auth.article.vo;

import com.perfree.controller.auth.category.vo.CategoryBaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "文章-分类RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleCategoryRespVO extends CategoryBaseVO {

    @Schema(description = "id")
    private Integer id;
}

package com.perfree.controller.auth.article.vo;

import com.perfree.controller.auth.user.vo.UserBaseVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "文章-用户RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleUserRespVO extends UserBaseVO {

    @Schema(description = "id")
    private Integer id;
}

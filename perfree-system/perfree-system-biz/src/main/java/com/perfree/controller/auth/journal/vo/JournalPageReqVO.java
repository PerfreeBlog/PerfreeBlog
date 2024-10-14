package com.perfree.controller.auth.journal.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "动态分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class JournalPageReqVO extends PageParam {
    @Schema(description = "内容")
    private String content;

    @Schema(description = "是否可见")
    private Integer visibility;

}

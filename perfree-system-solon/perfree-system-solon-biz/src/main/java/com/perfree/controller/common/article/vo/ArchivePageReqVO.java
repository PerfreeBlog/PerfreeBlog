package com.perfree.controller.common.article.vo;

import com.perfree.commons.common.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Schema(description = "文章分页ReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class ArchivePageReqVO extends PageParam {
}

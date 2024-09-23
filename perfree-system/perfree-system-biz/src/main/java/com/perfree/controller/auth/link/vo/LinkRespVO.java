package com.perfree.controller.auth.link.vo;

import com.perfree.commons.common.CommonUserMsg;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Schema(description = "友链RespVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class LinkRespVO extends LinkBaseVO {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;

    @Schema(description = "用户信息")
    private CommonUserMsg userInfo;
}

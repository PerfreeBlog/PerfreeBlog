package com.perfree.controller.auth.tag.vo;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "标签updateVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class TagUpdateReqVO extends TagBaseVO{

    @Schema(description = "id")
    private Integer id;

}

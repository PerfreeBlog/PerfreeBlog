package com.perfree.controller.auth.attachLibraryItems.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
* @description 附件库数据 AddReqVO
* @author Perfree
**/
@Schema(description = "附件库数据batchAddReqVO")
@Data
public class AttachLibraryItemsBatchAddReqVO{

    private List<AttachLibraryItemsAddReqVO> attachList;
}

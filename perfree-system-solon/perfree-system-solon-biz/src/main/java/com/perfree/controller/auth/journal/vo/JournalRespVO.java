package com.perfree.controller.auth.journal.vo;

import com.perfree.commons.common.CommonUserMsg;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.UrlUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class JournalRespVO {

    @Schema(description = "id")
    private Integer id;

    @Schema(description = "评论数")
    private Integer commentCount;

    @Schema(description = "点赞数")
    private Integer greatCount;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "更新时间")
    private Date updateTime;

    @Schema(description = "用户信息")
    private CommonUserMsg user;

    @Schema(description = "文章内容")
    private String content;

    @Schema(description = "文章内容类型:html/markdown")
    private String contentModel;

    @Schema(description = "解析后的文章内容")
    private String parseContent;

    @Schema(description = "状态0:已发布,1:草稿")
    private Integer status;

    @Schema(description = "是否置顶0:否,1:是")
    private Integer isTop;

    @Schema(description = "是否允许评论0:否,1是")
    private Integer isComment;

    @Schema(description = "是否可见")
    private Integer visibility;

    private List<JournalAttachRespVO> attachList;
}

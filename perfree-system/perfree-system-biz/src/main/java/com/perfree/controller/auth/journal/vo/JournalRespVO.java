package com.perfree.controller.auth.journal.vo;

import com.perfree.controller.auth.article.vo.ArticleUserRespVO;
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
    private ArticleUserRespVO user;

    @Schema(description = "文章内容")
    private String content;

    @Schema(description = "文章内容类型:html/markdown")
    private String contentModel;

    @Schema(description = "解析后的文章内容")
    private String parseContent;

    private List<JournalAttachRespVO> attachList;
}

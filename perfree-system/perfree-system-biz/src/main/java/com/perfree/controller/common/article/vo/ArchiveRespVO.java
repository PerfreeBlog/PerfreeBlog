package com.perfree.controller.common.article.vo;

import com.perfree.controller.auth.article.vo.ArticleRespVO;
import lombok.Data;

import java.util.List;

@Data
public class ArchiveRespVO {

    private String date;

    private List<ArticleRespVO> articles;
}

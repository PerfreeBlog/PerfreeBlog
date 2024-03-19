package com.perfree.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 定义归档实体类
 *
 * @author Perfree
 */
@Data
@Schema(description = "文章归档数据")
public class Archive implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Schema(description = "日期", name = "date", example = "2021年12月")
    private String date;

    @Schema(description = "文章数据", name = "articles")
    private List<Article> articles;
}

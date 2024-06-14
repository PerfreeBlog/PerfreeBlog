package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 分类表
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Getter
@Setter
@TableName("p_category")
public class Category extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 分类名
     */
    private String name;

    /**
     * 父级id
     */
    private Integer pid;

    /**
     * 描述
     */
    @TableField(value = "'desc'")
    private String desc;

    /**
     * 文章数量
     */
    private Integer count;

    /**
     * SEO关键字
     */
    private String metaKeywords;

    /**
     * SEO描述内容
     */
    private String metaDescription;

    /**
     * 封面图
     */
    private String thumbnail;

    /**
     * slug
     */
    private String slug;

    /**
     * 状态0:正常,1禁用
     */
    private Integer status;

}

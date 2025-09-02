package com.perfree.model;

import com.mybatisflex.annotation.ColumnAlias;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

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
@Table("p_category")
public class Category extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @Id(keyType = KeyType.Auto)
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
    @ColumnAlias(value = "`desc`")
    private String desc;

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

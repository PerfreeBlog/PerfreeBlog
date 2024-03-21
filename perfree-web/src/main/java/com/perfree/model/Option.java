package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * option table
 *
 * @author Perfree
 */
@TableName("p_option")
@Data
public class Option implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 配置key
     */
    @TableField(value = "`key`")
    private String key;

    /**
     * 配置value
     */
    @TableField(value = "`value`")
    private String value;

    /**
     * 站点ID
     */
    private Long siteId;
}

package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * menu table
 *
 * @author Perfree
 */
@TableName("p_menu")
@Data
public class Menu implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.ASSIGN_UUID)
    private String id;

    private String pid;

    private String name;

    private String url;

    private String icon;

    private Integer seq;

    private Integer type;

    private Integer status;

    private Long siteId;

    private String flag;

    private Long pluginId;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    private Integer target;

}

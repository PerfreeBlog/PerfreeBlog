package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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

    @TableId(value = "id", type = IdType.AUTO)
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

    private Date createTime;

    private Date updateTime;

    private Integer target;

}

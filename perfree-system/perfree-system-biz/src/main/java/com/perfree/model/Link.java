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
 * 
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Getter
@Setter
@TableName("p_link")
public class Link extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 网站名
     */
    private String name;

    /**
     * 网站logo
     */
    private String logo;

    /**
     * 网站描述
     */
    @TableField("`desc`")
    private String desc;

    /**
     * 网站地址
     */
    private String address;

}

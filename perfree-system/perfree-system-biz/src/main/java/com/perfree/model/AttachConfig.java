package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

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
@TableName("p_attach_config")
public class AttachConfig extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 配置名
     */
    private String name;

    /**
     * 存储器
     */
    private Integer storage;

    /**
     * 备注
     */
    private String remark;

    /**
     * 存储配置
     */
    private String config;

    /**
     * 是否为主配置
     */
    private Boolean master;

}

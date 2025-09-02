package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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
 * 
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Getter
@Setter
@Table("p_attach_config")
public class AttachConfig extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @Id(keyType = KeyType.Auto)
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

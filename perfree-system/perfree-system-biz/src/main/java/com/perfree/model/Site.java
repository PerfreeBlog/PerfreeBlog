package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@TableName("p_site")
public class Site extends BaseModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 站点名称
     */
    private String siteName;

    /**
     * 站点描述
     */
    private String siteDesc;

    /**
     * 站点访问标识
     */
    private String siteSlug;

    /**
     * 状态0:正常,1:禁用
     */
    private Integer status;

}

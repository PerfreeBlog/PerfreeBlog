package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import com.perfree.base.BaseModel;
import lombok.*;
import java.util.*;

import java.io.Serial;
import java.io.Serializable;

/**
* @description 附件库
* @author Perfree
*/
@Getter
@Setter
@TableName("p_attach_library")
public class AttachLibrary extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
    * 主键
    */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
    * 附件库名称
    */
    private String name;

    /**
    * 描述
    */
    private String description;

    /**
    * 附件库类型:  附件库类型: img: 图库, video视频库, audio音乐库,other其他
    */
    private String type;

    /**
    * 是否可见, 0是, 1否
    */
    private Integer visibility;

    /**
    * 封面图
    */
    private String thumbnail;
}

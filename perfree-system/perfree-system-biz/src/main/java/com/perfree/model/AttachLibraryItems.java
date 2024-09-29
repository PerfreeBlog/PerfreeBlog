package com.perfree.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@TableName("p_attach_library_items")
public class AttachLibraryItems extends BaseModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 附件库id
     */
    private Integer attachLibraryId;

    /**
     * 附件id
     */
    private Integer attachId;

    private String url;

    private String type;

    private String mineType;

    private String name;
}

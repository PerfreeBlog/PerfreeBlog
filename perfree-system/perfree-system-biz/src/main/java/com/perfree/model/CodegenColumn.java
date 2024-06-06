package com.perfree.model;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@TableName("p_codegen_column")
public class CodegenColumn implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private Integer tableId;

    private String columnName;

    private String dataType;

    private String columnComment;

    private Boolean nullable;

    private Boolean primaryKey;

    private Boolean autoIncrement;

    private String javaType;

    private String javaField;

    private Boolean formOperation;

    private Boolean listOperation;

    private Boolean listQueryOperation;

    private Integer formType;

    private Integer queryType;

    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(fill = FieldFill.UPDATE)
    private Date updateTime;

}

package com.perfree.model;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.perfree.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Table("p_codegen_column")
public class CodegenColumn extends BaseModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id(keyType = KeyType.Auto)
    private Integer id;

    private Integer tableId;

    private String columnName;

    private String dataType;

    private String columnComment;

    private Integer nullable;

    private Boolean primaryKey;

    private Boolean autoIncrement;

    private String javaType;

    private String javaField;

    private Boolean insertOperation;

    private Boolean updateOperation;

    private Boolean listOperation;

    private Boolean listQueryOperation;

    private Integer formType;

    private Integer queryType;

    private String dictType;

}

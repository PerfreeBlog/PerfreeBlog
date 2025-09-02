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
@Table("p_extra")
public class Extra extends BaseModel implements Serializable  {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id(keyType = KeyType.Auto)
    private Integer id;

    /**
     * 名称
     */
    private String extraName;

    /**
     * 描述
     */
    private String extraDescription;

    /**
     * key
     */
    private String extraKey;

    /**
     * 附加数据
     */
    private String extraData;
}

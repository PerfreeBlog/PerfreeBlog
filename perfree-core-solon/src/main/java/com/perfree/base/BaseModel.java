package com.perfree.base;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.mybatisflex.annotation.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BaseModel {

    /**
     * 创建人
     */
    @Column(value = "createUserId")
    private Integer createUserId;

    /**
     * 更新人
     */
    @Column(value = "updateUserId")
    private Integer updateUserId;

    /**
     * 创建时间
     */
    @Column(value = "createTime", onInsertValue = "now()")
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @Column(value = "updateTime", onUpdateValue = "now()", onInsertValue = "now()")
    private LocalDateTime updateTime;
}

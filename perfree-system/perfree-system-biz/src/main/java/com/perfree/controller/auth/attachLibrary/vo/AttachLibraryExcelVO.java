package com.perfree.controller.auth.attachLibrary.vo;

import com.alibaba.excel.annotation.*;
import com.alibaba.excel.annotation.format.*;
import com.perfree.commons.excel.*;
import com.perfree.constant.UserConstant;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class AttachLibraryExcelVO {

    @ExcelProperty("附件库名称")
    private String name;

    @ExcelProperty("描述")
    private String description;

    @ExcelProperty("附件库类型: img: 图库, video视频库, audio音乐库,other其他")
    private String type;

    @ExcelProperty("是否可见, 0是, 1否")
    private Integer visibility;

    @ExcelProperty("封面图")
    private String thumbnail;

    @ExcelProperty("创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}

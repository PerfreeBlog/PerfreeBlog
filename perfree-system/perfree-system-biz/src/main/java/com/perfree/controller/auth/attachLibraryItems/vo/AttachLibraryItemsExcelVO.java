package com.perfree.controller.auth.attachLibraryItems.vo;

import com.alibaba.excel.annotation.*;
import com.alibaba.excel.annotation.format.*;
import com.perfree.commons.excel.*;
import com.perfree.constant.UserConstant;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class AttachLibraryItemsExcelVO {

    @ExcelProperty("附件库id")
    private Integer attachLibraryId;

    @ExcelProperty("url")
    private String url;

    @ExcelProperty("创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @ExcelProperty("文件名称")
    private String name;
}

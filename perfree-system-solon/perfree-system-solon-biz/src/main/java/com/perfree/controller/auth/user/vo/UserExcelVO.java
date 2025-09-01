package com.perfree.controller.auth.user.vo;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.format.DateTimeFormat;
import com.perfree.commons.excel.DictExcelConvert;
import com.perfree.commons.excel.DictFormat;
import com.perfree.constant.UserConstant;
import com.perfree.controller.auth.user.excelConvert.UserStatusExcelConvert;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Schema(description = "用户导出RespVO")
@Data
public class UserExcelVO {

    @ExcelProperty("用户名称")
    private String userName;

    @ExcelProperty("账号")
    private String account;

    @ExcelProperty(value = "性别", converter = DictExcelConvert.class)
    @DictFormat(UserConstant.DICT_SEX)
    private Byte sex;

    @ExcelProperty(value = "状态", converter = UserStatusExcelConvert.class)
    private Integer status;

    @ExcelProperty("邮箱")
    private String email;

    @ExcelProperty("网站")
    private String website;

    @ExcelProperty("备注")
    private String remark;

    @ExcelProperty("手机号")
    private String mobile;

    @ExcelProperty("最后登录ip")
    private String loginIp;

    @ExcelProperty("最后登录时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime loginDate;

    @ExcelProperty(value = "创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}

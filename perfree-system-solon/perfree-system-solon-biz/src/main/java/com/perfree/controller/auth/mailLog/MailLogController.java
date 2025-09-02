package com.perfree.controller.auth.mailLog;


import cn.dev33.satoken.annotation.SaCheckPermission;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailLog.vo.*;
import com.perfree.convert.mailLog.MailLogConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.MailLog;
import com.perfree.service.mailLog.MailLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;
import jakarta.servlet.http.HttpServletResponse;
import com.perfree.commons.excel.ExcelUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

/**
* @description 邮件日志 controller
* @author Perfree
**/
@Controller
@Tag(name = "邮件日志相关接口")
@Mapping("api/auth/mailLog")
public class MailLogController extends BaseController {

    @Inject
    private MailLogService mailLogService;

    @Post
    @Mapping("/page")
    @Operation(summary = "邮件日志分页列表")
    @SaCheckPermission("admin:mailLog:query")
    public CommonResult<PageResult<MailLogRespVO>> page(@Body MailLogPageReqVO pageVO) {
        startPage(pageVO);
        List<MailLog> mailLogList = mailLogService.mailLogPage(pageVO);
        return pageSuccess(MailLogConvert.INSTANCE.convertListRespVO(mailLogList));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加邮件日志")
    @DemoMode
    @SaCheckPermission("admin:mailLog:create")
    public CommonResult<MailLogRespVO> add(@Body @Valid MailLogAddReqVO mailLogAddReqVO) {
        return success(MailLogConvert.INSTANCE.convertRespVO(mailLogService.add(mailLogAddReqVO)));
    }

    @Post
    @Mapping("/update")
    @Operation(summary = "更新邮件日志")
    @DemoMode
    @SaCheckPermission("admin:mailLog:update")
    public CommonResult<MailLogRespVO> update(@Body @Valid MailLogUpdateReqVO mailLogUpdateReqVO) {
        return success(MailLogConvert.INSTANCE.convertRespVO(mailLogService.update(mailLogUpdateReqVO)));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取邮件日志")
    public CommonResult<MailLogRespVO> get(@Param(value = "id") Integer id) {
        return success(MailLogConvert.INSTANCE.convertRespVO(mailLogService.get(id)));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除邮件日志")
    @DemoMode
    @SaCheckPermission("admin:mailLog:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(mailLogService.del(id));
    }

    @Get
    @Mapping("/listAll")
    @Operation(summary = "获取所有邮件日志")
    public CommonResult<List<MailLogRespVO>> listAll() {
        return success(MailLogConvert.INSTANCE.convertListRespVO(mailLogService.listAll()));
    }

    @Post
    @Mapping("/export")
    @Operation(summary = "导出邮件日志")
    @SaCheckPermission("admin:mailLog:export")
    public void export(@Body MailLogExportReqVO exportReqVO, HttpServletResponse response) {
        List<MailLog> mailLogList = mailLogService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, MailLogConvert.INSTANCE.convertToExcelVOList(mailLogList), MailLogExcelVO.class, "邮件日志数据","邮件日志数据.xlsx");
    }
}
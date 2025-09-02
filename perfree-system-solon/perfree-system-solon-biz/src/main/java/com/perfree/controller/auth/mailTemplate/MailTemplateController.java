package com.perfree.controller.auth.mailTemplate;


import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.convert.mailTemplate.MailTemplateConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.MailTemplate;
import com.perfree.service.mailTemplate.MailTemplateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;
import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.servlet.http.HttpServletResponse;
import com.perfree.commons.excel.ExcelUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

/**
* @description 邮件模板 controller
* @author Perfree
**/
@Controller
@Tag(name = "邮件模板相关接口")
@Mapping("api/auth/mailTemplate")
public class MailTemplateController extends BaseController {

    @Inject
    private MailTemplateService mailTemplateService;

    @Post
    @Mapping("/page")
    @Operation(summary = "邮件模板分页列表")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:query')")
    public CommonResult<PageResult<MailTemplateRespVO>> page(@Body MailTemplatePageReqVO pageVO) {
        startPage(pageVO);
        List<MailTemplate> mailTemplateList = mailTemplateService.mailTemplatePage(pageVO);
        return pageSuccess(MailTemplateConvert.INSTANCE.convertListRespVO(mailTemplateList));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加邮件模板")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:create')")
    public CommonResult<MailTemplateRespVO> add(@Body @Valid MailTemplateAddReqVO mailTemplateAddReqVO) {
        return success(MailTemplateConvert.INSTANCE.convertRespVO(mailTemplateService.add(mailTemplateAddReqVO)));
    }

    @Post
    @Mapping("/update")
    @Operation(summary = "更新邮件模板")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:update')")
    public CommonResult<MailTemplateRespVO> update(@Body @Valid MailTemplateUpdateReqVO mailTemplateUpdateReqVO) {
        return success(MailTemplateConvert.INSTANCE.convertRespVO(mailTemplateService.update(mailTemplateUpdateReqVO)));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取邮件模板")
    public CommonResult<MailTemplateRespVO> get(@Param(value = "id") Integer id) {
        return success(MailTemplateConvert.INSTANCE.convertRespVO(mailTemplateService.get(id)));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除邮件模板")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:delete')")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(mailTemplateService.del(id));
    }

    @Get
    @Mapping("/listAll")
    @Operation(summary = "获取所有邮件模板")
    public CommonResult<List<MailTemplateRespVO>> listAll() {
        return success(MailTemplateConvert.INSTANCE.convertListRespVO(mailTemplateService.listAll()));
    }

    @Post
    @Mapping("/export")
    @Operation(summary = "导出邮件模板")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:export')")
    public void export(@Body MailTemplateExportReqVO exportReqVO, HttpServletResponse response) {
        List<MailTemplate> mailTemplateList = mailTemplateService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, MailTemplateConvert.INSTANCE.convertToExcelVOList(mailTemplateList), MailTemplateExcelVO.class, "邮件模板数据","邮件模板数据.xlsx");
    }

    @Post
    @Mapping("/testMail")
    @Operation(summary = "发送测试邮件")
    @PreAuthorize("@ss.hasPermission('admin:mailTemplate:testMail')")
    public CommonResult<Boolean> testMail(@Body @Valid MailTemplateTestReqVO mailTemplateTestReqVO) {
        return success(mailTemplateService.testMail(mailTemplateTestReqVO));
    }
}
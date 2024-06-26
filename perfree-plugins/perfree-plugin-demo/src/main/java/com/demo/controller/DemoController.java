package com.demo.controller;

import cn.hutool.core.io.IoUtil;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.util.ListUtils;
import com.demo.controller.vo.ExcelDataVO;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "系统配置相关接口")
@RequestMapping("api/demo")
public class DemoController {

    @GetMapping("/test")
    @Operation(summary = "测试接口")
    public CommonResult<String> page() {
        return success("演示插件-测试接口返回文字");
    }

    @GetMapping("/dependencyTest")
    @Operation(summary = "新增依赖示例(EasyExcel)")
    public void dependencyTest(HttpServletResponse response) {
        try{
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setHeader("Content-Disposition", "attachment; filename=\"example.xlsx\"");
            EasyExcel.write(response.getOutputStream(), ExcelDataVO.class).sheet().doWrite(genData());
        }catch (Exception ignored) {}
    }

    private List<ExcelDataVO> genData() {
        List<ExcelDataVO> list = ListUtils.newArrayList();
        for (int i = 0; i < 10; i++) {
            ExcelDataVO data = new ExcelDataVO();
            data.setString("字符串" + i);
            data.setDate(new Date());
            data.setDoubleData(0.56);
            list.add(data);
        }
        return list;
    }


}

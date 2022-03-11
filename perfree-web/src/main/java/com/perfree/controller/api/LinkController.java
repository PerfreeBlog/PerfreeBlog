package com.perfree.controller.api;

import com.perfree.commons.Pager;
import com.perfree.base.BaseApiController;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Category;
import com.perfree.model.Link;
import com.perfree.service.LinkService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin
@Api(value = "友链相关",tags = "友链相关")
@RequestMapping("/api/link")
public class LinkController extends BaseApiController {
    @Autowired
    private LinkService linkService;

    @GetMapping("/getList")
    @ApiOperation(value = "友链分页数据", notes = "友链分页数据,可根据友链名称模糊查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "name", value = "友链名", dataTypeClass = String.class, paramType = "query"),
    })
    public Pager<Link> getList(@ApiIgnore Pager<Link> pager, @ApiIgnore @RequestParam(required = false) String name) {
        pager.setForm(new Link());
        pager.getForm().setName(name);
        return linkService.list(pager);
    }

    @GetMapping("/getById")
    @ApiOperation(value = "根据友链ID获取友链信息", notes = "根据友链ID获取友链信息")
    public ResponseBean getById(@ApiParam(name="linkId",value="友链ID",required=true) @RequestParam("linkId") String linkId) {
        Link link = linkService.getById(linkId);
        return ResponseBean.success("success", link);
    }
}

package com.perfree.controller.api;

import com.perfree.commons.Pager;
import com.perfree.controller.BaseApiController;
import com.perfree.model.Link;
import com.perfree.service.LinkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Api(value = "友链相关",tags = "友链模块")
@RequestMapping("/api/link")
public class LinkController extends BaseApiController {
    @Autowired
    private LinkService linkService;

    @PostMapping("/getList")
    @ApiOperation(value = "获取友链数据", notes = "获取友链数据")
    public Pager<Link> getList(@RequestBody Pager<Link> pager) {
        return linkService.list(pager);
    }
}

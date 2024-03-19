package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.model.Link;
import com.perfree.service.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Tag(name = "友链相关")
@RequestMapping("/api/link")
public class LinkController extends BaseApiController {
    @Autowired
    private LinkService linkService;

    @GetMapping("/getList")
    @Operation(summary = "友链分页数据")
    public Pager<Link> getList(Pager<Link> pager, @RequestParam(required = false) String name) {
        pager.setForm(new Link());
        pager.getForm().setName(name);
        return linkService.list(pager);
    }

    @GetMapping("/getById")
    @Operation(summary = "根据友链ID获取友链信息")
    public ResponseBean getById(@RequestParam("linkId") String linkId) {
        Link link = linkService.getById(linkId);
        return ResponseBean.success("success", link);
    }
}

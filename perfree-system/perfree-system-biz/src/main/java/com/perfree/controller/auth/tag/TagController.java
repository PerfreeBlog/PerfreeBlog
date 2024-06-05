package com.perfree.controller.auth.tag;

import com.perfree.service.tag.TagService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "标签相关接口")
@RequestMapping("api/auth/tag")
public class TagController {

    private final static Logger LOGGER = LoggerFactory.getLogger(TagController.class);

    @Resource
    private TagService tagService;


}

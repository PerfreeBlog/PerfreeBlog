package com.perfree.controller.admin;


import com.perfree.base.BaseController;
import com.perfree.service.OptionService;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * option controlle
 */
@Controller
@RequestMapping("/admin")
@RequiresRoles(value={"admin"}, logical= Logical.OR)
public class OptionController extends BaseController {
    @Autowired
    private OptionService optionService;
}

package com.perfree.controller.admin;


import com.perfree.base.BaseController;
import com.perfree.commons.Constants;
import com.perfree.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * option controlle
 */
@Controller
@RequestMapping("/admin")
// @RequiresRoles(value={Constants.ROLE_ADMIN}, logical= Logical.OR)
public class OptionController extends BaseController {
    @Autowired
    private OptionService optionService;
}

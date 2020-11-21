package com.perfree.controller.admin;


import com.perfree.controller.BaseController;
import com.perfree.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * option controlle
 */
@Controller
@RequestMapping("/admin")
public class OptionController extends BaseController {
    @Autowired
    private OptionService optionService;
}

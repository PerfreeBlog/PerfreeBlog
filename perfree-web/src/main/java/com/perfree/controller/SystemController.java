package com.perfree.controller;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.captcha.generator.RandomGenerator;
import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.IdUtil;
import com.perfree.base.BaseApiController;
import com.perfree.cache.CaptchaCacheService;
import com.perfree.commons.CommonResult;
import com.perfree.enums.ErrorCode;
import com.perfree.constants.SystemConstants;
import com.perfree.service.menu.MenuService;
import com.perfree.service.user.UserService;
import com.perfree.vo.menu.MenuTreeRespVO;
import com.perfree.vo.system.CaptchaImageRespVO;
import com.perfree.vo.system.UserLoginReqVO;
import com.perfree.vo.system.UserLoginRespVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@Tag(name = "系统相关")
@RequestMapping("/api")
public class SystemController extends BaseApiController {

    @Resource
    private UserService userService;

    @Resource
    private MenuService menuService;

    @Resource
    private CaptchaCacheService captchaCacheService;

    @PostMapping("/login")
    @Operation(summary = "登录")
    public CommonResult<UserLoginRespVO> login(@Valid @RequestBody UserLoginReqVO userLoginReqVO, HttpSession session) {
        return CommonResult.success(userService.login(userLoginReqVO, session));
    }

    @GetMapping("/captchaImage")
    @Operation(summary = "获取验证码")
    public CommonResult<CaptchaImageRespVO> captchaImage(){
        LineCaptcha lineCaptcha = CaptchaUtil.createLineCaptcha(SystemConstants.CAPTCHA_IMAGE_WIDTH, SystemConstants.CAPTCHA_IMAGE_HEIGHT);
        lineCaptcha.setGenerator(new RandomGenerator(SystemConstants.CAPTCHA_RANDOM, SystemConstants.CAPTCHA_LENGTH));
        String code = lineCaptcha.getCode();
        String uuid = IdUtil.simpleUUID();
        captchaCacheService.putCaptcha(uuid, code);
        BufferedImage image = lineCaptcha.getImage();
        CaptchaImageRespVO captchaImageResp = new CaptchaImageRespVO();
        captchaImageResp.setUuid(uuid);
        // 转换流信息写出
        FastByteArrayOutputStream os = new FastByteArrayOutputStream();
        try {
            ImageIO.write(image, SystemConstants.CAPTCHA_IMAGE, os);
        } catch (IOException e) {
            return CommonResult.error(ErrorCode.CAPTCHA_IMAGE_ERROR);
        }
        captchaImageResp.setImg(Base64.encode(os.toByteArray()));
        return CommonResult.success(captchaImageResp);
    }

    @GetMapping("/getAdminMenu")
    @Operation(summary = "获取管理后台菜单")
    public CommonResult<List<MenuTreeRespVO>> getAdminMenu() {
        return CommonResult.success(menuService.getMenuByUserIdAndType(getUser().getId(), SystemConstants.MENU_TYPE_ADMIN));
    }
}

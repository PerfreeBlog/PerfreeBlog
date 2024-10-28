package com.perfree.controller.common.system;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.captcha.generator.RandomGenerator;
import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.IdUtil;
import com.perfree.cache.CaptchaCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.controller.auth.system.vo.CaptchaImageRespVO;
import com.perfree.controller.auth.system.vo.MenuTreeListRespVO;
import com.perfree.controller.auth.user.vo.UserRespVO;
import com.perfree.controller.common.system.vo.*;
import com.perfree.convert.user.UserConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.model.User;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.common.CommonService;
import com.perfree.service.menu.MenuService;
import com.perfree.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

/**
 * @description 系统基础接口
 * @author Perfree
 * @version 1.0.0
 * @create 2023/9/28 10:16
 **/
@RestController
@Tag(name = "系统基础接口")
@RequestMapping("api")
public class SystemController {
    @Resource
    private UserService userService;

    @Resource
    private CaptchaCacheService captchaCacheService;

    @Resource
    private MenuService menuService;

    @Resource
    private CommonService commonService;

    @Value("${perfree.demoModel}")
    private Boolean demoModel;

    @GetMapping("isDemoModel")
    @Operation(summary = "获取是否为演示环境")
    public CommonResult<Boolean> isDemoModel(){
        return CommonResult.success(demoModel);
    }


    @PostMapping("login")
    @Operation(summary = "使用账号密码登录")
    public CommonResult<LoginUserRespVO> login(@RequestBody @Valid LoginUserReqVO loginUserVO){
        return CommonResult.success(userService.login(loginUserVO));
    }

    @PostMapping("register")
    @Operation(summary = "注册账号")
    public CommonResult<UserRespVO> register(@RequestBody @Valid RegisterUserReqVO reqVO){
        return CommonResult.success(UserConvert.INSTANCE.convertRespVO(userService.register(reqVO)));
    }

    @PostMapping("findPasswordStep1")
    @Operation(summary = "找回密码步骤1")
    public CommonResult<Boolean> findPasswordStep1(@RequestBody @Valid FindPasswordStep1ReqVO reqVO){
        return CommonResult.success(userService.findPasswordStep1(reqVO));
    }

    @PostMapping("findPasswordStep2")
    @Operation(summary = "找回密码步骤2")
    public CommonResult<Boolean> findPasswordStep2(@RequestBody @Valid FindPasswordStep2ReqVO reqVO){
        return CommonResult.success(userService.findPasswordStep2(reqVO));
    }

    @PostMapping("captchaImage")
    @Operation(summary = "获取验证码")
    public CommonResult<CaptchaImageRespVO> captchaImage(){
        LineCaptcha lineCaptcha =  CaptchaUtil.createLineCaptcha(SystemConstants.CAPTCHA_IMAGE_WIDTH, SystemConstants.CAPTCHA_IMAGE_HEIGHT);
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
            ImageIO.write(image, "png", os);
        } catch (IOException e) {
            return CommonResult.error(ErrorCode.CAPTCHA_IMAGE_ERROR);
        }
        captchaImageResp.setImg(Base64.encode(os.toByteArray()));
        return CommonResult.success(captchaImageResp);
    }

    @GetMapping("/getLoginUser")
    @Operation(summary = "获取当前登录用户")
    public CommonResult<UserRespVO> getApiLoginUser() {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser) {
            return CommonResult.success(null);
        }
        User byId = userService.getById(loginUser.getId());
        return CommonResult.success(UserConvert.INSTANCE.convertRespVO(byId));
    }

    @PostMapping("refreshToken")
    @Operation(summary = "刷新token")
    public CommonResult<LoginUserRespVO> refreshToken(@Valid @RequestBody RefreshTokenReqVO reqVO){
        return CommonResult.success(userService.refreshToken(reqVO.getRefreshToken()));
    }

    @GetMapping("menuList")
    @Operation(summary = "获取所有菜单")
    public CommonResult<List<MenuTreeListRespVO>> menuList(){
        List<MenuTreeListRespVO> menuTreeListRespVOS = menuService.menuFrontList();
        return CommonResult.success(menuTreeListRespVOS);
    }

    @PostMapping("initWeb")
    @Operation(summary = "初始化站点", hidden = true)
    public CommonResult<Boolean> initWeb(@Valid @RequestBody InitWebReqVO reqVO){
        return CommonResult.success(commonService.initWeb(reqVO));
    }
}

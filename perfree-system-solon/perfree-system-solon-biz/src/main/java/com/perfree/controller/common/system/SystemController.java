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
import org.noear.solon.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
@Controller
@Tag(name = "系统基础接口")
@Mapping("api")
public class SystemController {
    @Inject
    private UserService userService;

    @Inject
    private CaptchaCacheService captchaCacheService;

    @Inject
    private MenuService menuService;

    @Inject
    private CommonService commonService;

    @Inject("${perfree.demoModel}")
    private Boolean demoModel;

    @Get
    @Mapping("isDemoModel")
    @Operation(summary = "获取是否为演示环境")
    public CommonResult<Boolean> isDemoModel(){
        return CommonResult.success(demoModel);
    }


    @Post
    @Mapping("login")
    @Operation(summary = "使用账号密码登录")
    public CommonResult<LoginUserRespVO> login(@Body @Valid LoginUserReqVO loginUserVO){
        return CommonResult.success(userService.login(loginUserVO));
    }

    @Post
    @Mapping("register")
    @Operation(summary = "注册账号")
    public CommonResult<UserRespVO> register(@Body @Valid RegisterUserReqVO reqVO){
        return CommonResult.success(UserConvert.INSTANCE.convertRespVO(userService.register(reqVO)));
    }

    @Post
    @Mapping("findPasswordStep1")
    @Operation(summary = "找回密码步骤1")
    public CommonResult<Boolean> findPasswordStep1(@Body @Valid FindPasswordStep1ReqVO reqVO){
        return CommonResult.success(userService.findPasswordStep1(reqVO));
    }

    @Post
    @Mapping("findPasswordStep2")
    @Operation(summary = "找回密码步骤2")
    public CommonResult<Boolean> findPasswordStep2(@Body @Valid FindPasswordStep2ReqVO reqVO){
        return CommonResult.success(userService.findPasswordStep2(reqVO));
    }

    @Post
    @Mapping("captchaImage")
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

    @Get
    @Mapping("/getLoginUser")
    @Operation(summary = "获取当前登录用户")
    public CommonResult<UserRespVO> getApiLoginUser() {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser) {
            return CommonResult.success(null);
        }
        User byId = userService.getById(loginUser.getId());
        return CommonResult.success(UserConvert.INSTANCE.convertRespVO(byId));
    }

    @Post
    @Mapping("refreshToken")
    @Operation(summary = "刷新token")
    public CommonResult<LoginUserRespVO> refreshToken(@Valid @Body RefreshTokenReqVO reqVO){
        return CommonResult.success(userService.refreshToken(reqVO.getRefreshToken()));
    }

    @Get
    @Mapping("menuList")
    @Operation(summary = "获取所有菜单")
    public CommonResult<List<MenuTreeListRespVO>> menuList(){
        List<MenuTreeListRespVO> menuTreeListRespVOS = menuService.menuFrontList();
        return CommonResult.success(menuTreeListRespVOS);
    }

    @Post
    @Mapping("initWeb")
    @Operation(summary = "初始化站点", hidden = true)
    public CommonResult<Boolean> initWeb(@Valid @Body InitWebReqVO reqVO){
        return CommonResult.success(commonService.initWeb(reqVO));
    }
}

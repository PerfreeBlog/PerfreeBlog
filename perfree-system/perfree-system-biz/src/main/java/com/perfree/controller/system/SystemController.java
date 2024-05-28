package com.perfree.controller.system;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import cn.hutool.captcha.generator.RandomGenerator;
import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.IdUtil;
import com.perfree.cache.CaptchaCacheService;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.controller.system.vo.*;
import com.perfree.convert.option.OptionConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.service.menu.MenuService;
import com.perfree.service.user.UserService;
import com.perfree.system.api.option.dto.OptionCacheDTO;
import com.perfree.controller.option.vo.OptionRespVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
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
    private MenuService menuService;

    @Resource
    private CaptchaCacheService captchaCacheService;

    @Resource
    private OptionCacheService optionCacheService;


    @PostMapping("login")
    @Operation(summary = "使用账号密码登录")
    public CommonResult<LoginUserRespVO> login(@RequestBody LoginUserReqVO loginUserVO){
        return CommonResult.success(userService.login(loginUserVO));
    }


    @GetMapping("menuAdminList")
    @Operation(summary = "获取当前账号拥有的菜单")
    public CommonResult<List<MenuTreeListRespVO>> menuList(){
        return CommonResult.success(menuService.menuAdminListByLoginUser());
    }

    @GetMapping("getOptionByNoAuth")
    @Operation(summary = "获取未登录时可拥有的配置信息")
    public CommonResult<List<OptionRespVO>> getOptionByNoAuth(){
        List<OptionCacheDTO> optionCacheDTOList = new ArrayList<>();
        optionCacheDTOList.add(optionCacheService.getOption(OptionEnum.LOGIN_CAPTCHA_ENABLE.getKey()));
        return CommonResult.success(OptionConvert.INSTANCE.convertCacheDTO2RespListVO(optionCacheDTOList));
    }

    @GetMapping("getAllOption")
    @Operation(summary = "获取所有配置信息")
    public CommonResult<List<OptionRespVO>> getAllOption(){
        return CommonResult.success(OptionConvert.INSTANCE.convertCacheDTO2RespListVO(optionCacheService.getAllOption()));
    }

    @GetMapping("userInfo")
    @Operation(summary = "获取当前登录账号的信息")
    public CommonResult<LoginUserInfoRespVO> userInfo(){
        return CommonResult.success(userService.userInfo());
    }

    @PostMapping("logout")
    @Operation(summary = "退出登录")
    public CommonResult<String> logout(){
        return CommonResult.success("退出成功");
    }

    @PostMapping("captchaImage")
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
            ImageIO.write(image, "png", os);
        } catch (IOException e) {
            return CommonResult.error(ErrorCode.CAPTCHA_IMAGE_ERROR);
        }
        captchaImageResp.setImg(Base64.encode(os.toByteArray()));
        return CommonResult.success(captchaImageResp);
    }
}

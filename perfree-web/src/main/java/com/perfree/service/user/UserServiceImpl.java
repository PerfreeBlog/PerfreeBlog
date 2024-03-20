package com.perfree.service.user;

import cn.hutool.crypto.digest.DigestUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.CaptchaCacheService;
import com.perfree.cache.OptionCacheService;
import com.perfree.constants.OptionConstant;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.exception.ServiceException;
import com.perfree.mapper.UserMapper;
import com.perfree.model.User;
import com.perfree.security.SecurityConstants;
import com.perfree.security.util.JwtUtil;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.vo.system.UserLoginReqVO;
import com.perfree.vo.system.UserLoginRespVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.Date;

@Service
@Transactional
public class UserServiceImpl extends ServiceImpl<UserMapper, User>  implements UserService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private CaptchaCacheService captchaCacheService;



    public User getUserByAccount(String account) {
        return userMapper.getUserByAccount(account);
    }

    @Override
    public UserLoginRespVO login(UserLoginReqVO userLoginReqVO, HttpSession session) {
        String optionValue = optionCacheService.getOptionValue(OptionEnum.LOGIN_CAPTCHA_ENABLE.getKey());
        if (StringUtils.isBlank(optionValue) || optionValue.equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            if (StringUtils.isBlank(userLoginReqVO.getUuid()) || StringUtils.isBlank(userLoginReqVO.getCode())) {
                throw new ServiceException(ErrorCode.CAPTCHA_IS_NOT_EMPTY);
            }
            String captcha = captchaCacheService.getCaptcha(userLoginReqVO.getUuid());
            if (StringUtils.isBlank(captcha)){
                throw new ServiceException(ErrorCode.CAPTCHA_EXPIRE);
            }
            captchaCacheService.removeCaptcha(userLoginReqVO.getUuid());
            if (!captcha.equals(userLoginReqVO.getCode())) {
                throw new ServiceException(ErrorCode.CAPTCHA_VALID_ERROR);
            }
        }
        User user = userMapper.getUserByAccount(userLoginReqVO.getAccount());
        if (null == user) {
            throw new ServiceException(ErrorCode.ACCOUNT_NOT_FOUNT);
        }

        // 校验密码
        String hexPassword = DigestUtil.md5Hex(user.getSalt() + userLoginReqVO.getPassword());
        if (!hexPassword.equals(user.getPassword())) {
            throw new ServiceException(ErrorCode.ACCOUNT_PASSWORD_ERROR);
        }

        // 生成Token
        String token = JwtUtil.generateToken(user.getAccount(), false);
        Date expirationDate = new Date(System.currentTimeMillis() + SecurityConstants.TOKEN_EXPIRATION_REMEMBER_TIME * 1000);

        // 生成refreshToken
        String refreshToken = JwtUtil.getRefreshToken(user.getAccount(), expirationDate);

        LoginUserVO loginUser = new LoginUserVO();
        loginUser.setId(user.getId());
        loginUser.setAccount(user.getAccount());
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =  new UsernamePasswordAuthenticationToken(loginUser, token, null);
        session.setAttribute("loginUser", usernamePasswordAuthenticationToken);
        // 组装返回信息
        UserLoginRespVO loginUserRespVO = new UserLoginRespVO();
        loginUserRespVO.setUserId(user.getId());
        loginUserRespVO.setAccessToken(token);
        loginUserRespVO.setRefreshToken(refreshToken);
        loginUserRespVO.setExpiresTime(expirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
        return loginUserRespVO;
    }
}

package com.perfree.convert.user;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.system.vo.LoginUserInfoRespVO;
import com.perfree.controller.auth.user.vo.UserAddReqVO;
import com.perfree.controller.auth.user.vo.UserExcelVO;
import com.perfree.controller.auth.user.vo.UserProfileUpdateReqVO;
import com.perfree.controller.auth.user.vo.UserRespVO;
import com.perfree.controller.auth.user.vo.UserStatusReqVO;
import com.perfree.controller.auth.user.vo.UserUpdateReqVO;
import com.perfree.controller.common.system.vo.LoginUserReqVO;
import com.perfree.controller.common.system.vo.LoginUserRespVO;
import com.perfree.controller.common.system.vo.RegisterUserReqVO;
import com.perfree.model.User;
import com.perfree.system.api.user.dto.UserRespDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-10-15T15:50:59+0800",
    comments = "version: 1.6.0.Beta1, compiler: javac, environment: Java 17.0.8 (Oracle Corporation)"
)
@Component
public class UserConvertImpl implements UserConvert {

    @Override
    public User convert(LoginUserReqVO bean) {
        if ( bean == null ) {
            return null;
        }

        User user = new User();

        user.setPassword( bean.getPassword() );

        return user;
    }

    @Override
    public LoginUserRespVO convert(User bean) {
        if ( bean == null ) {
            return null;
        }

        LoginUserRespVO.LoginUserRespVOBuilder loginUserRespVO = LoginUserRespVO.builder();

        return loginUserRespVO.build();
    }

    @Override
    public List<LoginUserRespVO> convertList(List<User> list) {
        if ( list == null ) {
            return null;
        }

        List<LoginUserRespVO> list1 = new ArrayList<LoginUserRespVO>( list.size() );
        for ( User user : list ) {
            list1.add( convert( user ) );
        }

        return list1;
    }

    @Override
    public LoginUserInfoRespVO convertLoginInfo(User loginUser) {
        if ( loginUser == null ) {
            return null;
        }

        LoginUserInfoRespVO loginUserInfoRespVO = new LoginUserInfoRespVO();

        loginUserInfoRespVO.setAccount( loginUser.getAccount() );
        loginUserInfoRespVO.setUserName( loginUser.getUserName() );
        loginUserInfoRespVO.setStatus( loginUser.getStatus() );
        loginUserInfoRespVO.setAvatar( loginUser.getAvatar() );
        loginUserInfoRespVO.setEmail( loginUser.getEmail() );
        loginUserInfoRespVO.setWebsite( loginUser.getWebsite() );
        loginUserInfoRespVO.setRemark( loginUser.getRemark() );
        loginUserInfoRespVO.setMobile( loginUser.getMobile() );
        loginUserInfoRespVO.setSex( loginUser.getSex() );
        loginUserInfoRespVO.setId( loginUser.getId() );
        loginUserInfoRespVO.setLoginDate( loginUser.getLoginDate() );

        return loginUserInfoRespVO;
    }

    @Override
    public UserRespDTO convertDto(User byAccount) {
        if ( byAccount == null ) {
            return null;
        }

        UserRespDTO userRespDTO = new UserRespDTO();

        userRespDTO.setId( byAccount.getId() );
        userRespDTO.setAccount( byAccount.getAccount() );
        userRespDTO.setUserName( byAccount.getUserName() );
        userRespDTO.setPassword( byAccount.getPassword() );
        userRespDTO.setSalt( byAccount.getSalt() );
        userRespDTO.setStatus( byAccount.getStatus() );
        userRespDTO.setAvatar( byAccount.getAvatar() );
        userRespDTO.setEmail( byAccount.getEmail() );
        userRespDTO.setWebsite( byAccount.getWebsite() );
        userRespDTO.setCreateTime( byAccount.getCreateTime() );
        userRespDTO.setUpdateTime( byAccount.getUpdateTime() );

        return userRespDTO;
    }

    @Override
    public PageResult<UserRespVO> convertPageResultVO(PageResult<User> userPageResult) {
        if ( userPageResult == null ) {
            return null;
        }

        PageResult<UserRespVO> pageResult = new PageResult<UserRespVO>();

        pageResult.setList( userListToUserRespVOList( userPageResult.getList() ) );
        pageResult.setTotal( userPageResult.getTotal() );

        return pageResult;
    }

    @Override
    public UserRespVO convertRespVO(User user) {
        if ( user == null ) {
            return null;
        }

        UserRespVO userRespVO = new UserRespVO();

        userRespVO.setAccount( user.getAccount() );
        userRespVO.setUserName( user.getUserName() );
        userRespVO.setStatus( user.getStatus() );
        userRespVO.setAvatar( user.getAvatar() );
        userRespVO.setEmail( user.getEmail() );
        userRespVO.setWebsite( user.getWebsite() );
        userRespVO.setRemark( user.getRemark() );
        userRespVO.setMobile( user.getMobile() );
        userRespVO.setSex( user.getSex() );
        userRespVO.setId( user.getId() );
        userRespVO.setCreateTime( user.getCreateTime() );
        userRespVO.setUpdateTime( user.getUpdateTime() );
        userRespVO.setLoginIp( user.getLoginIp() );
        userRespVO.setLoginDate( user.getLoginDate() );

        return userRespVO;
    }

    @Override
    public User convertAddVO(UserAddReqVO userAddReqVO) {
        if ( userAddReqVO == null ) {
            return null;
        }

        User user = new User();

        user.setAccount( userAddReqVO.getAccount() );
        user.setUserName( userAddReqVO.getUserName() );
        user.setPassword( userAddReqVO.getPassword() );
        user.setStatus( userAddReqVO.getStatus() );
        user.setAvatar( userAddReqVO.getAvatar() );
        user.setEmail( userAddReqVO.getEmail() );
        user.setWebsite( userAddReqVO.getWebsite() );
        user.setRemark( userAddReqVO.getRemark() );
        user.setMobile( userAddReqVO.getMobile() );
        user.setSex( userAddReqVO.getSex() );

        return user;
    }

    @Override
    public User convertUpdateVO(UserUpdateReqVO userUpdateReqVO) {
        if ( userUpdateReqVO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userUpdateReqVO.getId() );
        user.setAccount( userUpdateReqVO.getAccount() );
        user.setUserName( userUpdateReqVO.getUserName() );
        user.setStatus( userUpdateReqVO.getStatus() );
        user.setAvatar( userUpdateReqVO.getAvatar() );
        user.setEmail( userUpdateReqVO.getEmail() );
        user.setWebsite( userUpdateReqVO.getWebsite() );
        user.setRemark( userUpdateReqVO.getRemark() );
        user.setMobile( userUpdateReqVO.getMobile() );
        user.setSex( userUpdateReqVO.getSex() );

        return user;
    }

    @Override
    public List<UserExcelVO> convertToExcelVOList(List<User> userList) {
        if ( userList == null ) {
            return null;
        }

        List<UserExcelVO> list = new ArrayList<UserExcelVO>( userList.size() );
        for ( User user : userList ) {
            list.add( userToUserExcelVO( user ) );
        }

        return list;
    }

    @Override
    public User convertByStatusReqVO(UserStatusReqVO userStatusReqVO) {
        if ( userStatusReqVO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userStatusReqVO.getId() );
        user.setStatus( userStatusReqVO.getStatus() );

        return user;
    }

    @Override
    public User convertByProfileReqVO(UserProfileUpdateReqVO userProfileUpdateReqVO) {
        if ( userProfileUpdateReqVO == null ) {
            return null;
        }

        User user = new User();

        user.setAccount( userProfileUpdateReqVO.getAccount() );
        user.setUserName( userProfileUpdateReqVO.getUserName() );
        user.setStatus( userProfileUpdateReqVO.getStatus() );
        user.setAvatar( userProfileUpdateReqVO.getAvatar() );
        user.setEmail( userProfileUpdateReqVO.getEmail() );
        user.setWebsite( userProfileUpdateReqVO.getWebsite() );
        user.setRemark( userProfileUpdateReqVO.getRemark() );
        user.setMobile( userProfileUpdateReqVO.getMobile() );
        user.setSex( userProfileUpdateReqVO.getSex() );

        return user;
    }

    @Override
    public User convertByRegisterVO(RegisterUserReqVO reqVO) {
        if ( reqVO == null ) {
            return null;
        }

        User user = new User();

        user.setAccount( reqVO.getAccount() );
        user.setUserName( reqVO.getUserName() );
        user.setPassword( reqVO.getPassword() );
        user.setEmail( reqVO.getEmail() );

        return user;
    }

    protected List<UserRespVO> userListToUserRespVOList(List<User> list) {
        if ( list == null ) {
            return null;
        }

        List<UserRespVO> list1 = new ArrayList<UserRespVO>( list.size() );
        for ( User user : list ) {
            list1.add( convertRespVO( user ) );
        }

        return list1;
    }

    protected UserExcelVO userToUserExcelVO(User user) {
        if ( user == null ) {
            return null;
        }

        UserExcelVO userExcelVO = new UserExcelVO();

        userExcelVO.setUserName( user.getUserName() );
        userExcelVO.setAccount( user.getAccount() );
        userExcelVO.setSex( user.getSex() );
        userExcelVO.setStatus( user.getStatus() );
        userExcelVO.setEmail( user.getEmail() );
        userExcelVO.setWebsite( user.getWebsite() );
        userExcelVO.setRemark( user.getRemark() );
        userExcelVO.setMobile( user.getMobile() );
        userExcelVO.setLoginIp( user.getLoginIp() );
        userExcelVO.setLoginDate( user.getLoginDate() );
        userExcelVO.setCreateTime( user.getCreateTime() );

        return userExcelVO;
    }
}

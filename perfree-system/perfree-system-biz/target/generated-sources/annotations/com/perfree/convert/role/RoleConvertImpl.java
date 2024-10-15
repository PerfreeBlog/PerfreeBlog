package com.perfree.convert.role;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.role.vo.RoleAddReqVO;
import com.perfree.controller.auth.role.vo.RoleRespVO;
import com.perfree.controller.auth.role.vo.RoleUpdateReqVO;
import com.perfree.model.Role;
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
public class RoleConvertImpl implements RoleConvert {

    @Override
    public RoleRespVO convertRespVO(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleRespVO roleRespVO = new RoleRespVO();

        roleRespVO.setName( role.getName() );
        roleRespVO.setDescription( role.getDescription() );
        roleRespVO.setCode( role.getCode() );
        roleRespVO.setId( role.getId() );
        roleRespVO.setCreateTime( role.getCreateTime() );
        roleRespVO.setUpdateTime( role.getUpdateTime() );

        return roleRespVO;
    }

    @Override
    public PageResult<RoleRespVO> convertPageResultVO(PageResult<Role> rolePageResult) {
        if ( rolePageResult == null ) {
            return null;
        }

        PageResult<RoleRespVO> pageResult = new PageResult<RoleRespVO>();

        pageResult.setList( convertRespListVO( rolePageResult.getList() ) );
        pageResult.setTotal( rolePageResult.getTotal() );

        return pageResult;
    }

    @Override
    public List<RoleRespVO> convertRespListVO(List<Role> list) {
        if ( list == null ) {
            return null;
        }

        List<RoleRespVO> list1 = new ArrayList<RoleRespVO>( list.size() );
        for ( Role role : list ) {
            list1.add( convertRespVO( role ) );
        }

        return list1;
    }

    @Override
    public Role convertAddReqVO(RoleAddReqVO roleAddReqVO) {
        if ( roleAddReqVO == null ) {
            return null;
        }

        Role role = new Role();

        role.setName( roleAddReqVO.getName() );
        role.setDescription( roleAddReqVO.getDescription() );
        role.setCode( roleAddReqVO.getCode() );

        return role;
    }

    @Override
    public Role convertUpdateReqVO(RoleUpdateReqVO roleUpdateReqVO) {
        if ( roleUpdateReqVO == null ) {
            return null;
        }

        Role role = new Role();

        role.setId( roleUpdateReqVO.getId() );
        role.setName( roleUpdateReqVO.getName() );
        role.setDescription( roleUpdateReqVO.getDescription() );
        role.setCode( roleUpdateReqVO.getCode() );

        return role;
    }
}

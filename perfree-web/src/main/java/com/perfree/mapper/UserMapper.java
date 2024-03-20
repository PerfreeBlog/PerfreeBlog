package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.model.Option;
import com.perfree.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
public interface UserMapper extends BaseMapperX<User>{

    default User getUserByAccount(String account){
        return selectOne(new LambdaQueryWrapper<User>().eq(User::getAccount, account));
    }
}

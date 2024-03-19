package com.perfree.convert;


import com.perfree.model.User;
import com.perfree.shared.api.user.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserConvert {
    UserConvert INSTANCE = Mappers.getMapper(UserConvert.class);

    UserDTO convertUserDTO(User userByAccount);
}

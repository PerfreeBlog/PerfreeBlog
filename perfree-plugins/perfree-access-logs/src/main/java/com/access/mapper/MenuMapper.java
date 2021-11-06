package com.access.mapper;

import com.access.model.RoleMenu;
import com.perfree.model.Menu;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuMapper {
    void addAdminMenu(Menu menu);

    void removeAdminMenu(Menu menu);

    void addRoleMenu(RoleMenu roleMenu);

    Menu queryByUrl(Menu menu);


    void removeRoleMenu(Menu menu);
}


package com.perfree.mapper;

import com.perfree.model.Plugin;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface PluginsMapper {
    void save(Plugin plugin);

    Plugin getByPath(String path);

    List<Plugin> getList(Plugin form);

    Plugin getById(String id);

    void delById(Long id);

    void update(Plugin plugin);

    List<Plugin> getAll();
}

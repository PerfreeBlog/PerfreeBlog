package com.perfree.mapper;

import com.perfree.model.Article;
import com.perfree.model.Link;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface LinkMapper {

    List<Link> getList(Link form);

    int add(Link link);

    Link getById(String id);

    int update(Link link);

    int del(String[] idArr);

    List<Link> frontList(HashMap<String, String> form);

}

package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.model.Link;

import java.util.HashMap;

/**
 * @description LinkService
 * @author Perfree
 * @date 2021/11/15 10:18
 */
public interface LinkService {
    Pager<Link> list(Pager<Link> pager);

    int add(Link link);

    Link getById(String id);

    int update(Link link);

    int del(String[] idArr);

    DirectivePage<HashMap<String, String>> frontList(DirectivePage<HashMap<String, String>> linkPage);
}

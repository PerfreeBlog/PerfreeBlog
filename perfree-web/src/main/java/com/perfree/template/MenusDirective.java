package com.perfree.template;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.annotation.TemplateDirective;
import com.perfree.model.Category;
import com.perfree.model.Menu;
import com.perfree.model.User;
import com.perfree.service.CategoryService;
import com.perfree.service.MenuService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * menus模板指令
 */
@TemplateDirective("menus")
@Component
public class MenusDirective extends Directive {

    private static MenuService menuService;

    @Autowired
    public void setCategoryService(MenuService menuService){
        MenusDirective.menuService = menuService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        List<Menu> menus = menuService.getProtalMenus();
        scope.set("menus", menus);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

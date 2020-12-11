package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Menu;
import com.perfree.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * menus模板指令
 */
@TemplateDirective("menus")
@Component
public class MenusDirective extends BaseDirective {

    private static MenuService menuService;

    @Autowired
    public void setMenuService(MenuService menuService){
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

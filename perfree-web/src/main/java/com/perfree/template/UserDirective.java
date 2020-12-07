package com.perfree.template;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.annotation.TemplateDirective;
import com.perfree.model.Menu;
import com.perfree.model.User;
import com.perfree.service.MenuService;
import com.perfree.service.OptionService;
import com.perfree.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * user模板指令
 */
@TemplateDirective("user")
@Component
public class UserDirective extends Directive {
    private static UserService userService;

    @Autowired
    public void setOptionService(UserService userService){
        UserDirective.userService = userService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        Subject subject = SecurityUtils.getSubject();
        User user=new User();
        if (subject.getPrincipals() != null) {
            BeanUtils.copyProperties(subject.getPrincipals().getPrimaryPrincipal(), user);
            user = userService.getById(user.getId().toString());
            user.setPassword(null);
            user.setSalt(null);
            scope.set("user", user);
        } else {
            scope.set("user", null);
        }
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

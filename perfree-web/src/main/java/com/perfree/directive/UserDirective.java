package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.User;
import com.perfree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * user模板指令
 */
@TemplateDirective("user")
@Component
public class UserDirective extends BaseDirective {
    private static UserService userService;

    @Autowired
    public void setUserService(UserService userService){
        UserDirective.userService = userService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
   //     Subject subject = SecurityUtils.getSubject();
        User user=new User();
   /*     if (subject.getPrincipals() != null) {
            BeanUtils.copyProperties(subject.getPrincipals().getPrimaryPrincipal(), user);
            user = userService.getById(user.getId().toString());
            user.setPassword(null);
            user.setSalt(null);
            scope.set("user", user);
        } else {
            scope.set("user", null);
        }*/
        scope.set("user", null);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

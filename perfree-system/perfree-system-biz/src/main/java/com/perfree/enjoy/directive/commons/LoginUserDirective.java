package com.perfree.enjoy.directive.commons;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.convert.user.UserConvert;
import com.perfree.model.User;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("loginUser")
@Component
public class LoginUserDirective extends BaseDirective {

    private static UserService userService;

    @Autowired
    public void setCategoryService(UserService userService){
        LoginUserDirective.userService = userService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser || null == loginUser.getId()) {
            scope.set("loginUser", null);
            stat.exec(env, scope, writer);
            return;
        }
        User byId = userService.getById(loginUser.getId());
        scope.set("loginUser", UserConvert.INSTANCE.convertRespVO(byId));
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}

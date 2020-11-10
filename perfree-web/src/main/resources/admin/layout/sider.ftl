<div class="layui-side f-side">
    <div class="layui-logo f-logo-text">
        Perfree
    </div>
    <div class="layui-logo f-logo-img">
        <img src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
    </div>
    <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree f-side-nav" lay-filter="side">
            <#list menus as menu>
                <#if menu.childMenu?size <= 0>
                    <li class="layui-nav-item f-nav-item">
                        <a href="javascript:;" url="${menu.url}">
                            <i class="fa ${menu.icon}" aria-hidden="true"></i><span class="f-nav-content">${menu.name}</span>
                        </a>
                    </li>
                <#else>
                    <li class="layui-nav-item f-nav-item">
                        <a class="" href="javascript:;"><i class="fa ${menu.icon}" aria-hidden="true"></i><span class="f-nav-content">${menu.name}</span></a>
                        <dl class="layui-nav-child">
                          <#list menu.childMenu as childMenu>
                            <dd class="f-child-side"><a href="javascript:;" url="${childMenu.url}">${childMenu.name}</a></dd>
                          </#list>
                        </dl>
                    </li>
                </#if>
            </#list>
        </ul>
    </div>
</div>
<div class="layui-side f-side">
    <div class="layui-logo f-logo-text">
        ${option('WEB_NAME').getValue()}
    </div>
    <div class="layui-logo f-logo-img">
        <#if (option('WEB_LOGO').getValue())?? && (option('WEB_LOGO').getValue()) != ''>
            <img src="${option('WEB_LOGO').getValue()}">
        <#else>
            <img src="/public/images/logo.png">
        </#if>
    </div>
    <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree f-side-nav" lay-filter="side">
            <#list menus as menu>
                <#if menu.childMenu?size <= 0>
                    <li class="layui-nav-item f-nav-item">
                        <a href="javascript:;" data-url="${menu.url}" class="p-menu-item" id="${menu.id}" data-icon="${menu.icon}" data-name="${menu.name}"
                           onclick="openTab('${menu.icon}','${menu.name}','${menu.url}','${menu.id}');">
                            <i class="fa ${menu.icon}" aria-hidden="true"></i><span class="f-nav-content">${menu.name}</span>
                        </a>
                    </li>
                <#else>
                    <li class="layui-nav-item f-nav-item">
                        <a class="" href="javascript:;"><i class="fa ${menu.icon}" aria-hidden="true"></i><span class="f-nav-content">${menu.name}</span></a>
                        <dl class="layui-nav-child">
                          <#list menu.childMenu as childMenu>
                            <dd class="f-child-side">
                                <a href="javascript:;" class="p-menu-item" data-url="${childMenu.url}" id="${childMenu.id}" data-icon="" data-name="${menu.name + '-' + childMenu.name}"
                                   onclick="openTab('','${childMenu.name}','${childMenu.url}','${childMenu.id}');">${childMenu.name}</a>
                            </dd>
                          </#list>
                        </dl>
                    </li>
                </#if>
            </#list>
        </ul>
    </div>
</div>
<div class="mc-drawer mdui-drawer mdui-drawer-open mdui-color-white" id="left-drawer">
    <ul class="mdui-list mdui-list-dense" mdui-collapse="{accordion: true}">
        <#list menus as menu>
            <#if menu.childMenu?size <= 0>
                <li class="mdui-list-item mdui-ripple p-menu-item" data-url="${menu.url}" data-text="${menu.name}">
                    <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-indigo">${menu.icon}</i>
                    <div class="mdui-list-item-content">${menu.name}</div>
                </li>
            <#else>
                <li class="mdui-collapse-item">
                    <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
                        <i class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-indigo">${menu.icon}</i>
                        <div class="mdui-list-item-content">${menu.name}</div>
                        <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                    </div>
                    <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
                         <#list menu.childMenu as childMenu>
                            <li class="mdui-list-item mdui-ripple p-menu-item" data-url="${childMenu.url}" data-text="${menu.name}-${childMenu.name}">${childMenu.name}</li>
                         </#list>
                    </ul>
                </li>
            </#if>
        </#list>
    </ul>
</div>
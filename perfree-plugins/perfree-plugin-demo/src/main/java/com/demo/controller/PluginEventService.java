package com.demo.controller;

import com.perfree.constant.MenuConstant;
import com.perfree.plugin.BasePluginEvent;
import com.perfree.system.api.menu.MenuApi;
import com.perfree.system.api.menu.dto.MenuDTO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class PluginEventService implements BasePluginEvent {

    @Resource
    private MenuApi menuApi;

    @Override
    public void onStart() {
        System.out.println("---------demo插件启动了-------------");
    }

    @Override
    public void onStop() {
        System.out.println("---------demo插件停止了-------------");
    }

    @Override
    public void onUpdate() {
        System.out.println("---------demo插件更新了-------------");
    }

    @Override
    public void onInstall() {
        // 演示创建一个目录菜单
        String PLUGIN_ID = "perfree-demo";
        MenuDTO parentMenu = MenuDTO.builder()
                // 菜单类型,管理后台
                .type(MenuConstant.MENU_TYPE_ADMIN)
                // 菜单类型,菜单
                .menuType(MenuConstant.MENU_MENU_TYPE_DIR)
                // 注意,插件id必须和插件配置文件中的id保持一致
                .pluginId(PLUGIN_ID)
                // 菜单名称
                .name("演示插件1")
                // 图标
                .icon("fa-solid fa-feather")
                // 菜单父级ID, -1 为根节点
                .pid(MenuConstant.ROOT_MENU_CODE)
                // 菜单排序
                .seq(99)
                .build();
        parentMenu = menuApi.createMenu(parentMenu);


        // 演示创建一个子菜单
        MenuDTO menuDTO = MenuDTO.builder()
                // 菜单类型,管理后台
                .type(MenuConstant.MENU_TYPE_ADMIN)
                // 菜单类型,菜单
                .menuType(MenuConstant.MENU_MENU_TYPE_MENU)
                // 注意,插件id必须和插件配置文件中的id保持一致
                .pluginId(PLUGIN_ID)
                // 菜单名称
                .name("测试菜单")
                // 菜单父级ID, -1 为根节点
                .pid(parentMenu.getId())
                // 菜单排序
                .seq(0)
                // 菜单地址(前端的真实访问地址,如果是vue项目,开发环境和正式环境可能不一样,注意区分,
                // 比如开发环境使用vite启动,访问地址可能是http://127.0.0.1:4201/xxx,生产为/xxx)
                .component("/plugin/perfree-demo/home")
                // 组件名称(主要用来做区分,建议唯一)
                .componentName("demo")
                // 菜单打开方式
                .target(MenuConstant.MENU_TARGET_SELF)
                // url,因为采用了微前端架构,这里可以自定义个展示的url
                .url("/admin/plugin/demo")
                // 菜单图标
                .icon("fa-solid fa-feather")
                // 是否为外链
                .isFrame(MenuConstant.MENU_NOT_FRAME)
                .build();
        menuApi.createMenu(menuDTO);

        // 演示创建一个外链菜单
        MenuDTO frameMenu = MenuDTO.builder()
                // 菜单类型,管理后台
                .type(MenuConstant.MENU_TYPE_ADMIN)
                // 菜单类型,菜单
                .menuType(MenuConstant.MENU_MENU_TYPE_MENU)
                // 注意,插件id必须和插件配置文件中的id保持一致
                .pluginId(PLUGIN_ID)
                // 菜单名称
                .name("PerfreeBlog")
                // 菜单父级ID, -1 为根节点
                .pid(parentMenu.getId())
                // 菜单排序
                .seq(1)
                // 菜单打开方式
                .target(MenuConstant.MENU_TARGET_SELF)
                // url,因为采用了微前端架构,这里可以自定义个展示的url
                .url("https://www.perfree.org.cn")
                // 菜单图标
                .icon("fa-solid fa-feather")
                // 是否为外链
                .isFrame(MenuConstant.MENU_IS_FRAME)
                .build();
        menuApi.createMenu(frameMenu);
        System.out.println("---------exam插件安装了-------------");
    }

    @Override
    public void onUnInstall() {
        // 卸载时删除插件菜单
        menuApi.deleteMenuByPluginId("perfree-demo");
        System.out.println("---------demo插件卸载了-------------");
    }
}
